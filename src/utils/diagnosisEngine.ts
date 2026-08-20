import {
  SupplementProduct,
  PrescribedMedicine,
  TargetProfileType,
  DiagnosisReport,
  NutrientIntakeStatus,
  IntakeTimeSlot,
  NutrientReference
} from '../types';
import { NUTRIENTS_DATABASE, PROFILE_KDRI_MAP } from '../data/nutrients';
import { INTERACTION_RULES } from '../data/interactions';

export interface SelectedItem {
  product: SupplementProduct;
  doseMultiplier: number;
}

export function runDiagnosisEngine(
  selectedItems: SelectedItem[],
  selectedMedicines: PrescribedMedicine[],
  profileType: TargetProfileType
): DiagnosisReport {
  const profileConfig = PROFILE_KDRI_MAP[profileType] || PROFILE_KDRI_MAP.adult;

  // 1. 성분별 총 섭취량 및 기여 제품 집계
  const nutrientTotals: Record<
    string,
    {
      amount: number;
      contributions: { productName: string; amount: number; percentage: number }[];
    }
  > = {};

  selectedItems.forEach(({ product, doseMultiplier }) => {
    product.nutrients.forEach((nut) => {
      const current = nutrientTotals[nut.nutrientId] || { amount: 0, contributions: [] };
      const itemAmount = nut.amount * (doseMultiplier || 1);
      current.amount += itemAmount;
      current.contributions.push({
        productName: product.name,
        amount: itemAmount,
        percentage: 0 // calculate after total
      });
      nutrientTotals[nut.nutrientId] = current;
    });
  });

  // Calculate contribution percentages
  Object.keys(nutrientTotals).forEach((nutId) => {
    const total = nutrientTotals[nutId].amount;
    nutrientTotals[nutId].contributions.forEach((c) => {
      c.percentage = total > 0 ? Math.round((c.amount / total) * 100) : 0;
    });
  });

  // 2. K-DRI 기준 대비 상태 판정
  const nutrientStatuses: NutrientIntakeStatus[] = [];
  let dangerCount = 0;
  let cautionCount = 0;

  NUTRIENTS_DATABASE.forEach((refNutrient) => {
    const totalData = nutrientTotals[refNutrient.id];
    if (!totalData || totalData.amount <= 0) return;

    // 프로필별 RNI 및 UL 보정
    const rniMultiplier = profileConfig.rniMultiplier[refNutrient.id] || 1.0;
    const adjustedRni = refNutrient.rni * rniMultiplier;
    const adjustedUl = profileConfig.ulOverrides?.[refNutrient.id] ?? refNutrient.ul;

    const rniRatio = Math.round((totalData.amount / adjustedRni) * 100);
    const ulRatio = adjustedUl ? Math.round((totalData.amount / adjustedUl) * 100) : null;

    let status: NutrientIntakeStatus['status'] = 'OPTIMAL';

    if (adjustedUl && totalData.amount > adjustedUl) {
      status = 'DANGER';
      dangerCount++;
    } else if (
      (adjustedUl && totalData.amount >= adjustedUl * 0.85) ||
      rniRatio > 350
    ) {
      status = 'CAUTION';
      cautionCount++;
    } else if (rniRatio < 50) {
      status = 'DEFICIENT';
    } else {
      status = 'OPTIMAL';
    }

    const customNutrientObj: NutrientReference = {
      ...refNutrient,
      rni: adjustedRni,
      ul: adjustedUl
    };

    nutrientStatuses.push({
      nutrient: customNutrientObj,
      totalAmount: Math.round(totalData.amount * 10) / 10,
      rniRatio,
      ulRatio,
      status,
      contributions: totalData.contributions
    });
  });

  // 정렬: DANGER > CAUTION > OPTIMAL > DEFICIENT
  const statusPriority: Record<string, number> = {
    DANGER: 0,
    CAUTION: 1,
    DEFICIENT: 2,
    OPTIMAL: 3
  };
  nutrientStatuses.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);

  // 3. 상호작용 검사 (상극 & 시너지)
  const presentNutrientMap: Record<string, string[]> = {};
  selectedItems.forEach(({ product }) => {
    product.nutrients.forEach((n) => {
      if (!presentNutrientMap[n.nutrientId]) {
        presentNutrientMap[n.nutrientId] = [];
      }
      if (!presentNutrientMap[n.nutrientId].includes(product.name)) {
        presentNutrientMap[n.nutrientId].push(product.name);
      }
    });
  });

  const badInteractions: DiagnosisReport['badInteractions'] = [];
  const goodInteractions: DiagnosisReport['goodInteractions'] = [];

  INTERACTION_RULES.forEach((rule) => {
    const prodsA = presentNutrientMap[rule.itemA.id];
    const prodsB = presentNutrientMap[rule.itemB.id];

    if (prodsA && prodsA.length > 0 && prodsB && prodsB.length > 0) {
      const sourceSupplements = Array.from(new Set([...prodsA, ...prodsB]));
      if (rule.type === 'BAD' || rule.type === 'CAUTION') {
        badInteractions.push({ rule, sourceSupplements });
      } else if (rule.type === 'GOOD') {
        goodInteractions.push({ rule, sourceSupplements });
      }
    }
  });

  // 4. 처방약 상호작용 검사
  const prescribedDrugWarnings: DiagnosisReport['prescribedDrugWarnings'] = [];
  selectedMedicines.forEach((med) => {
    med.supplementRisks.forEach((risk) => {
      const prodsWithNutrient = presentNutrientMap[risk.nutrientId];
      if (prodsWithNutrient && prodsWithNutrient.length > 0) {
        const nutDef = NUTRIENTS_DATABASE.find((n) => n.id === risk.nutrientId);
        prescribedDrugWarnings.push({
          drug: med,
          nutrientName: nutDef ? nutDef.name : risk.nutrientId,
          risk,
          supplementName: prodsWithNutrient.join(', ')
        });
        if (risk.riskLevel === 'DANGER') {
          dangerCount += 2;
        } else {
          cautionCount += 1;
        }
      }
    });
  });

  // 5. 약쏙 건강 점수 (100점 만점) 계산
  let rawScore = 100;
  if (selectedItems.length === 0) {
    rawScore = 0;
  } else {
    // 과다 감점
    rawScore -= dangerCount * 22;
    rawScore -= cautionCount * 8;

    // 상극 감점
    badInteractions.forEach((bi) => {
      if (bi.rule.severity === 'CRITICAL') rawScore -= 15;
      else rawScore -= 8;
    });

    // 처방약 위험 감점
    prescribedDrugWarnings.forEach((pw) => {
      if (pw.risk.riskLevel === 'DANGER') rawScore -= 25;
      else rawScore -= 10;
    });

    // 시너지 가산점
    const synergyBonus = Math.min(12, goodInteractions.length * 4);
    rawScore += synergyBonus;
  }

  const score = Math.max(12, Math.min(100, Math.round(rawScore)));

  // 등급 산출
  let grade: DiagnosisReport['grade'] = 'A';
  let gradeTitle = '';
  let summaryFeedback = '';

  if (selectedItems.length === 0) {
    grade = 'D';
    gradeTitle = '영양제 등록 필요';
    summaryFeedback = '현재 복용 중인 영양제를 등록하시면 AI 성분 분석을 시작합니다.';
  } else if (score >= 90) {
    grade = 'S';
    gradeTitle = '완벽한 골든 밸런스 조합';
    summaryFeedback = '성분 중복 없이 권장량을 충족하며, 흡수 시너지가 극대화된 모범적인 복용 조합입니다.';
  } else if (score >= 80) {
    grade = 'A';
    gradeTitle = '안전하고 우수한 복용 조합';
    summaryFeedback = '전반적으로 안전한 수준이며, 복용 시간대 분리만 가볍게 조정하시면 완벽합니다.';
  } else if (score >= 65) {
    grade = 'B';
    gradeTitle = '부분 주의 및 개선 권장 조합';
    summaryFeedback = '특정 성분의 중복 섭취 또는 흡수를 방해하는 상극 조합이 발견되어 조율이 필요합니다.';
  } else if (score >= 50) {
    grade = 'C';
    gradeTitle = '위험 요소 다수! 복용 수정 필요';
    summaryFeedback = '상한 섭취량을 초과한 성분이 있거나 심각한 약물 상호작용 위험이 있습니다. 아래 리포트를 확인하세요.';
  } else {
    grade = 'D';
    gradeTitle = '치명적 과다/충돌! 즉각적인 복용 중단 요망';
    summaryFeedback = '지용성 비타민이나 미네랄의 독성 상한 초과, 또는 전문 처방약과의 충돌로 즉각적인 성분 재조정이 필요합니다.';
  }

  // 6. 타임라인 스케줄러 생성
  const timeSlotsConfig: {
    slot: IntakeTimeSlot;
    slotTitle: string;
    slotIcon: string;
    timeRecommendation: string;
  }[] = [
    {
      slot: 'morning_empty',
      slotTitle: '아침 공복 (기상 직후)',
      slotIcon: '🌅',
      timeRecommendation: '오전 07:00 ~ 08:00 (물 1컵과 함께)'
    },
    {
      slot: 'morning_meal',
      slotTitle: '아침 / 점심 식후',
      slotIcon: '☀️',
      timeRecommendation: '식사 중 또는 식후 30분 이내'
    },
    {
      slot: 'dinner_meal',
      slotTitle: '저녁 식후',
      slotIcon: '🌇',
      timeRecommendation: '오후 18:30 ~ 20:00 (식사 직후)'
    },
    {
      slot: 'before_sleep',
      slotTitle: '취침 전',
      slotIcon: '🌙',
      timeRecommendation: '취침 30분 ~ 1시간 전'
    }
  ];

  const timelineSchedule = timeSlotsConfig.map((config) => {
    const itemsInSlot = selectedItems
      .filter(({ product }) => {
        // 만약 특정 성분 상극으로 시간대 강제 조정 필요 시 (e.g. 철분은 아침공복, 칼슘은 취침전)
        const hasIron = product.nutrients.some((n) => n.nutrientId === 'iron');
        const hasCalcium = product.nutrients.some((n) => n.nutrientId === 'calcium');
        const hasProbiotics = product.nutrients.some((n) => n.nutrientId === 'probiotics');
        const hasMagnesium = product.nutrients.some((n) => n.nutrientId === 'magnesium');

        if (config.slot === 'morning_empty') {
          return hasProbiotics || (hasIron && !hasCalcium) || product.bestTime === 'morning_empty';
        }
        if (config.slot === 'before_sleep') {
          return (hasMagnesium && !product.tags.includes('활성형비타민')) || (hasCalcium && !hasIron) || product.bestTime === 'before_sleep';
        }
        if (config.slot === 'dinner_meal') {
          return product.bestTime === 'dinner_meal';
        }
        // 기본 morning_meal
        return product.bestTime === 'morning_meal' || (!hasProbiotics && !hasMagnesium && config.slot === 'morning_meal');
      })
      .map(({ product }) => ({
        product,
        guidance: product.bestTimeReason
      }));

    return {
      ...config,
      items: itemsInSlot
    };
  });

  // 7. 스마트 대체 및 최적화 솔루션 도출
  const optimizationTips: DiagnosisReport['optimizationTips'] = [];

  // 중복 성분 감지 시 조치 팁
  const dangerousNutrients = nutrientStatuses.filter((s) => s.status === 'DANGER');
  if (dangerousNutrients.length > 0) {
    const dNames = dangerousNutrients.map((d) => d.nutrient.name).join(', ');
    optimizationTips.push({
      type: 'REDUCE_OVERLAP',
      title: `${dNames} 과다 섭취 해결 방안`,
      description: `현재 ${dNames} 성분이 식약처 1일 안전 상한치(UL)를 초과하여 복용되고 있습니다. 단일제 섭취를 중단하거나 복용 일수를 격일로 조절하세요.`,
      highlight: '간독성 및 부작용 위험 차단',
      actionable: `원인 제품: ${dangerousNutrients.flatMap((d) => d.contributions.map((c) => c.productName)).slice(0, 2).join(', ')}`
    });
  }

  // 상극 성분 시간 분리 팁
  if (badInteractions.length > 0) {
    const primaryBad = badInteractions[0];
    optimizationTips.push({
      type: 'TIME_SEPARATION',
      title: `${primaryBad.rule.itemA.name} & ${primaryBad.rule.itemB.name} 복용 시간 분리`,
      description: primaryBad.rule.actionGuide,
      highlight: '흡수율 최대 70% 복원',
      actionable: `${primaryBad.rule.optimalSpacingHours || 2}시간 이상 섭취 간격 유지`
    });
  }

  // 비용 절감 및 개수 다이어트 팁
  if (selectedItems.length >= 4) {
    const totalEstMonthlyPrice = selectedItems.reduce(
      (sum, item) => sum + (item.product.approxMonthlyPrice || 20000),
      0
    );
    const saveEst = Math.round(totalEstMonthlyPrice * 0.35);
    optimizationTips.push({
      type: 'COST_SAVING',
      title: `영양제 다이어트로 월 약 ${saveEst.toLocaleString()}원 절약`,
      description: `현재 ${selectedItems.length}개 제품을 드시고 계십니다. 중복 성분을 가진 단일제를 정리하고 올인원 복합제로 전환 시 알약 개수와 지출을 크게 줄일 수 있습니다.`,
      highlight: `연간 ${(saveEst * 12).toLocaleString()}원 절감 효과`,
      actionable: '불필요한 중복 단일 성분 다이어트'
    });
  }

  // 시너지 추천 팁
  if (goodInteractions.length > 0) {
    optimizationTips.push({
      type: 'ADD_SYNERGY',
      title: `${goodInteractions[0].rule.title}`,
      description: goodInteractions[0].rule.mechanism,
      highlight: '생체 흡수율 시너지',
      actionable: goodInteractions[0].rule.actionGuide
    });
  }

  return {
    score,
    grade,
    gradeTitle,
    summaryFeedback,
    totalSupplementsCount: selectedItems.length,
    totalNutrientsCount: nutrientStatuses.length,
    nutrientStatuses,
    dangerCount,
    cautionCount,
    badInteractions,
    goodInteractions,
    prescribedDrugWarnings,
    timelineSchedule,
    optimizationTips
  };
}
