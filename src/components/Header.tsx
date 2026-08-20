import React from 'react';
import { TargetProfileType, UserProfile } from '../types';
import { ShieldAlert, Sparkles, User, Printer, HeartHandshake, Eye } from 'lucide-react';

interface HeaderProps {
  currentProfile: TargetProfileType;
  onSelectProfile: (profile: TargetProfileType) => void;
  isSeniorMode: boolean;
  onToggleSeniorMode: () => void;
  onOpenScanner: () => void;
  onPrintReport: () => void;
}

const PROFILES: UserProfile[] = [
  {
    id: 'adult',
    label: '일반 성인',
    subLabel: '20~40대',
    icon: '👤',
    age: 32,
    gender: 'male',
    description: '표준 한국인 영양소 섭취기준 (K-DRI)',
    kdriKey: 'adult'
  },
  {
    id: 'senior',
    label: '부모님 / 시니어',
    subLabel: '60대 이상',
    icon: '👵',
    age: 68,
    gender: 'female',
    description: '비타민D/칼슘 강화, 철분/지용성 축적 주의',
    kdriKey: 'senior'
  },
  {
    id: 'chronic',
    label: '만성질환 / 약물복용',
    subLabel: '혈압·당뇨·고지혈',
    icon: '💊',
    age: 52,
    gender: 'male',
    description: '처방약과의 상호작용 및 고갈 영양소 보충',
    kdriKey: 'chronic'
  },
  {
    id: 'pregnant',
    label: '임산부 / 수유부',
    subLabel: '예비맘',
    icon: '🤰',
    age: 30,
    gender: 'female',
    description: '엽산/철분 권장량 증대, 비타민A 엄격 제한',
    kdriKey: 'pregnant'
  },
  {
    id: 'student',
    label: '수험생 / 청소년',
    subLabel: '10대 후반~20대',
    icon: '🎓',
    age: 19,
    gender: 'male',
    description: '두뇌 활동, 피로 회복 비타민B 집중',
    kdriKey: 'student'
  }
];

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  onSelectProfile,
  isSeniorMode,
  onToggleSeniorMode,
  onOpenScanner,
  onPrintReport
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Service Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-400 flex items-center justify-center shadow-lg shadow-brand-500/25 ring-2 ring-white">
              <span className="text-2xl">💊</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  약<span className="text-brand-600">쏙</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200">
                    PillSock AI
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                AI 기반 맞춤형 영양제 중복·과다·상극 진단 & 복용 스케줄러
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* OCR Scanner Button */}
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-brand-600 hover:from-teal-600 hover:to-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span className="hidden md:inline">라벨 AI 촬영 (OCR)</span>
              <span className="md:hidden">라벨 스캔</span>
            </button>

            {/* Senior Large Font Mode Toggle */}
            <button
              onClick={onToggleSeniorMode}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all border cursor-pointer ${
                isSeniorMode
                  ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/50'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
              title="부모님을 위한 큰 글씨 모드"
            >
              <Eye className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">큰글씨 모드</span>
              <span className={isSeniorMode ? 'font-bold' : ''}>
                {isSeniorMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Print / Export Report Button */}
            <button
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all border border-slate-200 cursor-pointer"
              title="1페이지 종합 진단 리포트 인쇄/저장"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">리포트 인쇄</span>
            </button>
          </div>
        </div>

        {/* Profile Selector Bar */}
        <div className="flex items-center gap-2 py-2.5 overflow-x-auto scrollbar-none border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 shrink-0 flex items-center gap-1 mr-1">
            <User className="w-3.5 h-3.5" /> 진단 대상:
          </span>
          <div className="flex gap-2">
            {PROFILES.map((prof) => {
              const isSelected = currentProfile === prof.id;
              return (
                <button
                  key={prof.id}
                  onClick={() => onSelectProfile(prof.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm ring-2 ring-brand-600/30 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <span>{prof.icon}</span>
                  <span>{prof.label}</span>
                  <span
                    className={`text-[10px] opacity-80 ${
                      isSelected ? 'text-brand-100' : 'text-slate-500'
                    }`}
                  >
                    ({prof.subLabel})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
