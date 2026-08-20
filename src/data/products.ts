import { SupplementProduct, PrescribedMedicine } from '../types';

export const SUPPLEMENT_CATALOG: SupplementProduct[] = [
  {
    id: 'prod_lactofit',
    name: '락토핏 골드 생유산균',
    brand: '종근당건강',
    category: '유산균/장건강',
    servingSize: '1일 1회, 1포',
    pillsPerDay: 1,
    bestTime: 'morning_empty',
    bestTimeReason: '위산이 적은 아침 공복에 물과 함께 섭취 시 장내 도달률이 가장 높습니다.',
    nutrients: [
      { nutrientId: 'probiotics', amount: 20, unit: '억 CFU' },
      { nutrientId: 'zinc', amount: 8.5, unit: 'mg' }
    ],
    tags: ['유산균', '국민영양제', '배변활동', '아연포함'],
    approxMonthlyPrice: 15000,
    description: '대한민국 1등 유산균, 온가족 장건강 및 정상적인 면역 기능 아연 함유'
  },
  {
    id: 'prod_vitamin_c_1000',
    name: '고려은단 비타민 C 1000',
    brand: '고려은단',
    category: '비타민C/항산화',
    servingSize: '1일 1회, 1정',
    pillsPerDay: 1,
    bestTime: 'morning_meal',
    bestTimeReason: '고함량 산성 성분이므로 위장 부담을 줄이기 위해 식사 중이나 식후 즉시 복용이 권장됩니다.',
    nutrients: [
      { nutrientId: 'vitamin_c', amount: 1000, unit: 'mg' }
    ],
    tags: ['비타민C', '항산화', '피로회복', 'DSM영국산'],
    approxMonthlyPrice: 12000,
    description: '순수 영국산 DSM 비타민C 원료 1000mg 함유'
  },
  {
    id: 'prod_rtg_omega3',
    name: '초임계 알티지(rTG) 오메가3 맥스',
    brand: '뉴트리코어',
    category: '오메가3/혈행',
    servingSize: '1일 1회, 1캡슐',
    pillsPerDay: 1,
    bestTime: 'dinner_meal',
    bestTimeReason: '지용성 성분으로 저녁 식사(지방 성분이 포함된 식사) 직후 복용 시 흡수율이 3배 이상 증가합니다.',
    nutrients: [
      { nutrientId: 'omega3', amount: 1000, unit: 'mg' },
      { nutrientId: 'vitamin_d', amount: 25, unit: 'μg' }, // 1000 IU
      { nutrientId: 'vitamin_e', amount: 11, unit: 'mg α-TE' }
    ],
    tags: ['오메가3', 'EPA/DHA', '혈행개선', '비타민D'],
    approxMonthlyPrice: 32000,
    description: '흡수율 높은 rTG형 오메가3 1000mg + 비타민D 1000IU 2중 기능성'
  },
  {
    id: 'prod_centrum_multi',
    name: '센트룸 포 맨/우먼 멀티비타민',
    brand: '한국화이자',
    category: '종합비타민',
    servingSize: '1일 1회, 1정',
    pillsPerDay: 1,
    bestTime: 'morning_meal',
    bestTimeReason: '비타민B군 에너지 대사 촉진 및 지용성 비타민 흡수를 위해 아침 식후 권장',
    nutrients: [
      { nutrientId: 'vitamin_a', amount: 700, unit: 'μg RAE' },
      { nutrientId: 'vitamin_d', amount: 10, unit: 'μg' },
      { nutrientId: 'vitamin_e', amount: 15, unit: 'mg α-TE' },
      { nutrientId: 'vitamin_c', amount: 100, unit: 'mg' },
      { nutrientId: 'vitamin_b1', amount: 4.2, unit: 'mg' },
      { nutrientId: 'vitamin_b2', amount: 4.8, unit: 'mg' },
      { nutrientId: 'vitamin_b6', amount: 6.0, unit: 'mg' },
      { nutrientId: 'vitamin_b12', amount: 18, unit: 'μg' },
      { nutrientId: 'folic_acid', amount: 400, unit: 'μg DFE' },
      { nutrientId: 'biotin', amount: 45, unit: 'μg' },
      { nutrientId: 'calcium', amount: 200, unit: 'mg' },
      { nutrientId: 'magnesium', amount: 100, unit: 'mg' },
      { nutrientId: 'iron', amount: 5, unit: 'mg' },
      { nutrientId: 'zinc', amount: 12, unit: 'mg' }
    ],
    tags: ['종합비타민', '22종영양소', '활력', '기본영양'],
    approxMonthlyPrice: 28000,
    description: '한국인 맞춤 22가지 비타민과 미네랄을 한 알에 담은 올인원 종합비타민'
  },
  {
    id: 'prod_thorne_2perday',
    name: '쏜리서치 투퍼데이 고함량 멀티',
    brand: 'Thorne Research',
    category: '종합비타민(직구)',
    servingSize: '1일 2회, 1회 1캡슐',
    pillsPerDay: 2,
    bestTime: 'morning_meal',
    bestTimeReason: '초고함량 활성형 비타민B군 함유로 저녁 복용 시 각성 효과(수면 방해)가 있어 아침/점심 식후 복용 권장',
    nutrients: [
      { nutrientId: 'vitamin_a', amount: 1500, unit: 'μg RAE' }, // 주의
      { nutrientId: 'vitamin_c', amount: 250, unit: 'mg' },
      { nutrientId: 'vitamin_d', amount: 50, unit: 'μg' }, // 2000 IU
      { nutrientId: 'vitamin_e', amount: 20, unit: 'mg α-TE' },
      { nutrientId: 'vitamin_k', amount: 100, unit: 'μg' },
      { nutrientId: 'vitamin_b1', amount: 50, unit: 'mg' },
      { nutrientId: 'vitamin_b2', amount: 12, unit: 'mg' },
      { nutrientId: 'vitamin_b6', amount: 20, unit: 'mg' },
      { nutrientId: 'folic_acid', amount: 680, unit: 'μg DFE' },
      { nutrientId: 'vitamin_b12', amount: 600, unit: 'μg' },
      { nutrientId: 'biotin', amount: 500, unit: 'μg' },
      { nutrientId: 'zinc', amount: 25, unit: 'mg' }, // 높음
      { nutrientId: 'magnesium', amount: 50, unit: 'mg' }
    ],
    tags: ['직구베스트', '활성형비타민', '고함량', '피로순삭'],
    approxMonthlyPrice: 35000,
    description: '최고급 원료와 활성형 B군이 집약된 직구 1위 프리미엄 멀티비타민'
  },
  {
    id: 'prod_cal_mag_d',
    name: '칼마디 프리미엄 (칼슘·마그네슘·비타민D)',
    brand: 'GC녹십자',
    category: '미네랄/뼈건강',
    servingSize: '1일 1회, 2정',
    pillsPerDay: 2,
    bestTime: 'before_sleep',
    bestTimeReason: '마그네슘의 천연 신경 이완 효과와 근육 이완으로 숙면을 돕고 야간 골흡수를 촉진합니다.',
    nutrients: [
      { nutrientId: 'calcium', amount: 400, unit: 'mg' },
      { nutrientId: 'magnesium', amount: 200, unit: 'mg' },
      { nutrientId: 'vitamin_d', amount: 25, unit: 'μg' }, // 1000 IU
      { nutrientId: 'zinc', amount: 5, unit: 'mg' }
    ],
    tags: ['칼마디', '뼈건강', '눈떨림', '골다공증'],
    approxMonthlyPrice: 22000,
    description: '칼슘과 마그네슘의 황금 흡수 비율 2:1 및 비타민D 1000IU 결합'
  },
  {
    id: 'prod_now_zinc_50',
    name: '나우푸드 글루콘산 아연 50mg',
    brand: 'Now Foods',
    category: '미네랄/면역',
    servingSize: '1일 1회, 1정',
    pillsPerDay: 1,
    bestTime: 'lunch_meal',
    bestTimeReason: '고용량 아연은 공복 섭취 시 강한 메스꺼움과 위통을 유발하므로 든든한 식사 직후 섭취 권장',
    nutrients: [
      { nutrientId: 'zinc', amount: 50, unit: 'mg' } // 상한 초과 단일제!
    ],
    tags: ['고함량아연', '면역력', '단일미네랄', '직구'],
    approxMonthlyPrice: 9000,
    description: '면역 기능 및 남성 건강을 위한 단일 고함량 아연 보충제 (상한치 주의 요망)'
  },
  {
    id: 'prod_solgar_iron',
    name: '솔가 젠틀 아이언 철분 25mg',
    brand: 'Solgar',
    category: '미네랄/빈혈',
    servingSize: '1일 1회, 1캡슐',
    pillsPerDay: 1,
    bestTime: 'morning_empty',
    bestTimeReason: '음식물의 탄닌, 피트산, 칼슘과의 흡수 방해를 피하기 위해 공복 또는 비타민C 주스와 함께 섭취 권장',
    nutrients: [
      { nutrientId: 'iron', amount: 25, unit: 'mg' }
    ],
    tags: ['철분', '임산부', '여성빈혈', '위장부담감소'],
    approxMonthlyPrice: 21000,
    description: '비스글리시네이트 킬레이트 형태의 흡수율 높고 변비 부담 적은 프리미엄 철분'
  },
  {
    id: 'prod_lutein_zeaxanthin',
    name: '아이클리어 루테인 지아잔틴',
    brand: '종근당건강',
    category: '눈건강',
    servingSize: '1일 1회, 1캡슐',
    pillsPerDay: 1,
    bestTime: 'morning_meal',
    bestTimeReason: '지용성 카로티노이드 성분으로 식사 직후 복용 시 생체이용률이 극대화됩니다.',
    nutrients: [
      { nutrientId: 'lutein', amount: 20, unit: 'mg' },
      { nutrientId: 'vitamin_a', amount: 700, unit: 'μg RAE' },
      { nutrientId: 'zinc', amount: 8.5, unit: 'mg' },
      { nutrientId: 'vitamin_e', amount: 11, unit: 'mg α-TE' }
    ],
    tags: ['눈건강', '루테인', '스마트폰피로', '황반변성'],
    approxMonthlyPrice: 18000,
    description: '루테인 16mg + 지아잔틴 4mg 황금 배합 및 눈에 필요한 비타민A, 아연 함유'
  },
  {
    id: 'prod_milk_thistle',
    name: '밀크씨슬 실리마린 130',
    brand: '대원제약',
    category: '간건강/피로',
    servingSize: '1일 1회, 1정',
    pillsPerDay: 1,
    bestTime: 'dinner_meal',
    bestTimeReason: '저녁 식후 또는 음주 후 복용 시 야간 간세포 재생 및 해독 활성화',
    nutrients: [
      { nutrientId: 'milk_thistle', amount: 130, unit: 'mg' },
      { nutrientId: 'vitamin_b1', amount: 1.2, unit: 'mg' },
      { nutrientId: 'vitamin_b2', amount: 1.4, unit: 'mg' },
      { nutrientId: 'vitamin_b6', amount: 1.5, unit: 'mg' }
    ],
    tags: ['밀크씨슬', '실리마린', '간피로', '숙취해소'],
    approxMonthlyPrice: 19000,
    description: '식약처 인증 실리마린 순수 130mg 및 간 대사에 필요한 비타민 B군 복합 처방'
  },
  {
    id: 'prod_coq10_max',
    name: '코엔자임 Q10 맥스 100',
    brand: '에스더포뮬러',
    category: '항산화/혈압',
    servingSize: '1일 1회, 1캡슐',
    pillsPerDay: 1,
    bestTime: 'morning_meal',
    bestTimeReason: '미토콘드리아 에너지 생성을 활성화하므로 저녁보다는 아침 식후 섭취가 활력에 좋습니다.',
    nutrients: [
      { nutrientId: 'coq10', amount: 100, unit: 'mg' },
      { nutrientId: 'vitamin_e', amount: 15, unit: 'mg α-TE' },
      { nutrientId: 'zinc', amount: 5, unit: 'mg' }
    ],
    tags: ['코큐텐', '항산화', '혈압감소', '스타틴복용자추천'],
    approxMonthlyPrice: 34000,
    description: '순도 98% 프리미엄 코엔자임Q10 100mg, 높은 혈압 감소 및 항산화 이중 기능'
  },
  {
    id: 'prod_theanine_sleep',
    name: '슬립 밸런스 릴렉스 L-테아닌',
    brand: '안국건강',
    category: '수면/스트레스',
    servingSize: '1일 1회, 1정',
    pillsPerDay: 1,
    bestTime: 'before_sleep',
    bestTimeReason: '수면 30분~1시간 전에 섭취하면 뇌파(알파파)를 유도하여 편안한 이완과 숙면을 돕습니다.',
    nutrients: [
      { nutrientId: 'theanine', amount: 200, unit: 'mg' },
      { nutrientId: 'magnesium', amount: 100, unit: 'mg' }
    ],
    tags: ['테아닌', '스트레스', '숙면', '긴장완화'],
    approxMonthlyPrice: 26000,
    description: '식약처 인정 기능성 L-테아닌 200mg 함유로 스트레스 긴장 완화 및 숙면 서포트'
  },
  {
    id: 'prod_pure_vitamin_d_5000',
    name: '닥터스베스트 고함량 비타민 D3 5000 IU',
    brand: "Doctor's Best",
    category: '비타민D/단일제',
    servingSize: '1일 1회, 1소프트겔',
    pillsPerDay: 1,
    bestTime: 'lunch_meal',
    bestTimeReason: '지용성 비타민으로 점심 또는 저녁 식사 직후 섭취 시 흡수율 최고',
    nutrients: [
      { nutrientId: 'vitamin_d', amount: 125, unit: 'μg' } // 5000 IU -> 상한(100μg) 초과 위험!
    ],
    tags: ['비타민D3', '초고함량', '5000IU', '직구'],
    approxMonthlyPrice: 11000,
    description: '단일 고함량 5000 IU 비타민D3 (장기 연속 복용 시 혈중 칼슘 농도 모니터링 필요)'
  }
];

