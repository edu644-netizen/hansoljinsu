import { NutrientReference, TargetProfileType } from '../types';

// 기준 영양소 목록 (성인 남녀 평균 기준 기본값)
export const NUTRIENTS_DATABASE: NutrientReference[] = [
  // 지용성 비타민
  {
    id: 'vitamin_a',
    name: '비타민 A',
    koreanName: '비타민 A (레티놀/베타카로틴)',
    category: 'fat_soluble_vitamins',
    unit: 'μg RAE',
    rni: 750,
    ul: 3000,
    description: '어두운 곳 시각 적응, 피부와 점막 형성 및 기능 유지에 필요',
    excessSideEffects: '지용성으로 체내 축적되어 간독성, 두통, 구토, 피부박리, 임산부 기형아 위험 유발',
    benefits: '야맹증 예방, 안구건조증 완화, 면역 점막 강화'
  },
  {
    id: 'vitamin_d',
    name: '비타민 D',
    koreanName: '비타민 D (콜레칼시페롤)',
    category: 'fat_soluble_vitamins',
    unit: 'μg', // 1μg = 40 IU (50μg = 2000 IU, 100μg = 4000 IU)
    rni: 10, // 400 IU
    ul: 100, // 4000 IU
    description: '칼슘과 인이 흡수되고 이용되는데 필요, 뼈의 형성과 유지, 골다공증 위험 감소',
    excessSideEffects: '고칼슘혈증, 신장 결석, 혈관 석회화, 구토 및 근육 약화',
    benefits: '면역 증진, 뼈 건강, 우울감 완화, 근력 유지'
  },
  {
    id: 'vitamin_e',
    name: '비타민 E',
    koreanName: '비타민 E (토코페롤)',
    category: 'fat_soluble_vitamins',
    unit: 'mg α-TE',
    rni: 12,
    ul: 540,
    description: '항산화 작용을 하여 유해산소로부터 세포를 보호하는데 필요',
    excessSideEffects: '혈액 응고 방해로 인한 출혈 위험 증가(항응고제 복용자 주의)',
    benefits: '세포막 보호, 혈관 노화 방지, 피부 건강'
  },
  {
    id: 'vitamin_k',
    name: '비타민 K',
    koreanName: '비타민 K',
    category: 'fat_soluble_vitamins',
    unit: 'μg',
    rni: 70,
    ul: null,
    description: '정상적인 혈액응고와 뼈의 구성에 필요',
    excessSideEffects: '와파린 등 항응고제 효과를 직접적으로 무력화시킴',
    benefits: '뼈 칼슘 침착 촉진, 혈관 석회화 방지'
  },

  // 수용성 비타민
  {
    id: 'vitamin_c',
    name: '비타민 C',
    koreanName: '비타민 C (아스코르브산)',
    category: 'water_soluble_vitamins',
    unit: 'mg',
    rni: 100,
    ul: 2000,
    description: '결합조직 형성과 기능유지, 철분 흡수 촉진, 항산화 작용',
    excessSideEffects: '위장장애, 복통, 설사, 신장 결석 위험 증가(옥살산염 대사)',
    benefits: '피로 회복, 콜라겐 합성, 면역 항산화'
  },
  {
    id: 'vitamin_b1',
    name: '비타민 B1',
    koreanName: '비타민 B1 (티아민)',
    category: 'water_soluble_vitamins',
    unit: 'mg',
    rni: 1.2,
    ul: null,
    description: '탄수화물과 에너지 대사에 필요',
    excessSideEffects: '수용성으로 소변 배출되나 초고용량 주사 시 알레르기 가능',
    benefits: '육체 피로 완화, 신경계 안정, 젖산 축적 억제'
  },
  {
    id: 'vitamin_b2',
    name: '비타민 B2',
    koreanName: '비타민 B2 (리보플라빈)',
    category: 'water_soluble_vitamins',
    unit: 'mg',
    rni: 1.5,
    ul: null,
    description: '체내 에너지 생성에 필요 (구내염 예방)',
    excessSideEffects: '소변이 형광 노란색으로 변함(무해)',
    benefits: '구순염·설염 예방, 활력 증진, 눈 피로 개선'
  },
  {
    id: 'vitamin_b6',
    name: '비타민 B6',
    koreanName: '비타민 B6 (피리독신)',
    category: 'water_soluble_vitamins',
    unit: 'mg',
    rni: 1.5,
    ul: 100,
    description: '단백질 및 아미노산 이용, 혈액의 호모시스테인 수준 정상 유지',
    excessSideEffects: '장기 과다 복용 시 말초 신경병증(손발 저림, 보행 장애)',
    benefits: '호모시스테인(혈관독소) 억제, 신경전달물질 합성'
  },
  {
    id: 'vitamin_b12',
    name: '비타민 B12',
    koreanName: '비타민 B12 (시아노코발라민)',
    category: 'water_soluble_vitamins',
    unit: 'μg',
    rni: 2.4,
    ul: null,
    description: '정상적인 엽산 대사에 필요, 적혈구 형성',
    excessSideEffects: '수용성으로 매우 안전하나 극초고용량 시 피부 발진 가능',
    benefits: '거대적아구성 빈혈 예방, 신경계 보호, 치매 예방'
  },
  {
    id: 'folic_acid',
    name: '엽산',
    koreanName: '엽산 (비타민 B9)',
    category: 'water_soluble_vitamins',
    unit: 'μg DFE',
    rni: 400,
    ul: 1000,
    description: '세포와 혈액생성에 필요, 태아 신경관의 정상 발달에 필요',
    excessSideEffects: '비타민 B12 결핍 증상을 은폐하여 신경 손상 감지 지연',
    benefits: '기형아 예방, 혈관 건강, 적혈구 생성'
  },
  {
    id: 'biotin',
    name: '비오틴',
    koreanName: '비오틴 (비타민 B7)',
    category: 'water_soluble_vitamins',
    unit: 'μg',
    rni: 30,
    ul: null,
    description: '지방, 탄수화물, 단백질 대사와 에너지 생성에 필요',
    excessSideEffects: '임상 갑상선 혈액 검사(T3, T4, TSH) 결과 교란 위험',
    benefits: '모발 케라틴 합성, 손톱 강화, 피부 장벽 보호'
  },

  // 미네랄
  {
    id: 'calcium',
    name: '칼슘',
    koreanName: '칼슘',
    category: 'minerals',
    unit: 'mg',
    rni: 750,
    ul: 2500,
    description: '뼈와 치아 형성에 필요, 신경과 근육 기능 유지, 정상적인 혈액응고',
    excessSideEffects: '신장 결석, 변비, 고칼슘뇨증, 철분/아연 흡수 방해, 혈관 석회화',
    benefits: '골밀도 유지, 골다공증 예방, 근육 수축 조절'
  },
  {
    id: 'magnesium',
    name: '마그네슘',
    koreanName: '마그네슘',
    category: 'minerals',
    unit: 'mg',
    rni: 350,
    ul: 350, // 보충제 형태의 상한 (음식 제외)
    description: '에너지 이용에 필요, 신경과 근육 기능 유지',
    excessSideEffects: '삼투성 설사, 위장장애, 고마그네슘혈증(저혈압, 근무력증)',
    benefits: '눈떨림 완화, 수면 질 개선, 스트레스 긴장 완화, 혈압 조절'
  },
  {
    id: 'iron',
    name: '철분',
    koreanName: '철분',
    category: 'minerals',
    unit: 'mg',
    rni: 12,
    ul: 45,
    description: '체내 산소운반과 혈액생성에 필요, 에너지 생성에 필요',
    excessSideEffects: '심한 변비, 위장장애, 체내 장기 철 침착(혈색소증, 간 손상)',
    benefits: '빈혈 예방, 만성 피로 개선, 면역세포 활성화'
  },
  {
    id: 'zinc',
    name: '아연',
    koreanName: '아연',
    category: 'minerals',
    unit: 'mg',
    rni: 9,
    ul: 35,
    description: '정상적인 면역기능에 필요, 정상적인 세포분열에 필요',
    excessSideEffects: '장기 과다 섭취 시 구리 결핍 유발(빈혈, 백혈구 감소), 메스꺼움, HDL 콜레스테롤 감소',
    benefits: '면역력 증진, 상처 치유, 남성 활력, 미각 유지'
  },

  // 기능성 성분
  {
    id: 'omega3',
    name: '오메가3 (EPA+DHA)',
    koreanName: '오메가-3 (EPA 및 DHA 함유 유지)',
    category: 'functionals',
    unit: 'mg',
    rni: 500,
    ul: 3000,
    description: '혈중 중성지질 개선·혈행 개선에 도움, 건조한 눈 개선, 기억력 개선',
    excessSideEffects: '지혈 지연(출혈 위험), 산패 시 발암물질 위험, 비린내 트림',
    benefits: '심혈관 보호, 중성지방 억제, 안구 건조 개선, 뇌 건강'
  },
  {
    id: 'lutein',
    name: '루테인·지아잔틴',
    koreanName: '루테인지아잔틴복합추출물',
    category: 'functionals',
    unit: 'mg',
    rni: 10,
    ul: 20,
    description: '노화로 인해 감소될 수 있는 황반색소밀도를 유지하여 눈 건강에 도움',
    excessSideEffects: '과다 섭취 시 피부가 황색으로 변할 수 있음(카로티노이드혈증), 흡연자 폐암 위험 논란',
    benefits: '황반변성 예방, 눈 피로 및 블루라이트 차단 보호'
  },
  {
    id: 'milk_thistle',
    name: '밀크씨슬 (실리마린)',
    koreanName: '밀크씨슬추출물 (실리마린)',
    category: 'functionals',
    unit: 'mg',
    rni: 130,
    ul: 260,
    description: '간 건강에 도움을 줄 수 있음 (강력한 항산화 플라보노이드)',
    excessSideEffects: '위장관 장애, 설사, 알레르기 반응, 여성호르몬 유사 작용(유방암 등 주의)',
    benefits: '간세포 보호, 글루타치온 생성 촉진, 알코올 분해 보조'
  },
  {
    id: 'probiotics',
    name: '프로바이오틱스 (유산균)',
    koreanName: '프로바이오틱스 (생균수)',
    category: 'functionals',
    unit: '억 CFU',
    rni: 10,
    ul: 100,
    description: '유익균 증식 및 유해균 억제, 배변활동 원활, 장 건강에 도움',
    excessSideEffects: '복부 팽만감, 가스 발생, 면역저하자(항암환자 등) 균혈증 위험',
    benefits: '장내 미생물총 밸런스 개선, 면역력 향상, 소화 촉진'
  },
  {
    id: 'coq10',
    name: '코엔자임 Q10',
    koreanName: '코엔자임 Q10',
    category: 'functionals',
    unit: 'mg',
    rni: 90,
    ul: 100,
    description: '항산화 및 높은 혈압 감소에 도움을 줄 수 있음',
    excessSideEffects: '불면증(저녁 복용 시), 두통, 가벼운 위장장애',
    benefits: '세포 미토콘드리아 ATP 에너지 생성, 심장 근육 강화, 활력'
  },
  {
    id: 'theanine',
    name: 'L-테아닌',
    koreanName: 'L-테아닌',
    category: 'functionals',
    unit: 'mg',
    rni: 200,
    ul: 250,
    description: '스트레스로 인한 긴장완화에 도움을 줄 수 있음 (알파파 발생)',
    excessSideEffects: '과다 시 졸림 유발, 혈압 저하',
    benefits: '수면 안정, 불안 해소, 집중력 향상'
  }
];

