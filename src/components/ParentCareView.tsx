import React from 'react';
import { DiagnosisReport } from '../types';
import { Heart, Phone, AlertTriangle, CheckCircle2, Clock, Eye, Sparkles } from 'lucide-react';

interface ParentCareViewProps {
  report: DiagnosisReport;
  onClose: () => void;
}

export const ParentCareView: React.FC<ParentCareViewProps> = ({
  report,
  onClose
}) => {
  return (
    <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-lg mb-8 no-print animate-fadeIn">
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md shadow-amber-500/30">
            👵
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-amber-950">
                부모님 안심 큰 글씨 복용 안내
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                시니어 맞춤 모드 ON
              </span>
            </div>
            <p className="text-sm font-semibold text-amber-800 mt-0.5">
              어르신도 한눈에 알아보기 쉬운 핵심 복용 요약표입니다.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-950 font-bold text-sm border border-amber-300 shadow-xs transition-all cursor-pointer"
        >
          일반 화면으로 보기
        </button>
      </div>

      {/* 3 Key Questions for Parents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Q1: Safety check */}
        <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">질문 1</span>
            <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-3">
              드시는 영양제, 과하지 않고 안전한가요?
            </h4>
            {report.dangerCount > 0 ? (
              <div className="flex items-center gap-2 text-rose-600 font-black text-lg bg-rose-50 p-3 rounded-xl border border-rose-200">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <span>주의 필요! ({report.dangerCount}개 성분 과다)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-black text-lg bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>안전하게 잘 챙겨드시고 계십니다!</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-3">
            점수: <b>{report.score}점</b> ({report.gradeTitle})
          </p>
        </div>

        {/* Q2: Bad combinations check */}
        <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">질문 2</span>
            <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-3">
              함께 드시면 안 되는 성분이 있나요?
            </h4>
            {report.badInteractions.length > 0 ? (
              <div className="flex items-center gap-2 text-amber-800 font-black text-lg bg-amber-50 p-3 rounded-xl border border-amber-200">
                <Clock className="w-6 h-6 shrink-0 text-amber-600" />
                <span>시간을 나눠서 드셔야 합니다!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-700 font-black text-lg bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>부딪히는 상극 성분이 없습니다!</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-3">
            {report.badInteractions.length > 0
              ? '칼슘과 철분은 3시간 이상 간격을 두세요.'
              : '현재 조합은 흡수 방해 걱정이 없습니다.'}
          </p>
        </div>

        {/* Q3: Action advice */}
        <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">질문 3</span>
            <h4 className="text-base font-extrabold text-slate-900 mt-1 mb-3">
              오늘 바로 실천할 복용 수칙은?
            </h4>
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-900 font-bold text-sm leading-relaxed">
              👉 {report.timelineSchedule[0].items.length > 0 ? '유산균은 아침 공복 물 1잔과 함께, ' : ''}
              지용성 영양제는 식사 직후에 챙겨 드세요!
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            궁금하신 점은 자녀나 약사와 상담하세요.
          </p>
        </div>
      </div>

      {/* Large Simple Daily Timetable */}
      <div className="bg-white rounded-2xl p-6 border-2 border-amber-200 shadow-sm">
        <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          <span>하루 4번, 큰 글씨 복용 시간표</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {report.timelineSchedule.map((slot) => (
            <div
              key={slot.slot}
              className="bg-amber-50/50 p-4 rounded-xl border border-amber-200"
            >
              <div className="flex items-center gap-2 text-base font-black text-amber-950 mb-1">
                <span>{slot.slotIcon}</span>
                <span>{slot.slotTitle}</span>
              </div>
              <p className="text-xs font-bold text-amber-800 mb-2">
                {slot.timeRecommendation}
              </p>

              {slot.items.length === 0 ? (
                <p className="text-xs text-slate-400 font-medium py-2">
                  (드실 영양제 없음)
                </p>
              ) : (
                <ul className="space-y-1.5 text-sm font-extrabold text-slate-900">
                  {slot.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="bg-white px-3 py-2 rounded-lg border border-amber-200 shadow-2xs"
                    >
                      • {item.product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
