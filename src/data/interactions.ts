import { InteractionRule } from '../types';

export const INTERACTION_RULES: InteractionRule[] = [
  // 1. 상극 조합 (Bad Combinations)
  {
    id: 'rule_calcium_iron',
    itemA: { id: 'calcium', name: '칼슘' },
    itemB: { id: 'iron', name: '철분' },
    type: 'BAD',
    severity: 'CRITICAL',
    title: '칼슘과 철분의 흡수 경쟁 충돌 (상극 ❌)',
    mechanism: '칼슘과 철분은 장내에서 동일한 2가 양이온 운반체(DMT1)를 통해 흡수되므로, 동시에 복용하면 상호 경쟁하여 두 성분 모두 흡수율이 최대 70%까지 급감합니다.',
    actionGuide: '철분은 "아침 공복(또는 비타민C와 함께)", 칼슘은 "저녁 식후 또는 취침 전"으로 최소 2~4시간 이상 시간 간격을 두고 복용하세요.',
    optimalSpacingHours: 3
  },
  {
    id: 'rule_vitc_probiotics',
    itemA: { id: 'vitamin_c', name: '비타민 C' },
    itemB: { id: 'probiotics', name: '유산균 (프로바이오틱스)' },
    type: 'BAD',
    severity: 'WARNING',
    title: '고용량 비타민 C의 산성도로 인한 생균 사멸 (주의 ⚠️)',
    mechanism: '고함량(1,000mg 이상) 비타민 C는 강한 산성을 띠어 위와 소장에서 유산균의 세포벽을 파괴하고 생존율을 크게 떨어뜨릴 수 있습니다.',
    actionGuide: '유산균은 "기상 직후 미온수와 함께 아침 공복"에 섭취하고, 비타민 C는 "식사 중이나 식후"에 분리하여 섭취하세요.',
    optimalSpacingHours: 1
  },
  {
    id: 'rule_zinc_iron',
    itemA: { id: 'zinc', name: '아연' },
    itemB: { id: 'iron', name: '철분' },
    type: 'BAD',
    severity: 'WARNING',
    title: '고함량 아연과 철분의 흡수 저하 (주의 ⚠️)',
    mechanism: '아연과 철분 역시 흡수 경로가 유사하여 고함량(각 20mg 이상)을 함께 섭취할 경우 서로의 흡수를 방해하고 위장장애(메스꺼움)를 가중시킵니다.',
    actionGuide: '철분제와 아연 단일제는 아침과 점심/저녁으로 복용 시간대를 분리하세요.',
    optimalSpacingHours: 2
  },
  {
    id: 'rule_calcium_magnesium_unbalance',
    itemA: { id: 'calcium', name: '칼슘' },
    itemB: { id: 'magnesium', name: '마그네슘' },
    type: 'CAUTION',
    severity: 'WARNING',
    title: '칼슘 과다 시 마그네슘 흡수 방해 (비율 주의 ⚠️)',
    mechanism: '칼슘과 마그네슘의 이상적인 흡수 비율은 2:1 또는 1:1입니다. 칼슘만 과도하게 섭취하면 마그네슘의 흡수를 억제하여 근육 경련이나 불면이 악화될 수 있습니다.',
    actionGuide: '칼슘과 마그네슘이 균형 있게 배합된 복합제를 선택하거나, 마그네슘을 취침 전에 단독 보충하세요.'
  },

  // 2. 시너지 조합 (Good Synergies)
  {
    id: 'rule_cal_mag_vitd',
    itemA: { id: 'calcium', name: '칼슘' },
    itemB: { id: 'vitamin_d', name: '비타민 D' },
    type: 'GOOD',
    severity: 'BENEFICIAL',
    title: '칼슘 + 비타민 D의 뼈 흡수율 40% 부스팅 (황금 궁합 ⭕)',
    mechanism: '비타민 D는 장 점막에서 칼슘 결합 단백질(Calbindin) 합성을 유도하여 칼슘의 장내 흡수를 촉진하고 신장의 칼슘 재흡수를 도와 뼈 형성 효과를 극대화합니다.',
    actionGuide: '칼슘과 비타민 D는 함께 복용할 때 가장 시너지가 크며, 식후 또는 저녁에 함께 복용하면 좋습니다.'
  },
  {
    id: 'rule_iron_vitc',
    itemA: { id: 'iron', name: '철분' },
    itemB: { id: 'vitamin_c', name: '비타민 C' },
    type: 'GOOD',
    severity: 'BENEFICIAL',
    title: '철분 + 비타민 C의 흡수율 극대화 (시너지 ⭕)',
    mechanism: '비타민 C는 흡수율이 낮은 3가 철(Fe3+)을 흡수가 쉬운 2가 철(Fe2+)로 환원시켜 장내 철분 흡수율을 최대 3~4배까지 비약적으로 높여줍니다.',
    actionGuide: '철분제를 섭취할 때 비타민 C 영양제 또는 오렌지 주스와 함께 복용하면 위장 부담도 덜고 흡수율이 대폭 상승합니다.'
  },
  {
    id: 'rule_omega3_lutein',
    itemA: { id: 'omega3', name: '오메가-3' },
    itemB: { id: 'lutein', name: '루테인·지아잔틴' },
    type: 'GOOD',
    severity: 'BENEFICIAL',
    title: '오메가-3 + 루테인의 황반 및 안구건조 동시 케어 (눈건강 시너지 ⭕)',
    mechanism: '루테인은 망막 중심부 황반의 시세포를 보호하고, 오메가-3(DHA)는 망막의 주성분으로 눈물막을 강화하여 건조증과 시각 기능을 동시에 개선합니다. 또한 두 지용성 성분이 서로의 용해도를 높여 흡수를 돕습니다.',
    actionGuide: '기름진 식사 직후 함께 복용하면 지질 분해 효소(담즙산)에 의해 흡수율이 최적화됩니다.'
  },
  {
    id: 'rule_coq10_omega3',
    itemA: { id: 'coq10', name: '코엔자임 Q10' },
    itemB: { id: 'omega3', name: '오메가-3' },
    type: 'GOOD',
    severity: 'BENEFICIAL',
    title: '코엔자임 Q10 + 오메가-3의 혈관 & 항산화 시너지 (혈관 활력 ⭕)',
    mechanism: '오메가-3가 혈중 중성지방을 낮추고 혈행을 원활하게 하며, 코큐텐은 혈관 내피 세포의 산화 스트레스를 억제하고 심장 펌프 기능을 강화합니다.',
    actionGuide: '지용성 성분이므로 점심 또는 저녁 식후에 함께 섭취하세요.'
  },
  {
    id: 'rule_mag_theanine',
    itemA: { id: 'magnesium', name: '마그네슘' },
    itemB: { id: 'theanine', name: 'L-테아닌' },
    type: 'GOOD',
    severity: 'BENEFICIAL',
    title: '마그네슘 + 테아닌의 스트레스 이완 & 딥슬립 시너지 (수면 케어 ⭕)',
    mechanism: '마그네슘이 근육 긴장을 풀고 신경 안정 물질(GABA)을 활성화하며, 테아닌은 뇌의 흥분을 가라앉히는 알파파를 유도하여 숙면과 긴장 해소에 탁월한 시너지를 냅니다.',
    actionGuide: '취침 30분~1시간 전에 미온수와 함께 복용하세요.'
  }
];