// 프로필별 K-DRI 조정 계수/기준
export const PROFILE_KDRI_MAP: Record<TargetProfileType, {
  name: string;
  rniMultiplier: Record<string, number>;
  ulOverrides?: Record<string, number>;
  specialNotes: string;
}> = {
  adult: {
    name: '일반 성인 (20~40대)',
    rniMultiplier: {},
    specialNotes: '표준 한국인 성인 영양소 섭취기준 적용'
  },
  senior: {
    name: '부모님 / 시니어 (60대 이상)',
    rniMultiplier: {
      vitamin_d: 1.5, // 비타민 D 합성 저하로 권장량 증가
      calcium: 1.2,   // 골감소 예방
      vitamin_b12: 1.3, // 위산 감소로 흡수 저하
      zinc: 1.0,
      iron: 0.8 // 폐경 후 여성 및 노년층 철분 축적 위험으로 권장량 감소
    },
    ulOverrides: {
      iron: 40,
      vitamin_a: 2500
    },
    specialNotes: '위장 흡수력 감소 및 뼈 건강, 지혈/간대사 부담 고려한 시니어 맞춤 기준'
  },
  student: {
    name: '수험생 / 청년 (10대 후반~20대)',
    rniMultiplier: {
      vitamin_b1: 1.3,
      vitamin_b2: 1.3,
      vitamin_b6: 1.2,
      vitamin_c: 1.2,
      magnesium: 1.1
    },
    specialNotes: '두뇌 활동, 피로 회복, 스트레스 저항력 위주 기준'
  },
  pregnant: {
    name: '임산부 / 수유부',
    rniMultiplier: {
      folic_acid: 1.6, // 620μg
      iron: 2.0,       // 24mg
      vitamin_d: 1.2,
      calcium: 1.1
    },
    ulOverrides: {
      vitamin_a: 1500 // 임산부 비타민A 기형 위험으로 엄격한 상한 적용!
    },
    specialNotes: '태아 발달을 위한 엽산/철분 강화 및 비타민 A 엄격 제한 기준'
  },
  chronic: {
    name: '만성질환자 (고혈압/당뇨/고지혈증)',
    rniMultiplier: {
      coq10: 1.2,
      omega3: 1.3,
      vitamin_d: 1.2
    },
    specialNotes: '혈관 질환 개선 및 복용 약물(스타틴 등)과의 영양소 고갈 보충 기준'
  }
};
