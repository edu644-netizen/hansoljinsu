export type TargetProfileType = 'adult' | 'senior' | 'student' | 'pregnant' | 'chronic';

export interface UserProfile {
  id: TargetProfileType;
  label: string;
  subLabel: string;
  icon: string;
  age: number;
  gender: 'male' | 'female';
  description: string;
  kdriKey: string;
}

export type NutrientCategory = 'fat_soluble_vitamins' | 'water_soluble_vitamins' | 'minerals' | 'functionals';

export interface NutrientReference {
  id: string;
  name: string;
  koreanName: string;
  category: NutrientCategory;
  unit: string;
  rni: number; // 권장 섭취량 (Recommended Nutrient Intake)
  ul: number | null; // 상한 섭취량 (Tolerable Upper Intake Level, null if not established or safe)
  description: string;
  excessSideEffects: string; // 과다 시 부작용
  benefits: string; // 주요 효능
}

export interface ProductNutrient {
  nutrientId: string;
  amount: number;
  unit: string;
}

export type IntakeTimeSlot = 'morning_empty' | 'morning_meal' | 'lunch_meal' | 'dinner_meal' | 'before_sleep';

export interface SupplementProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  servingSize: string; // e.g. "1일 1회, 1회 1캡슐"
  pillsPerDay: number;
  bestTime: IntakeTimeSlot;
  bestTimeReason: string;
  nutrients: ProductNutrient[];
  tags: string[];
  approxMonthlyPrice: number;
  imageUrl?: string;
  description: string;
  isCustom?: boolean;
}

export interface PrescribedMedicine {
  id: string;
  name: string;
  category: string;
  description: string;
  commonExamples: string;
  supplementRisks: {
    nutrientId: string;
    riskLevel: 'DANGER' | 'WARNING';
    description: string;
    mechanism: string;
    advice: string;
  }[];
}

export interface InteractionRule {
  id: string;
  itemA: { id: string; name: string };
  itemB: { id: string; name: string };
  type: 'BAD' | 'GOOD' | 'CAUTION';
  severity: 'CRITICAL' | 'WARNING' | 'BENEFICIAL';
  title: string;
  mechanism: string; // 왜 문제가 되거나 좋은지
  actionGuide: string; // 어떻게 복용해야 하는지
  optimalSpacingHours?: number;
}

export interface NutrientIntakeStatus {
  nutrient: NutrientReference;
  totalAmount: number;
  rniRatio: number; // 권장량 대비 비율 (%)
  ulRatio: number | null; // 상한량 대비 비율 (%)
  status: 'DEFICIENT' | 'OPTIMAL' | 'CAUTION' | 'DANGER';
  contributions: {
    productName: string;
    amount: number;
    percentage: number;
  }[];
}

export interface DiagnosisReport {
  score: number; // 0 ~ 100
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  gradeTitle: string;
  summaryFeedback: string;
  totalSupplementsCount: number;
  totalNutrientsCount: number;
  nutrientStatuses: NutrientIntakeStatus[];
  dangerCount: number;
  cautionCount: number;
  badInteractions: {
    rule: InteractionRule;
    sourceSupplements: string[];
  }[];
  goodInteractions: {
    rule: InteractionRule;
    sourceSupplements: string[];
  }[];
  prescribedDrugWarnings: {
    drug: PrescribedMedicine;
    nutrientName: string;
    risk: {
      nutrientId: string;
      riskLevel: 'DANGER' | 'WARNING';
      description: string;
      mechanism: string;
      advice: string;
    };
    supplementName: string;
  }[];
  timelineSchedule: {
    slot: IntakeTimeSlot;
    slotTitle: string;
    slotIcon: string;
    timeRecommendation: string;
    items: {
      product: SupplementProduct;
      guidance: string;
    }[];
  }[];
  optimizationTips: {
    type: 'REDUCE_OVERLAP' | 'TIME_SEPARATION' | 'COST_SAVING' | 'ADD_SYNERGY';
    title: string;
    description: string;
    highlight: string;
    actionable: string;
  }[];
}
