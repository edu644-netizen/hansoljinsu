import React, { useState } from 'react';
import { OCR_LABEL_SAMPLES } from '../data/products';
import { SupplementProduct, ProductNutrient, IntakeTimeSlot } from '../types';
import { NUTRIENTS_DATABASE } from '../data/nutrients';
import {
  X,
  Camera,
  Upload,
  ScanLine,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PillScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: SupplementProduct) => void;
}

export const PillScannerModal: React.FC<PillScannerModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [selectedSample, setSelectedSample] = useState(OCR_LABEL_SAMPLES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [scanCompleted, setScanCompleted] = useState(false);

  // Parsed Form State
  const [productName, setProductName] = useState(OCR_LABEL_SAMPLES[0].parsedData.name);
  const [brandName, setBrandName] = useState(OCR_LABEL_SAMPLES[0].parsedData.brand);
  const [servingSize, setServingSize] = useState(OCR_LABEL_SAMPLES[0].parsedData.servingSize);
  const [pillsPerDay, setPillsPerDay] = useState(OCR_LABEL_SAMPLES[0].parsedData.pillsPerDay);
  const [bestTime, setBestTime] = useState<IntakeTimeSlot>(OCR_LABEL_SAMPLES[0].parsedData.bestTime);
  const [nutrients, setNutrients] = useState<ProductNutrient[]>(
    OCR_LABEL_SAMPLES[0].parsedData.nutrients
  );

  if (!isOpen) return null;

  const handleStartScan = (sample = selectedSample, imgUrl: string | null = null) => {
    setIsScanning(true);
    setScanCompleted(false);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
    }, 800);

    setTimeout(() => {
      setScanStep(3);
    }, 1600);

    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      setProductName(sample.parsedData.name);
      setBrandName(sample.parsedData.brand);
      setServingSize(sample.parsedData.servingSize);
      setPillsPerDay(sample.parsedData.pillsPerDay);
      setBestTime(sample.parsedData.bestTime);
      setNutrients(sample.parsedData.nutrients);
    }, 2400);
  };

  const handleSelectSample = (sample: typeof OCR_LABEL_SAMPLES[0]) => {
    setSelectedSample(sample);
    setCustomImage(null);
    handleStartScan(sample);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setCustomImage(url);
        // Custom scan uses sample 1 parsed structure as default mock template
        handleStartScan(selectedSample, url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNutrientChange = (index: number, field: keyof ProductNutrient, value: any) => {
    const updated = [...nutrients];
    updated[index] = { ...updated[index], [field]: value };
    setNutrients(updated);
  };

  const handleRemoveNutrient = (index: number) => {
    setNutrients(nutrients.filter((_, i) => i !== index));
  };

  const handleAddNutrientRow = () => {
    setNutrients([...nutrients, { nutrientId: 'vitamin_c', amount: 100, unit: 'mg' }]);
  };

  const handleSaveToSupplements = () => {
    const newProduct: SupplementProduct = {
      id: `custom_ocr_${Date.now()}`,
      name: productName || 'OCR 스캔 영양제',
      brand: brandName || '사용자 등록',
      category: '스캔인식/사용자등록',
      servingSize: servingSize || '1일 1회, 1정',
      pillsPerDay: pillsPerDay || 1,
      bestTime,
      bestTimeReason: 'OCR 성분표 기반 AI 추천 섭취 시간대입니다.',
      nutrients: nutrients.filter((n) => n.amount > 0),
      tags: ['OCR인식', 'AI스캔'],
      approxMonthlyPrice: 20000,
      description: 'AI OCR 라벨 스캐너로 자동 인식된 영양제입니다.',
      isCustom: true
    };

    onAddProduct(newProduct);
    onClose();
  };

  const displayImage = customImage || selectedSample.imagePreview;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-emerald-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                AI 영양제 라벨 OCR 스캐너
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200">
                  식약처 규격 지원
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                영양제 뒷면 라벨 사진을 업로드하거나 촬영하면 성분명과 단위를 AI가 즉시 정형 데이터화합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Image & OCR Scanner Animation */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Sample Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                💡 샘플 라벨로 빠른 테스트:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {OCR_LABEL_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      selectedSample.id === sample.id && !customImage
                        ? 'border-brand-500 bg-brand-50/80 font-bold text-brand-900 ring-2 ring-brand-400/30'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <p className="line-clamp-1 font-semibold">{sample.parsedData.name}</p>
                    <p className="text-[10px] text-slate-400">{sample.brand}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Scan Viewport */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-900 aspect-[4/3] flex items-center justify-center shadow-inner group">
              <img
                src={displayImage}
                alt="영양제 라벨"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Scanning Overlay Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-brand-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-4">
                  {/* Laser Scan Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_15px_#34d399] animate-scan" />

                  {/* Bounding Box Guides */}
                  <div className="w-4/5 h-3/5 border-2 border-dashed border-brand-400/70 rounded-xl relative flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1 rounded-full animate-pulse">
                      영양·기능정보 표 영역 인식 중...
                    </span>
                  </div>

                  {/* Step status */}
                  <div className="mt-4 bg-slate-900/90 text-brand-300 text-xs px-3 py-1.5 rounded-lg border border-brand-500/30 shadow-lg">
                    {scanStep === 1 && '📸 1. 이미지 기울기 및 텍스트 블록 정렬...'}
                    {scanStep === 2 && '🔍 2. 성분명(비타민/미네랄) 및 단위(mg, IU) 파싱...'}
                    {scanStep === 3 && '✨ 3. K-DRI 표준 데이터베이스 매칭 중...'}
                  </div>
                </div>
              )}

              {/* File Upload Trigger */}
              <label className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 cursor-pointer flex items-center gap-1.5 transition-all">
                <Upload className="w-3.5 h-3.5 text-brand-600" />
                <span>내 사진 올리기</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={() => handleStartScan(selectedSample, customImage)}
              disabled={isScanning}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
            >
              <ScanLine className="w-4 h-4 text-brand-400" />
              <span>{isScanning ? 'AI 라벨 분석 중...' : '다시 스캔하기'}</span>
            </button>
          </div>

          {/* Right Column: Parsed Form & Extracted Ingredients */}
          <div className="lg:col-span-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>OCR 자동 추출 및 정형 데이터</span>
                </h4>
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200">
                  총 {nutrients.length}개 유효 성분 인식
                </span>
              </div>

              {/* Product Basic Info Inputs */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    제품명
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    제조/브랜드
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    1일 섭취량
                  </label>
                  <input
                    type="text"
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    AI 추천 복용 시간대
                  </label>
                  <select
                    value={bestTime}
                    onChange={(e) => setBestTime(e.target.value as IntakeTimeSlot)}
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500 bg-white"
                  >
                    <option value="morning_empty">🌅 아침 공복</option>
                    <option value="morning_meal">☀️ 아침/점심 식후</option>
                    <option value="dinner_meal">🌇 저녁 식후</option>
                    <option value="before_sleep">🌙 취침 전</option>
                  </select>
                </div>
              </div>

              {/* Nutrients List Table */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700">
                    추출된 영양 성분 및 함량 (직접 수정 가능)
                  </span>
                  <button
                    onClick={handleAddNutrientRow}
                    className="text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>성분 직접 추가</span>
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/60 p-2 space-y-2">
                  {nutrients.map((item, idx) => {
                    const nutMeta = NUTRIENTS_DATABASE.find((n) => n.id === item.nutrientId);
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs"
                      >
                        <select
                          value={item.nutrientId}
                          onChange={(e) => handleNutrientChange(idx, 'nutrientId', e.target.value)}
                          className="text-xs font-semibold text-slate-800 bg-transparent flex-1 focus:outline-none"
                        >
                          {NUTRIENTS_DATABASE.map((nd) => (
                            <option key={nd.id} value={nd.id}>
                              {nd.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          step="any"
                          value={item.amount}
                          onChange={(e) =>
                            handleNutrientChange(idx, 'amount', parseFloat(e.target.value) || 0)
                          }
                          className="w-20 text-xs font-bold text-right px-2 py-1 bg-slate-100 rounded-md border border-slate-200 focus:outline-none focus:bg-white"
                        />
                        <span className="text-[11px] text-slate-500 w-14 font-medium">
                          {nutMeta?.unit || item.unit}
                        </span>
                        <button
                          onClick={() => handleRemoveNutrient(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleSaveToSupplements}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>내 복용 목록에 추가하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
