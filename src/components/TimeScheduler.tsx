import React, { useState } from 'react';
import { DiagnosisReport } from '../types';
import {
  Clock,
  Bell,
  Calendar,
  Copy,
  Check,
  Sparkles,
  Info,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface TimeSchedulerProps {
  timelineSchedule: DiagnosisReport['timelineSchedule'];
}

export const TimeScheduler: React.FC<TimeSchedulerProps> = ({
  timelineSchedule
}) => {
  const [copied, setCopied] = useState(false);
  const [notifSimulated, setNotifSimulated] = useState(false);

  const handleCopySchedule = () => {
    let text = '💊 [약쏙 PillSock] 나의 맞춤형 영양제 복용 스케줄표\n\n';
    timelineSchedule.forEach((slot) => {
      text += `${slot.slotIcon} ${slot.slotTitle} (${slot.timeRecommendation})\n`;
      if (slot.items.length === 0) {
        text += '  - 복용 영양제 없음\n';
      } else {
        slot.items.forEach((item) => {
          text += `  - ${item.product.name} (${item.product.servingSize})\n`;
        });
      }
      text += '\n';
    });
    text += '✨ 약쏙 AI로 생성된 안전 복용 시간표입니다.';

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateNotification = () => {
    setNotifSimulated(true);
    setTimeout(() => setNotifSimulated(false), 4000);
  };

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PillSock//AI Supplement Schedule//KO
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:💊 [약쏙] 아침 공복 영양제 (유산균)
RRULE:FREQ=DAILY
DESCRIPTION:위산이 적은 아침 공복에 물 1컵과 함께 섭취하세요.
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:💊 [약쏙] 점심 식후 영양제 (종합비타민/비타민C)
RRULE:FREQ=DAILY
DESCRIPTION:식사 중 또는 식후 30분 이내에 복용하세요.
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:💊 [약쏙] 저녁 식후 영양제 (오메가3/비타민D)
RRULE:FREQ=DAILY
DESCRIPTION:지방이 포함된 식사 직후 흡수율이 가장 높습니다.
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:💊 [약쏙] 취침 전 영양제 (마그네슘/테아닌/칼마디)
RRULE:FREQ=DAILY
DESCRIPTION:취침 30분 전 신경 이완과 숙면을 돕습니다.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'pillsock_schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              ⏰
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              AI 최적 복용 타임라인 & 스마트 스케줄러
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            상극 성분의 시간 분리와 체내 흡수율(공복/식후/수면전)을 고려한 하루 4단계 최적 루틴입니다.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSimulateNotification}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 transition-all cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            <span>알림 시뮬레이션</span>
          </button>
          <button
            onClick={handleDownloadIcs}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>캘린더 등록 (.ics)</span>
          </button>
          <button
            onClick={handleCopySchedule}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold text-xs border border-brand-200 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-600" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-brand-600" />
                <span>시간표 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification Toast Simulation */}
      {notifSimulated && (
        <div className="my-4 p-4 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700 animate-bounce flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <p className="text-xs font-bold text-brand-400">
                [약쏙 AI 복용 알림 도착]
              </p>
              <p className="text-xs text-slate-200">
                "지금은 저녁 식후입니다! 오메가3와 비타민D를 섭취해 지질 흡수율을 높여보세요."
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">
            카톡/WebPush 연동
          </span>
        </div>
      )}

      {/* 4-Phase Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {timelineSchedule.map((slot) => {
          const hasItems = slot.items.length > 0;
          return (
            <div
              key={slot.slot}
              className={`rounded-2xl p-4 border flex flex-col justify-between transition-all ${
                hasItems
                  ? 'bg-slate-50/80 border-slate-200 hover:border-brand-300 hover:bg-white hover:shadow-md'
                  : 'bg-slate-50/30 border-dashed border-slate-200 opacity-60'
              }`}
            >
              <div>
                {/* Slot Title */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{slot.slotIcon}</span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {slot.slotTitle}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      hasItems
                        ? 'bg-brand-100 text-brand-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {slot.items.length}개
                  </span>
                </div>

                <p className="text-[11px] font-medium text-slate-500 mb-3">
                  {slot.timeRecommendation}
                </p>

                {/* Products in Slot */}
                {hasItems ? (
                  <div className="space-y-2">
                    {slot.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs"
                      >
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-brand-700 font-semibold mt-0.5">
                          {item.product.servingSize}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 leading-snug bg-slate-50 p-1.5 rounded">
                          💡 {item.guidance}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    해당 시간대 복용 영양제 없음
                  </div>
                )}
              </div>

              {hasItems && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>체내 흡수율 최적화</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
