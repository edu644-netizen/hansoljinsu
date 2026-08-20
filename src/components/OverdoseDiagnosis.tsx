import React, { useState } from 'react';
import { NutrientIntakeStatus, TargetProfileType } from '../types';
import { PROFILE_KDRI_MAP } from '../data/nutrients';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface OverdoseDiagnosisProps {
  nutrientStatuses: NutrientIntakeStatus[];
  profileType: TargetProfileType;
}

export const OverdoseDiagnosis: React.FC<OverdoseDiagnosisProps> = ({
  nutrientStatuses,
  profileType
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'risks' | 'fat_soluble' | 'minerals'>(
    'all'
  );
  const [expandedNutrientId, setExpandedNutrientId] = useState<string | null>(null);

  const profileInfo = PROFILE_KDRI_MAP[profileType] || PROFILE_KDRI_MAP.adult;

  // Status Counts
  const dangerItems = nutrientStatuses.filter((s) => s.status === 'DANGER');
  const cautionItems = nutrientStatuses.filter((s) => s.status === 'CAUTION');
  const optimalItems = nutrientStatuses.filter((s) => s.status === 'OPTIMAL');
  const deficientItems = nutrientStatuses.filter((s) => s.status === 'DEFICIENT');

  // Filtered List
  const filteredStatuses = nutrientStatuses.filter((item) => {
    if (activeFilter === 'risks') {
      return item.status === 'DANGER' || item.status === 'CAUTION';
    }
    if (activeFilter === 'fat_soluble') {
      return item.nutrient.category === 'fat_soluble_vitamins';
    }
    if (activeFilter === 'minerals') {
      return item.nutrient.category === 'minerals';
    }
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedNutrientId(expandedNutrientId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 mb-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              📊
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              성분 중복 및 과다 섭취 진단 (K-DRI 기준)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            보건복지부 한국인 영양소 섭취기준 및 식약처 데이터를 기준으로 권장량(RNI) 대비 상한 섭취량(UL) 초과 여부를 정밀 분석합니다.
          </p>
        </div>

        {/* Profile Badge */}
        <div className="self-start md:self-auto bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
          기준: <span className="font-bold text-brand-700">{profileInfo.name}</span>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800">🔴 상한 초과 (위험)</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-950 mt-1">{dangerItems.length}개</p>
          <p className="text-[10px] text-rose-600 mt-0.5">상한 섭취량(UL) 초과</p>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">🟡 과다 주의</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-950 mt-1">{cautionItems.length}개</p>
          <p className="text-[10px] text-amber-600 mt-0.5">상한치 근접 또는 과다</p>
        </div>

        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">🟢 적정 섭취</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-950 mt-1">{optimalItems.length}개</p>
          <p className="text-[10px] text-emerald-600 mt-0.5">안전 권장 범위 충족</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">⚪ 부족 / 미섭취</span>
            <TrendingUp className="w-4 h-4 text-slate-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-1">{deficientItems.length}개</p>
          <p className="text-[10px] text-slate-500 mt-0.5">권장량의 50% 미만</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-100 pb-3 mb-4 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: `전체 성분 (${nutrientStatuses.length})` },
          { id: 'risks', label: `⚠️ 위험 & 주의만 (${dangerItems.length + cautionItems.length})` },
          { id: 'fat_soluble', label: '지용성 비타민' },
          { id: 'minerals', label: '미네랄/무기질' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeFilter === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Nutrient Diagnostic List */}
      {filteredStatuses.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">
          해당 분류에 해당하는 성분이 없습니다.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredStatuses.map((item) => {
            const isExpanded = expandedNutrientId === item.nutrient.id;
            const isDanger = item.status === 'DANGER';
            const isCaution = item.status === 'CAUTION';
            const isOptimal = item.status === 'OPTIMAL';

            // Percentage bar calculation relative to UL (if present) or 200% RNI
            const maxRef = item.nutrient.ul || item.nutrient.rni * 2.5;
            const barFillPercent = Math.min(100, Math.round((item.totalAmount / maxRef) * 100));

            return (
              <div
                key={item.nutrient.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isDanger
                    ? 'border-rose-300 bg-rose-50/40 shadow-xs'
                    : isCaution
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Main Row */}
                <div
                  onClick={() => toggleExpand(item.nutrient.id)}
                  className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">
                        {item.nutrient.name}
                      </span>
                      {isDanger && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                          🚨 상한 초과 ({item.ulRatio}% UL)
                        </span>
                      )}
                      {isCaution && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                          ⚠️ 과다 주의 ({item.rniRatio}% RNI)
                        </span>
                      )}
                      {isOptimal && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          🟢 적정 ({item.rniRatio}% RNI)
                        </span>
                      )}
                    </div>

                    {/* Total Amount & K-DRI reference info */}
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span>
                        총 섭취량:{' '}
                        <b className="text-slate-900 text-sm">
                          {item.totalAmount.toLocaleString()} {item.nutrient.unit}
                        </b>
                      </span>
                      <span className="text-slate-300">|</span>
                      <span>
                        권장량(RNI): {item.nutrient.rni.toLocaleString()} {item.nutrient.unit}
                      </span>
                      {item.nutrient.ul && (
                        <>
                          <span className="text-slate-300">|</span>
                          <span className="text-rose-700 font-semibold">
                            상한량(UL): {item.nutrient.ul.toLocaleString()} {item.nutrient.unit}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2.5 overflow-hidden flex relative">
                      <div
                        style={{ width: `${barFillPercent}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDanger
                            ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                            : isCaution
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expand Chevron */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.contributions.length}개 제품 기여
                    </span>
                    <div className="p-1 rounded-lg bg-slate-100 text-slate-500">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details: Contribution breakdown & Medical warning */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-white/80 space-y-3 text-xs">
                    {/* Excess Warning Banner */}
                    {isDanger && (
                      <div className="p-3 rounded-xl bg-rose-100/80 border border-rose-300 text-rose-900">
                        <p className="font-bold flex items-center gap-1.5 text-xs text-rose-800">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>식약처 의학적 과다 섭취 경고:</span>
                        </p>
                        <p className="text-[11px] mt-1 leading-relaxed">
                          {item.nutrient.excessSideEffects}
                        </p>
                      </div>
                    )}

                    {/* Benefits & Info */}
                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                      <span className="font-bold text-slate-800">💡 주요 효능: </span>
                      {item.nutrient.benefits} ({item.nutrient.description})
                    </div>

                    {/* Contribution Breakdown */}
                    <div>
                      <p className="font-bold text-slate-700 mb-1.5 text-[11px]">
                        📦 복용 중인 제품별 기여 함량 분해:
                      </p>
                      <div className="space-y-1.5">
                        {item.contributions.map((c, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-slate-100/70 px-3 py-1.5 rounded-lg"
                          >
                            <span className="font-medium text-slate-800">{c.productName}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">
                                {c.amount} {item.nutrient.unit}
                              </span>
                              <span className="text-[10px] font-semibold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                                {c.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
