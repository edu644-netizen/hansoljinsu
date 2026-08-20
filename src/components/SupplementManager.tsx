import React, { useState } from 'react';
import { SupplementProduct, PrescribedMedicine, ProductNutrient, IntakeTimeSlot, NutrientReference } from '../types';
import { SUPPLEMENT_CATALOG, PRESCRIBED_MEDICINES } from '../data/products';
import { NUTRIENTS_DATABASE } from '../data/nutrients';
import {
  Plus,
  Trash2,
  Camera,
  Search,
  AlertOctagon,
  Edit3,
  Check
} from 'lucide-react';

interface SupplementManagerProps {
  selectedItems: {
    product: SupplementProduct;
    doseMultiplier: number;
  }[];
  onAddSupplement: (product: SupplementProduct) => void;
  onRemoveSupplement: (productId: string) => void;
  onUpdateMultiplier: (productId: string, multiplier: number) => void;
  selectedMedicines: PrescribedMedicine[];
  onToggleMedicine: (medicine: PrescribedMedicine) => void;
  onOpenScanner: () => void;
}

export const SupplementManager: React.FC<SupplementManagerProps> = ({
  selectedItems,
  onAddSupplement,
  onRemoveSupplement,
  onUpdateMultiplier,
  selectedMedicines,
  onToggleMedicine,
  onOpenScanner
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Custom Product Form State
  const [customName, setCustomName] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [customServing, setCustomServing] = useState('1일 1회, 1캡슐');
  const [customTimeSlot, setCustomTimeSlot] = useState<IntakeTimeSlot>('lunch_meal');
  const [customNutrients, setCustomNutrients] = useState<ProductNutrient[]>([
    { nutrientId: 'vitamin_c', amount: 500, unit: 'mg' },
    { nutrientId: 'zinc', amount: 10, unit: 'mg' }
  ]);
  const [newNutrientId, setNewNutrientId] = useState('vitamin_d');
  const [newNutrientAmount, setNewNutrientAmount] = useState<number>(1000);

  const categories = [
    { id: 'ALL', label: '전체' },
    { id: '종합비타민', label: '종합비타민' },
    { id: '유산균', label: '유산균' },
    { id: '오메가3', label: '오메가3' },
    { id: '미네랄', label: '칼슘/미네랄' },
    { id: '면역', label: '아연/면역' },
    { id: '눈', label: '눈/루테인' },
    { id: '간', label: '간/밀크씨슬' }
  ];

  const filteredCatalog = SUPPLEMENT_CATALOG.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'ALL' || prod.category.includes(selectedCategory);
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.nutrients.some((n) => n.nutrientId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddCustomNutrient = () => {
    const ref = NUTRIENTS_DATABASE.find((n: NutrientReference) => n.id === newNutrientId);
    if (!ref) return;
    if (customNutrients.some((n: ProductNutrient) => n.nutrientId === newNutrientId)) {
      setCustomNutrients((prev) =>
        prev.map((n) => (n.nutrientId === newNutrientId ? { ...n, amount: newNutrientAmount } : n))
      );
    } else {
      setCustomNutrients((prev) => [
        ...prev,
        { nutrientId: newNutrientId, amount: newNutrientAmount, unit: ref.unit }
      ]);
    }
  };

  const handleRemoveCustomNutrient = (nutrientId: string) => {
    setCustomNutrients((prev) => prev.filter((n) => n.nutrientId !== nutrientId));
  };

  const handleSaveCustomProduct = () => {
    if (!customName.trim()) {
      alert('영양제 제품명을 입력해주세요.');
      return;
    }
    if (customNutrients.length === 0) {
      alert('최소 1개 이상의 영양 성분을 추가해주세요.');
      return;
    }

    const newProduct: SupplementProduct = {
      id: `custom_${Date.now()}`,
      name: customName,
      brand: customBrand || '직접 입력',
      category: '직접등록',
      servingSize: customServing,
      pillsPerDay: 1,
      bestTime: customTimeSlot,
      bestTimeReason: '사용자 지정 복용 시간대에 물과 함께 섭취하세요.',
      nutrients: customNutrients,
      tags: ['직접등록', '맞춤'],
      approxMonthlyPrice: 20000,
      description: `${customBrand || '직접 입력'} - ${customName} (사용자 직접 등록 제품)`,
      isCustom: true
    };

    onAddSupplement(newProduct);
    setIsCustomModalOpen(false);
    setIsSearchOpen(false);
    setCustomName('');
    setCustomBrand('');
    setCustomNutrients([{ nutrientId: 'vitamin_c', amount: 500, unit: 'mg' }]);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 mb-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              💊
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              복용 중인 영양제 & 처방약 등록
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {selectedItems.length}개 선택됨
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            라벨 사진 촬영(OCR), 인기 제품 검색 또는 직접 입력을 통해 현재 드시는 영양제를 등록하세요.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>라벨 사진 촬영 (OCR)</span>
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>영양제 검색 / 추가</span>
          </button>
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-extrabold shadow-2xs transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
            <span>직접 입력</span>
          </button>
        </div>
      </div>

      {/* Selected Products List */}
      {selectedItems.length === 0 ? (
        <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl my-6 bg-slate-50/50">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-3 shadow-inner">
            💊
          </div>
          <p className="text-sm font-bold text-slate-700">
            아직 등록된 영양제가 없습니다.
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            위의 <b>[라벨 사진 촬영(OCR)]</b>이나 <b>[영양제 검색 / 추가]</b>, 또는 상단의 <b>[1초 프리셋]</b>을 눌러 복용 중인 영양제를 등록해보세요.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              + 영양제 목록에서 선택
            </button>
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs cursor-pointer"
            >
              + 직접 입력하여 등록
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-6">
          {selectedItems.map(({ product, doseMultiplier }) => (
            <div
              key={product.id}
              className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    {product.brand}
                  </span>
                  <button
                    onClick={() => onRemoveSupplement(product.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {product.servingSize} • {product.category}
                </p>

                {/* Key Nutrients Chips */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {product.nutrients.slice(0, 4).map((n) => (
                    <span
                      key={n.nutrientId}
                      className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-medium"
                    >
                      {n.nutrientId}: {n.amount * doseMultiplier}
                      {n.unit}
                    </span>
                  ))}
                  {product.nutrients.length > 4 && (
                    <span className="text-[10px] text-slate-400 px-1 py-0.5">
                      +{product.nutrients.length - 4}개
                    </span>
                  )}
                </div>
              </div>

              {/* Dosage Multiplier */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  하루 섭취량:
                </span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
                  {[0.5, 1, 2, 3].map((m) => (
                    <button
                      key={m}
                      onClick={() => onUpdateMultiplier(product.id, m)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                        doseMultiplier === m
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescribed Medicine Check Section */}
      <div className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/70 mt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20 shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                복용 중인 병원 처방약 (만성질환 약물 연동 진단)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
                약물 상호작용 체크
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              병원에서 처방받아 드시는 약을 선택하시면 영양제와의 흡수 방해나 부작용(출혈, 호르몬 저하 등)을 함께 판별합니다.
            </p>

            {/* Medicine Toggle Chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {PRESCRIBED_MEDICINES.map((med) => {
                const isSelected = selectedMedicines.some((m) => m.id === med.id);
                return (
                  <button
                    key={med.id}
                    onClick={() => onToggleMedicine(med)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm ring-2 ring-rose-400/30'
                        : 'bg-white hover:bg-amber-100/60 text-slate-700 border-amber-200'
                    }`}
                  >
                    <span>{isSelected ? '✓' : '+'}</span>
                    <span>{med.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 1. Search & Add Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-fadeIn">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>영양제 검색 및 추가</span>
              </h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="제품명, 브랜드, 성분 키워드 검색 (예: 락토핏, 비타민C, 오메가3, 아연)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
                  autoFocus
                />
              </div>

              {/* Direct Add Shortcut Banner */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 mb-3 text-xs">
                <span className="text-emerald-900 font-medium">
                  찾으시는 영양제가 목록에 없으신가요?
                </span>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsCustomModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  ✨ 직접 입력하여 추가
                </button>
              </div>

              {/* Category Filter Chips */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-3 mb-3 border-b border-slate-100">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Product List */}
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {filteredCatalog.map((prod) => {
                  const isAlreadyAdded = selectedItems.some((i) => i.product.id === prod.id);
                  return (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all bg-white"
                    >
                      <div className="pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {prod.brand}
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            {prod.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {prod.description}
                        </p>
                      </div>

                      {/* Explicit High-Contrast Solid Add Button */}
                      <button
                        onClick={() => {
                          if (!isAlreadyAdded) onAddSupplement(prod);
                        }}
                        disabled={isAlreadyAdded}
                        className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm flex items-center gap-1 ${
                          isAlreadyAdded
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 border border-emerald-700'
                        }`}
                      >
                        {isAlreadyAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>추가됨</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>추가하기</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Custom Manual Product Add Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-fadeIn">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">
                  영양제 직접 입력하여 추가
                </h3>
              </div>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  제품명 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 종근당 프리미엄 비타민"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    제조사 / 브랜드
                  </label>
                  <input
                    type="text"
                    placeholder="예: 종근당건강"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    권장 복용 시간대
                  </label>
                  <select
                    value={customTimeSlot}
                    onChange={(e) => setCustomTimeSlot(e.target.value as IntakeTimeSlot)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="morning_empty">🌅 아침 공복</option>
                    <option value="lunch_meal">☀️ 점심 식후</option>
                    <option value="dinner_meal">🌇 저녁 식후</option>
                    <option value="before_sleep">🌙 취침 전</option>
                  </select>
                </div>
              </div>

              {/* Added Nutrients in Custom Product */}
              <div className="border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  포함된 주요 성분 및 함량 <span className="text-rose-500">*</span>
                </label>

                <div className="flex flex-wrap gap-2 mb-3">
                  {customNutrients.map((n: ProductNutrient) => {
                    const ref = NUTRIENTS_DATABASE.find((r: NutrientReference) => r.id === n.nutrientId);
                    return (
                      <span
                        key={n.nutrientId}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
                      >
                        <span>{ref ? ref.name : n.nutrientId}: {n.amount}{n.unit}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomNutrient(n.nutrientId)}
                          className="text-emerald-700 hover:text-rose-600 font-bold ml-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>

                {/* Add Nutrient Row */}
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <select
                    value={newNutrientId}
                    onChange={(e) => setNewNutrientId(e.target.value)}
                    className="flex-1 px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  >
                    {NUTRIENTS_DATABASE.map((nut: NutrientReference) => (
                      <option key={nut.id} value={nut.id}>
                        {nut.name} ({nut.unit})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="함량"
                    value={newNutrientAmount}
                    onChange={(e) => setNewNutrientAmount(Number(e.target.value))}
                    className="w-20 px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomNutrient}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    + 성분 추가
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCustomModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomProduct}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md cursor-pointer"
                >
                  영양제 등록 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