// 처방약 DB (상호작용 체크용)
export const PRESCRIBED_MEDICINES: PrescribedMedicine[] = [
  {
    id: 'med_warfarin',
    name: '와파린 / 쿠마딘 (항응고제)',
    category: '혈전예방제',
    commonExamples: '와파린정, 쿠마딘정',
    description: '혈액 응고를 억제하여 뇌졸중 및 심부정맥 혈전증을 예방하는 전문의약품',
    supplementRisks: [
      {
        nutrientId: 'vitamin_k',
        riskLevel: 'DANGER',
        description: '와파린 약효 완전 무력화 (혈전 형성 위험 급증)',
        mechanism: '비타민 K는 혈액 응고 인자를 합성하므로, 비타민 K를 저해하는 와파린의 기전을 정면으로 방해합니다.',
        advice: '와파린 복용 중에는 비타민 K 함유 종합비타민, 클로렐라, 낫토 등의 영양제 섭취를 엄격히 금해야 합니다.'
      },
      {
        nutrientId: 'omega3',
        riskLevel: 'WARNING',
        description: '출혈 경향 증가 (지혈 지연, 멍, 잇몸 출혈)',
        mechanism: '오메가-3와 은행잎추출물도 혈소판 응집을 억제하므로 항응고 작용이 과도해질 수 있습니다.',
        advice: '오메가-3 복용 전 반드시 처방의와 상의하고 일 1000mg 이하로 조절하세요.'
      },
      {
        nutrientId: 'vitamin_e',
        riskLevel: 'WARNING',
        description: '고용량 섭취 시 출혈 위험 증가',
        mechanism: '비타민 E 역시 혈소판 응집을 저해하여 항응고제의 출혈 부작용을 높입니다.',
        advice: '일 400IU 이상의 고함량 비타민E 단일제 섭취를 피하세요.'
      }
    ]
  },
  {
    id: 'med_statin',
    name: '스타틴계 고지혈증약 (아토르바스타틴, 로수바스타틴 등)',
    category: '지질강하제',
    commonExamples: '리피토정, 크레스토정, 아토젯정',
    description: '간의 콜레스테롤 합성을 억제하는 이상지질혈증 1차 치료제',
    supplementRisks: [
      {
        nutrientId: 'coq10',
        riskLevel: 'WARNING',
        description: '체내 코엔자임 Q10 고갈 (근육통, 피로감 원인)',
        mechanism: '스타틴은 콜레스테롤 합성 경로(HMG-CoA 환원효소)를 차단하면서 동시에 코엔자임 Q10의 체내 합성도 40% 이상 감소시킵니다.',
        advice: '스타틴 복용자는 코엔자임 Q10(일 100mg)을 보충 섭취하는 것이 근육통 완화와 미토콘드리아 기능 유지에 매우 유익합니다.'
      }
    ]
  },
  {
    id: 'med_bp_acei',
    name: 'ACE 억제제 / ARB계 혈압약 (텔미사르탄, 발사르탄 등)',
    category: '혈압강하제',
    commonExamples: '미카르디스정, 디오반정, 트윈스타정',
    description: '혈관을 확장시켜 혈압을 낮추고 심장/신장을 보호하는 대표 혈압약',
    supplementRisks: [
      {
        nutrientId: 'potassium',
        riskLevel: 'WARNING',
        description: '고칼륨혈증 위험 (부정맥 유발)',
        mechanism: '이 약물은 신장에서 칼륨 배설을 억제하므로 칼륨 보충제나 고칼륨 영양제 동시 섭취 시 체내 칼륨이 급상승할 수 있습니다.',
        advice: '고칼륨 전해질 보충제 복용을 피하세요.'
      }
    ]
  },
  {
    id: 'med_synthroid',
    name: '씬지로이드 (갑상선 호르몬제 - 레보티록신)',
    category: '갑상선질환치료제',
    commonExamples: '씬지로이드정, 씬지록신정',
    description: '갑상선기능저하증 환자에게 부족한 갑상선 호르몬을 보충하는 약제',
    supplementRisks: [
      {
        nutrientId: 'calcium',
        riskLevel: 'DANGER',
        description: '갑상선 호르몬 흡수율 50% 이상 급감',
        mechanism: '칼슘과 철분은 위장관 내에서 레보티록신 분자와 결합하여 불용성 킬레이트를 형성해 약물의 흡수를 차단합니다.',
        advice: '씬지로이드 복용 후 최소 4시간 이상의 시간 간격을 두고 칼슘/철분 영양제를 섭취해야 합니다.'
      },
      {
        nutrientId: 'iron',
        riskLevel: 'DANGER',
        description: '갑상선 호르몬 흡수 불능 상태 유발',
        mechanism: '철분이 갑상선호르몬과 결합하여 흡수되지 못하고 대변으로 배출됩니다.',
        advice: '철분제는 씬지로이드 복용 4~6시간 후(점심 이후) 복용하세요.'
      }
    ]
  }
];

