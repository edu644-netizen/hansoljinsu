import React, { useState, useMemo } from 'react';
import { TargetProfileType, SupplementProduct, PrescribedMedicine } from './types';
import { SUPPLEMENT_CATALOG, PRESCRIBED_MEDICINES, DEMO_PERSONAS } from './data/products';
import { runDiagnosisEngine, SelectedItem } from './utils/diagnosisEngine';
import { Header } from './components/Header';
import { PersonaBar } from './components/PersonaBar';
import { SupplementManager } from './components/SupplementManager';
import { OverdoseDiagnosis } from './components/OverdoseDiagnosis';
import { InteractionMatrix } from './components/InteractionMatrix';
import { TimeScheduler } from './components/TimeScheduler';
import { AiReportCard } from './components/AiReportCard';
import { ParentCareView } from './components/ParentCareView';
import { PillScannerModal } from './components/PillScannerModal';
import { PrintableReport } from './components/PrintableReport';
import { Sparkles, Shield, HeartPulse, Stethoscope, ChevronRight } from 'lucide-react';

export const App: React.FC = () => {
  // 1. App State
  const [currentProfile, setCurrentProfile] = useState<TargetProfileType>('adult');
  const [activePersonaId, setActivePersonaId] = useState<string | null>('persona_overdose_worker');
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Initial demo supplements: Persona 1 (피로회복 직장인 - 아연/비타민A 과다 & 상극)
  const initialItems: SelectedItem[] = useMemo(() => {
    const defaultPersona = DEMO_PERSONAS[0];
    return defaultPersona.initialSupplements
      .map((id) => {
        const prod = SUPPLEMENT_CATALOG.find((p) => p.id === id);
        return prod ? { product: prod, doseMultiplier: 1 } : null;
      })
      .filter((item): item is SelectedItem => item !== null);
  }, []);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(initialItems);
  const [selectedMedicines, setSelectedMedicines] = useState<PrescribedMedicine[]>([]);

  // 2. Real-time AI Diagnosis Engine
  const diagnosisReport = useMemo(() => {
    return runDiagnosisEngine(selectedItems, selectedMedicines, currentProfile);
  }, [selectedItems, selectedMedicines, currentProfile]);

  // 3. Handlers
  const handleSelectPersona = (personaId: string) => {
    const persona = DEMO_PERSONAS.find((p) => p.id === personaId);
    if (!persona) return;

    setActivePersonaId(personaId);
    setCurrentProfile(persona.profileType);

    const prods = persona.initialSupplements
      .map((id) => {
        const p = SUPPLEMENT_CATALOG.find((cat) => cat.id === id);
        return p ? { product: p, doseMultiplier: 1 } : null;
      })
      .filter((item): item is SelectedItem => item !== null);

    const meds = persona.initialMedicines
      .map((id) => PRESCRIBED_MEDICINES.find((m) => m.id === id))
      .filter((m): m is PrescribedMedicine => m !== undefined);

    setSelectedItems(prods);
    setSelectedMedicines(meds);

    if (persona.profileType === 'senior') {
      setIsSeniorMode(true);
    }
  };

  const handleResetAll = () => {
    setSelectedItems([]);
    setSelectedMedicines([]);
    setActivePersonaId(null);
  };

  const handleAddSupplement = (product: SupplementProduct) => {
    if (selectedItems.some((i) => i.product.id === product.id)) return;
    setSelectedItems((prev) => [...prev, { product, doseMultiplier: 1 }]);
    setActivePersonaId(null);
  };

  const handleRemoveSupplement = (productId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.product.id !== productId));
    setActivePersonaId(null);
  };

  const handleUpdateMultiplier = (productId: string, multiplier: number) => {
    setSelectedItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, doseMultiplier: multiplier } : i))
    );
  };

  const handleToggleMedicine = (medicine: PrescribedMedicine) => {
    setSelectedMedicines((prev) => {
      const exists = prev.some((m) => m.id === medicine.id);
      if (exists) {
        return prev.filter((m) => m.id !== medicine.id);
      }
      return [...prev, medicine];
    });
    setActivePersonaId(null);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen ${isSeniorMode ? 'text-lg' : ''}`}>
      {/* Printable 1-Page Medical Report (shown only during print) */}
      <PrintableReport
        report={diagnosisReport}
        profileType={currentProfile}
        selectedSupplementsCount={selectedItems.length}
      />

      {/* Main Web UI (hidden when printing) */}
      <div className="no-print">
        {/* Header */}
        <Header
          currentProfile={currentProfile}
          onSelectProfile={(p) => {
            setCurrentProfile(p);
            setActivePersonaId(null);
          }}
          isSeniorMode={isSeniorMode}
          onToggleSeniorMode={() => setIsSeniorMode(!isSeniorMode)}
          onOpenScanner={() => setIsScannerOpen(true)}
          onPrintReport={handlePrintReport}
        />

        {/* Hero & Tagline */}
        <div className="bg-gradient-to-b from-brand-50/50 via-teal-50/30 to-transparent py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold mb-3 border border-brand-200">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
                  <span>보건복지부 K-DRI & 식약처 공인 데이터 기반</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  내가 먹는 영양제, 과하지 않고 서로 잘 맞을까? <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-teal-600 to-indigo-600">
                    약쏙 AI로 1초 만에 성분 중복·상극 진단!
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl font-medium">
                  라벨 촬영(OCR)으로 성분을 자동 추출하고, 위험한 상한 섭취량 초과와 흡수를 방해하는 상극 조합을 진단해 최적의 4타임라인 복용 스케줄을 만들어 드립니다.
                </p>
              </div>

              {/* Quick Hero Stat Badge */}
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xl">
                  {diagnosisReport.score}
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold">실시간 약쏙 점수</p>
                  <p className="text-sm font-extrabold text-slate-900">
                    {diagnosisReport.gradeTitle}
                  </p>
                  <p className="text-[11px] text-brand-700 font-semibold">
                    위험 {diagnosisReport.dangerCount}건 · 상극 {diagnosisReport.badInteractions.length}건
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Persona Bar */}
          <PersonaBar
            onSelectPersona={handleSelectPersona}
            onResetAll={handleResetAll}
            activePersonaId={activePersonaId}
          />

          {/* Parent Care / Senior Mode Notice */}
          {isSeniorMode && (
            <ParentCareView
              report={diagnosisReport}
              onClose={() => setIsSeniorMode(false)}
            />
          )}

          {/* 1. Supplements Intake Manager */}
          <SupplementManager
            selectedItems={selectedItems}
            onAddSupplement={handleAddSupplement}
            onRemoveSupplement={handleRemoveSupplement}
            onUpdateMultiplier={handleUpdateMultiplier}
            selectedMedicines={selectedMedicines}
            onToggleMedicine={handleToggleMedicine}
            onOpenScanner={() => setIsScannerOpen(true)}
          />

          {/* 2. Overdose & Toxicity Diagnosis */}
          <OverdoseDiagnosis
            nutrientStatuses={diagnosisReport.nutrientStatuses}
            profileType={currentProfile}
          />

          {/* 3. Interaction Matrix (Bad & Good) */}
          <InteractionMatrix
            badInteractions={diagnosisReport.badInteractions}
            goodInteractions={diagnosisReport.goodInteractions}
            prescribedDrugWarnings={diagnosisReport.prescribedDrugWarnings}
          />

          {/* 4. AI Timeline Scheduler */}
          <TimeScheduler
            timelineSchedule={diagnosisReport.timelineSchedule}
          />

          {/* 5. Comprehensive AI Report Card */}
          <AiReportCard
            report={diagnosisReport}
            onPrintReport={handlePrintReport}
          />
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 pb-8 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💊</span>
                  <span className="text-lg font-black text-white">
                    약쏙 <span className="text-brand-400 font-semibold text-sm">(PillSock)</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 max-w-md leading-relaxed">
                  약쏙은 보건복지부의 2020 한국인 영양소 섭취기준(K-DRI)과 식품의약품안전처 건강기능식품 데이터베이스를 기반으로 영양제 중복 및 상호작용을 판별하는 AI 서비스입니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 text-xs">
                <div>
                  <h4 className="font-bold text-slate-200 mb-2">주요 기능</h4>
                  <ul className="space-y-1.5 text-slate-400">
                    <li>• OCR 라벨 자동 인식</li>
                    <li>• K-DRI 상한 섭취량 진단</li>
                    <li>• 상극 & 시너지 성분 궁합</li>
                    <li>• 4단계 복용 스케줄러</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 mb-2">진단 기준</h4>
                  <ul className="space-y-1.5 text-slate-400">
                    <li>• 보건복지부 K-DRI</li>
                    <li>• 식약처 건강기능식품 공전</li>
                    <li>• 대한약사회 복약지도 가이드</li>
                    <li>• 의학 영양 상호작용 DB</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <p>© 2026 약쏙 (PillSock) AI. All rights reserved.</p>
              <p className="text-slate-400">
                ⚠️ 본 서비스는 건강 정보 제공 및 복약 보조 목적이며, 의사의 전문적인 진단과 처방을 대신하지 않습니다.
              </p>
            </div>
          </div>
        </footer>

        {/* OCR Scanner Modal */}
        <PillScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onAddProduct={handleAddSupplement}
        />
      </div>
    </div>
  );
};

export default App;
