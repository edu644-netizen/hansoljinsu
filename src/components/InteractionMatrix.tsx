import React from 'react';
import { DiagnosisReport } from '../types';
import {
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldCheck,
  Flame,
  HelpCircle
} from 'lucide-react';

interface InteractionMatrixProps {
  badInteractions: DiagnosisReport['badInteractions'];
  goodInteractions: DiagnosisReport['goodInteractions'];
  prescribedDrugWarnings: DiagnosisReport['prescribedDrugWarnings'];
}

export const InteractionMatrix: React.FC<InteractionMatrixProps> = ({
  badInteractions,
  goodInteractions,
  prescribedDrugWarnings
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              성분 간 궁합(상호작용) & 약물 충돌 정밀 분석
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            함께 먹으면 흡수를 방해하는 <span className="font-bold text-rose-600">'상극 조합'</span>과 흡수율을 극대화하는 <span className="font-bold text-brand-600">'황금 시너지'</span>를 자동 판별합니다.
          </p>
        </div>
      </div>

      <div className="space-y-6 my-6">
        {/* 1. Prescribed Medicine Warnings (Highest priority if present) */}
        {prescribedDrugWarnings.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1 rounded-md bg-rose-600 text-white">
                <AlertOctagon className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-rose-900">
                병원 처방약과의 충돌 주의 ({prescribedDrugWarnings.length}건)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prescribedDrugWarnings.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-rose-50/90 border-2 border-rose-200 rounded-2xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-rose-900">
                        {item.drug.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                        {item.risk.riskLevel === 'DANGER' ? '🚨 위험' : '⚠️ 주의'}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-900 mb-1">
                      충돌 성분: {item.nutrientName} ({item.supplementName})
                    </p>
                    <p className="text-[11px] text-slate-700 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-rose-200/60 mb-2">
                      <b>기전:</b> {item.risk.mechanism}
                    </p>
                  </div>

                  <div className="bg-rose-100/80 p-2.5 rounded-xl text-[11px] text-rose-950 font-semibold flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                    <span><b>복용 수칙:</b> {item.risk.advice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Bad Combinations (상극 성분) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-rose-100 text-rose-700">
                <Flame className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                상극 성분 조합 (흡수 방해 및 충돌)
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                badInteractions.length > 0
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {badInteractions.length > 0
                ? `${badInteractions.length}건 발견 (시간 분리 필요)`
                : '상극 충돌 없음 (안전)'}
            </span>
          </div>

          {badInteractions.length === 0 ? (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 text-center flex items-center justify-center gap-2 text-xs text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>현재 선택된 영양제들 간에 서로의 흡수를 방해하는 상극 충돌이 없습니다.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {badInteractions.map(({ rule, sourceSupplements }) => (
                <div
                  key={rule.id}
                  className="bg-amber-50/50 hover:bg-amber-50 border border-amber-200 rounded-2xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>❌</span>
                      <span>{rule.title}</span>
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-white">
                      시간 분리 권장
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5 bg-white/90 p-2.5 rounded-xl border border-amber-100">
                    {rule.mechanism}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-amber-900 font-bold bg-amber-100/70 p-2 rounded-xl mb-2">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>해결책: {rule.actionGuide}</span>
                  </div>

                  <p className="text-[10px] text-slate-500">
                    관련 제품: <span className="font-semibold text-slate-700">{sourceSupplements.join(', ')}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Good Synergies (황금 시너지 궁합) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-brand-100 text-brand-700">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                시너지 성분 조합 (흡수율 극대화)
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
              {goodInteractions.length}개 시너지 작동 중
            </span>
          </div>

          {goodInteractions.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xs text-slate-500">
              아직 발견된 시너지 조합이 없습니다. 비타민 D, 오메가3, 칼마디 등을 추가해보세요.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goodInteractions.map(({ rule, sourceSupplements }) => (
                <div
                  key={rule.id}
                  className="bg-brand-50/50 hover:bg-brand-50 border border-brand-200 rounded-2xl p-4 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>⭕</span>
                      <span>{rule.title}</span>
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-brand-600 text-white">
                      시너지 UP
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5 bg-white/90 p-2.5 rounded-xl border border-brand-100">
                    {rule.mechanism}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-brand-900 font-bold bg-brand-100/70 p-2 rounded-xl mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                    <span>추천 복용법: {rule.actionGuide}</span>
                  </div>

                  <p className="text-[10px] text-slate-500">
                    관련 제품: <span className="font-semibold text-slate-700">{sourceSupplements.join(', ')}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
