import React from 'react';
import { DEMO_PERSONAS } from '../data/products';
import { TargetProfileType } from '../types';
import { Zap, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PersonaBarProps {
  onSelectPersona: (personaId: string) => void;
  onResetAll: () => void;
  activePersonaId: string | null;
}

export const PersonaBar: React.FC<PersonaBarProps> = ({
  onSelectPersona,
  onResetAll,
  activePersonaId
}) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-5 shadow-xl border border-slate-700/60 no-print mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Zap className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              1초 시뮬레이션: 대표 복용자 프리셋 체험하기
            </h3>
            <span className="text-[11px] font-medium bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/30">
              실제 사례 기반
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            성분 중복 과다, 칼슘·철분 상극 충돌, 전문 처방약 위험 사례를 원클릭으로 확인해보세요.
          </p>
        </div>

        <button
          onClick={onResetAll}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-xs font-semibold text-slate-200 transition-all border border-slate-600 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>초기화</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEMO_PERSONAS.map((p) => {
          const isActive = activePersonaId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p.id)}
              className={`text-left p-3.5 rounded-2xl transition-all border cursor-pointer group relative overflow-hidden ${
                isActive
                  ? 'bg-white text-slate-900 border-white shadow-lg shadow-white/10 ring-2 ring-brand-400'
                  : 'bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {p.name}
                </span>
                {p.id === 'persona_golden_balance' ? (
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-brand-600' : 'text-emerald-400'
                    }`}
                  />
                ) : p.id === 'persona_overdose_worker' ? (
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-rose-600' : 'text-rose-400'
                    }`}
                  />
                ) : (
                  <ShieldAlert
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-amber-600' : 'text-amber-400'
                    }`}
                  />
                )}
              </div>
              <p
                className={`text-[11px] font-semibold mb-1 ${
                  isActive ? 'text-brand-700' : 'text-slate-300'
                }`}
              >
                {p.subtitle}
              </p>
              <p
                className={`text-[10px] leading-relaxed line-clamp-2 ${
                  isActive ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {p.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
