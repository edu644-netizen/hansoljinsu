import React, { useEffect, useState } from 'react';
import { DiagnosisReport } from '../types';
import confetti from 'canvas-confetti';
import {
  Award,
  Sparkles,
  TrendingDown,
  ShieldCheck,
  Share2,
  Download,
  Printer,
  ChevronRight,
  Lightbulb,
  Heart,
  MessageCircle
} from 'lucide-react';

interface AiReportCardProps {
  report: DiagnosisReport;
  onPrintReport: () => void;
}

export const AiReportCard: React.FC<AiReportCardProps> = ({
  report,
  onPrintReport
}) => {
  const [kakaoModalOpen, setKakaoModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (report.score >= 85) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  }, [report.score]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 stroke-emerald-500 bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'text-teal-500 stroke-teal-500 bg-teal-50 border-teal-200';
    if (score >= 65) return 'text-amber-500 stroke-amber-500 bg-amber-50 border-amber-200';
    return 'text-rose-500 stroke-rose-500 bg-rose-50 border-rose-200';
  };

  const getGradeBadge = (grade: DiagnosisReport['grade']) => {
    switch (grade) {
      case 'S':
        return { bg: 'bg-emerald-600', text: 'S등급 (최우수)', desc: '완벽한 골든 밸런스' };
      case 'A':
        return { bg: 'bg-teal-600', text: 'A등급 (우수)', desc: '안전하고 조화로움' };
      case 'B':
        return { bg: 'bg-amber-600', text: 'B등급 (양호)', desc: '부분 개선 필요' };
      case 'C':
        return { bg: 'bg-orange-600', text: 'C등급 (주의)', desc: '중복/상극 조정 요망' };
      case 'D':
      default:
        return { bg: 'bg-rose-600', text: 'D등급 (위험)', desc: '성분 재설계 필수' };
    }
  };

  const gradeInfo = getGradeBadge(report.grade);

  const handleShareKakao = () => {
    setKakaoModalOpen(true);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(
      `[약쏙 PillSock] 나의 영양제 종합 진단 리포트 (건강점수: ${report.score}점 - ${gradeInfo.text})\n상극 성분 ${report.badInteractions.length}건, 위험 과다 ${report.dangerCount}건 진단 완료!\n결과 보기: ${window.location.href}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 mb-8 print-break-inside">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              📑
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              AI 종합 진단 리포트 & 스마트 대체 제안
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            현재 복용 중인 모든 제품의 안전성, 흡수 시너지, 경제성을 종합 평가한 1페이지 소견서입니다.
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={handleShareKakao}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-slate-900" />
            <span>카톡 리포트 공유</span>
          </button>
          <button
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>리포트 인쇄 / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Score & Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Score Card Gauge */}
        <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Award className="w-32 h-32 text-brand-400" />
          </div>

          <span className="text-xs font-bold text-slate-300 mb-2">
            약쏙 영양제 건강 점수
          </span>

          {/* Circular Score Display */}
          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className={`transition-all duration-1000 ${
                  report.score >= 80
                    ? 'stroke-emerald-400'
                    : report.score >= 60
                    ? 'stroke-amber-400'
                    : 'stroke-rose-400'
                }`}
                strokeWidth="10"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * report.score) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black tracking-tight">{report.score}</span>
              <span className="text-[10px] text-slate-400 font-bold">/ 100점</span>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-extrabold text-white mt-1 shadow-md ${gradeInfo.bg}`}
          >
            {gradeInfo.text}
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-snug">
            {report.gradeTitle}
          </p>
        </div>

        {/* AI Clinical Summary */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50 rounded-3xl p-6 border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-brand-600 text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                AI 영양학 전문 진단 소견
              </h3>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-medium mb-4 bg-white p-4 rounded-2xl border border-slate-200/80">
              "{report.summaryFeedback}"
            </p>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold">복용 영양제</p>
                <p className="text-lg font-black text-slate-900">
                  {report.totalSupplementsCount}종
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold">섭취 성분수</p>
                <p className="text-lg font-black text-slate-900">
                  {report.totalNutrientsCount}개
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <p className="text-[10px] text-rose-600 font-bold">상한 초과 위험</p>
                <p className="text-lg font-black text-rose-600">
                  {report.dangerCount}건
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <p className="text-[10px] text-amber-600 font-bold">상극 충돌</p>
                <p className="text-lg font-black text-amber-600">
                  {report.badInteractions.length}건
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>보건복지부 K-DRI & 식약처 데이터베이스 엔진 검증</span>
            <span className="font-semibold text-brand-700">약쏙 AI 2.0 엔진</span>
          </div>
        </div>
      </div>

      {/* Smart Optimization & Alternative Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1 rounded-md bg-amber-500 text-white">
            <Lightbulb className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-bold text-slate-900">
            스마트 영양제 다이어트 & 맞춤 대체 솔루션
          </h3>
        </div>

        {report.optimizationTips.length === 0 ? (
          <div className="bg-brand-50/60 border border-brand-200 rounded-2xl p-4 text-xs text-brand-800 text-center font-medium">
            현재 완벽한 균형을 유지하고 있어 별도의 성분 다이어트나 대체가 필요하지 않습니다! 🎉
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.optimizationTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-slate-50/90 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-brand-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-900">
                      {tip.title}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 shrink-0">
                      {tip.highlight}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                    {tip.description}
                  </p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-brand-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>실행 가이드: {tip.actionable}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kakao Share Modal */}
      {kakaoModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-yellow-400 p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 fill-slate-900 text-yellow-400" />
                <h3 className="text-base font-bold text-slate-900">
                  카카오톡 가족/부모님 안심 공유
                </h3>
              </div>
              <button
                onClick={() => setKakaoModalOpen(false)}
                className="p-1.5 text-slate-800 hover:bg-yellow-500 rounded-xl transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              {/* Kakao Card Preview */}
              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💊</span>
                  <span className="text-xs font-extrabold text-slate-900">
                    약쏙 (PillSock) 영양제 진단 카드
                  </span>
                </div>
                <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    종합 건강 점수: <span className="text-brand-600">{report.score}점</span> ({gradeInfo.text})
                  </p>
                  <p className="text-[11px] text-slate-600">
                    • 상극 성분: {report.badInteractions.length}건 분리 가이드
                  </p>
                  <p className="text-[11px] text-slate-600">
                    • 위험 과다: {report.dangerCount}건 발견
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2 italic">
                    "가족의 안전한 영양제 복용을 위해 약쏙 AI가 진단한 리포트입니다."
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCopyShareLink}
                  className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? '공유 텍스트 복사 완료!' : '카카오톡 공유 텍스트 복사'}</span>
                </button>
                <button
                  onClick={() => setKakaoModalOpen(false)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
