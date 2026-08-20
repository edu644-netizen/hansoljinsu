import React from 'react';
import { DiagnosisReport, TargetProfileType } from '../types';
import { PROFILE_KDRI_MAP } from '../data/nutrients';

interface PrintableReportProps {
  report: DiagnosisReport;
  profileType: TargetProfileType;
  selectedSupplementsCount: number;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  report,
  profileType,
  selectedSupplementsCount
}) => {
  const profileInfo = PROFILE_KDRI_MAP[profileType] || PROFILE_KDRI_MAP.adult;
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="hidden print:block p-8 max-w-4xl mx-auto bg-white text-slate-900 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
            약쏙 (PillSock) 맞춤형 영양제 종합 진단 리포트
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            보건복지부 한국인 영양소 섭취기준(K-DRI) 및 식약처 공인 데이터 기반 AI 분석 결과
          </p>
        </div>
        <div className="text-right text-xs">
          <p className="font-bold text-slate-800">발행일: {today}</p>
          <p className="text-slate-500">진단 프로필: {profileInfo.name}</p>
        </div>
      </div>

      {/* Score & Summary Banner */}
      <div className="grid grid-cols-12 gap-4 p-4 rounded-xl border-2 border-slate-300 bg-slate-50 mb-6">
        <div className="col-span-4 flex flex-col items-center justify-center border-r border-slate-300 pr-4 text-center">
          <span className="text-xs font-bold text-slate-600">종합 건강 점수</span>
          <span className="text-4xl font-black text-slate-900 my-1">{report.score}점</span>
          <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-slate-900 text-white">
            {report.grade}등급 ({report.gradeTitle})
          </span>
        </div>
        <div className="col-span-8 flex flex-col justify-center pl-2">
          <h3 className="text-sm font-bold text-slate-900 mb-1">AI 임상 영양 소견:</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {report.summaryFeedback}
          </p>
          <div className="flex gap-4 text-xs font-bold mt-3 text-slate-800">
            <span>복용 영양제: {selectedSupplementsCount}개</span>
            <span>상한 초과 위험: {report.dangerCount}건</span>
            <span>상극 충돌: {report.badInteractions.length}건</span>
          </div>
        </div>
      </div>

      {/* Overdose & Nutrient Status Table */}
      <div className="mb-6">
        <h2 className="text-sm font-bold border-b border-slate-400 pb-1 mb-2">
          1. 주요 영양소 섭취 상태 및 상한(UL) 점검표
        </h2>
        <table className="w-full text-xs text-left border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              <th className="p-2 border-r border-slate-300">영양성분</th>
              <th className="p-2 border-r border-slate-300">총 섭취량</th>
              <th className="p-2 border-r border-slate-300">권장량(RNI)</th>
              <th className="p-2 border-r border-slate-300">상한량(UL)</th>
              <th className="p-2 border-r border-slate-300">판정 상태</th>
              <th className="p-2">주요 기여 제품</th>
            </tr>
          </thead>
          <tbody>
            {report.nutrientStatuses.slice(0, 10).map((item) => (
              <tr key={item.nutrient.id} className="border-b border-slate-200">
                <td className="p-2 font-bold border-r border-slate-300">
                  {item.nutrient.name}
                </td>
                <td className="p-2 font-extrabold border-r border-slate-300">
                  {item.totalAmount} {item.nutrient.unit}
                </td>
                <td className="p-2 border-r border-slate-300">
                  {item.nutrient.rni} {item.nutrient.unit}
                </td>
                <td className="p-2 border-r border-slate-300">
                  {item.nutrient.ul ? `${item.nutrient.ul} ${item.nutrient.unit}` : '설정안됨'}
                </td>
                <td className="p-2 font-bold border-r border-slate-300">
                  {item.status === 'DANGER'
                    ? '🔴 상한초과(위험)'
                    : item.status === 'CAUTION'
                    ? '🟡 과다주의'
                    : item.status === 'OPTIMAL'
                    ? '🟢 적정'
                    : '⚪ 부족'}
                </td>
                <td className="p-2 text-[11px] text-slate-600">
                  {item.contributions.map((c) => `${c.productName}(${c.amount})`).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactions & Prescriptions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-sm font-bold border-b border-slate-400 pb-1 mb-2">
            2. 상극 조합 및 시간 분리 가이드
          </h2>
          {report.badInteractions.length === 0 ? (
            <p className="text-xs text-slate-500">상극 충돌 없음 (안전)</p>
          ) : (
            <ul className="space-y-1.5 text-xs">
              {report.badInteractions.map((bi) => (
                <li key={bi.rule.id} className="p-2 bg-amber-50 rounded border border-amber-200">
                  <p className="font-bold text-amber-950">❌ {bi.rule.title}</p>
                  <p className="text-[11px] text-slate-600">{bi.rule.actionGuide}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-sm font-bold border-b border-slate-400 pb-1 mb-2">
            3. AI 맞춤형 4타임라인 복용 스케줄
          </h2>
          <div className="space-y-1.5 text-xs">
            {report.timelineSchedule.map((slot) => (
              <div key={slot.slot} className="p-1.5 border border-slate-200 rounded">
                <span className="font-bold">
                  {slot.slotIcon} {slot.slotTitle}:
                </span>{' '}
                {slot.items.length === 0 ? (
                  <span className="text-slate-400">없음</span>
                ) : (
                  <span>{slot.items.map((i) => i.product.name).join(', ')}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-400 pt-3 text-[10px] text-slate-500 flex justify-between">
        <span>본 진단 결과는 보건복지부 K-DRI 기준의 보조 진단 도구이며, 의학적 처방을 대신하지 않습니다.</span>
        <span>서비스 문의: 약쏙 PillSock AI</span>
      </div>
    </div>
  );
};