// 1-Click 테스트용 대표 페르소나 데이터
export const DEMO_PERSONAS = [
  {
    id: 'persona_overdose_worker',
    name: '피로회복 욕심쟁이 직장인 김대리 (32세)',
    subtitle: '🔴 아연/비타민A 과다 & 상극 충돌 조합',
    profileType: 'adult' as const,
    description: '피로 회복과 눈 건강, 면역을 위해 챙겨 먹다 보니 아연 상한량(35mg)을 훌쩍 넘긴 95.5mg을 복용 중이며 칼슘과 철분을 함께 털어먹는 전형적인 현대인 조합',
    initialSupplements: ['prod_centrum_multi', 'prod_thorne_2perday', 'prod_now_zinc_50', 'prod_lutein_zeaxanthin', 'prod_vitamin_c_1000'],
    initialMedicines: []
  },
  {
    id: 'persona_senior_parents',
    name: '효도 케어가 필요한 부모님 (67세 어머니)',
    subtitle: '⚠️ 칼슘+철분 충돌 & 와파린 약물 주의',
    profileType: 'senior' as const,
    description: '골다공증 예방 칼슘과 빈혈 철분을 함께 드시고 계시며, 혈전약(와파린) 복용 중 비타민K 및 고함량 영양제 충돌이 우려되는 시니어 조합',
    initialSupplements: ['prod_cal_mag_d', 'prod_solgar_iron', 'prod_rtg_omega3', 'prod_lactofit'],
    initialMedicines: ['med_warfarin']
  },
  {
    id: 'persona_statin_user',
    name: '고지혈증약 복용 중인 40대 만성질환자',
    subtitle: '💡 스타틴 복용 + 코큐텐 고갈 시너지 필요',
    profileType: 'chronic' as const,
    description: '스타틴계 고지혈증약을 3년째 복용 중으로 만성 근육통과 피로를 겪고 있어 코엔자임Q10 보충과 오메가3의 혈관 시너지가 필요한 조합',
    initialSupplements: ['prod_coq10_max', 'prod_rtg_omega3', 'prod_milk_thistle', 'prod_cal_mag_d'],
    initialMedicines: ['med_statin']
  },
  {
    id: 'persona_golden_balance',
    name: '스마트 밸런스 황금 모범 조합 (100점 만점)',
    subtitle: '🟢 중복 제로 & 시간대별 완벽 분리',
    profileType: 'adult' as const,
    description: '아침 공복(유산균) -> 아침 식후(비타민C, 코큐텐) -> 저녁 식후(오메가3) -> 취침 전(마그네슘)으로 완벽하게 설계된 이상적인 섭취 루틴',
    initialSupplements: ['prod_lactofit', 'prod_vitamin_c_1000', 'prod_rtg_omega3', 'prod_cal_mag_d'],
    initialMedicines: []
  }
];

// OCR 스캔 테스트용 라벨 샘플 이미지 & 정형 데이터 프리셋
export const OCR_LABEL_SAMPLES = [
  {
    id: 'ocr_sample_1',
    title: '종합 활력 멀티비타민 골드 라벨 (후면)',
    brand: '바이탈헬스케어',
    imagePreview: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    parsedData: {
      name: '바이탈 액티브 멀티포뮬러',
      brand: '바이탈헬스',
      servingSize: '1일 1회, 1정',
      pillsPerDay: 1,
      bestTime: 'morning_meal' as const,
      bestTimeReason: '비타민B군 에너지 생성 촉진을 위해 아침 식후 권장',
      nutrients: [
        { nutrientId: 'vitamin_a', amount: 800, unit: 'μg RAE' },
        { nutrientId: 'vitamin_c', amount: 300, unit: 'mg' },
        { nutrientId: 'vitamin_d', amount: 25, unit: 'μg' },
        { nutrientId: 'vitamin_b1', amount: 10, unit: 'mg' },
        { nutrientId: 'vitamin_b2', amount: 12, unit: 'mg' },
        { nutrientId: 'vitamin_b6', amount: 15, unit: 'mg' },
        { nutrientId: 'zinc', amount: 15, unit: 'mg' }
      ]
    }
  },
  {
    id: 'ocr_sample_2',
    title: '트리플 칼슘 마그네슘 D 아연 복합정',
    brand: '네이처바이오',
    imagePreview: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80',
    parsedData: {
      name: '네이처 본케어 칼마디',
      brand: '네이처바이오',
      servingSize: '1일 1회, 2정',
      pillsPerDay: 2,
      bestTime: 'before_sleep' as const,
      bestTimeReason: '신경 이완 및 숙면과 야간 골밀도 합성을 위해 취침 전 권장',
      nutrients: [
        { nutrientId: 'calcium', amount: 500, unit: 'mg' },
        { nutrientId: 'magnesium', amount: 250, unit: 'mg' },
        { nutrientId: 'vitamin_d', amount: 20, unit: 'μg' },
        { nutrientId: 'zinc', amount: 10, unit: 'mg' }
      ]
    }
  },
  {
    id: 'ocr_sample_3',
    title: '퓨어 프리미엄 고함량 아연 30mg',
    brand: '메디컬랩',
    imagePreview: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    parsedData: {
      name: '메디컬랩 면역 아연 30',
      brand: '메디컬랩',
      servingSize: '1일 1회, 1정',
      pillsPerDay: 1,
      bestTime: 'lunch_meal' as const,
      bestTimeReason: '고함량 아연 위장장애 방지를 위해 점심 식사 직후 권장',
      nutrients: [
        { nutrientId: 'zinc', amount: 30, unit: 'mg' },
        { nutrientId: 'vitamin_c', amount: 50, unit: 'mg' }
      ]
    }
  }
];
