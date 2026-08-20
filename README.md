# 💊 약쏙 (PillSock) - AI 기반 개인 맞춤형 영양제 조합·상호작용 진단 서비스

[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-teal.svg)](https://tailwindcss.com/)

> **보건복지부 2020 한국인 영양소 섭취기준(K-DRI) 및 식품의약품안전처 건강기능식품 공전 기반 AI 영양제 진단 & 4-Phase 복용 스케줄러**

---

## 📌 기획 배경 & 문제 정의

1. **성분 중복 및 과다 섭취 위험**: 현대인들이 3종 이상의 영양제를 복용하면서 지용성 비타민(비타민 A, D), 아연, 칼슘 등의 상한 섭취량(UL)을 초과하여 간독성, 신장결석, 구리 결핍 등의 부작용 위험에 노출되는 문제
2. **상극 성분 조합에 따른 흡수 방해**: 칼슘과 철분의 수용체 경쟁 흡수 저하, 고함량 비타민 C의 유산균 생균 사멸 등 일반인이 파악하기 어려운 성분 간 충돌 문제
3. **복잡한 라벨 정보**: mg, IU, μg RAE, 억 CFU 등 서로 다른 단위 표기와 복약 타이밍 계산의 어려움

---

## 🌟 핵심 기능

- **📸 AI OCR 라벨 스캐너**: 영양제 후면 '영양·기능정보' 라벨 사진 촬영/업로드 시 비타민, 미네랄 단위 및 함량 자동 정규화 & 파싱
- **📊 K-DRI 기반 성분 중복/과다 진단**: 권장량(RNI) 및 상한량(UL) 대비 4단계 안전 진단(🔴 상한초과 / 🟡 과다주의 / 🟢 적정 / ⚪ 부족) 및 제품별 기여 분해
- **⚡ 상극 궁합 & 황금 시너지 & 처방약 충돌 분석**: 칼슘-철분 시간 분리 가이드, 비타민D-칼마디 시너지, 와파린·스타틴·혈압약 등 만성질환 약물 상호작용 검사
- **⏰ AI 맞춤형 4타임라인 스케줄러**: 🌅 아침 공복 ➡️ ☀️ 점심 식후 ➡️ 🌇 저녁 식후 ➡️ 🌙 취침 전 4단계 최적 루틴 생성, Web Push 알림 시뮬레이션, 캘린더 등록(`.ics`)
- **📑 100점 만점 AI 진단 리포트 & 스마트 대체 제안**: AI 임상 소견서, 불필요한 중복 단일제 정리로 월 약 2~3만원 절약 솔루션, 1페이지 인쇄(Print/PDF)
- **👵 부모님 안심 큰 글씨 모드**: 어르신 친화형 고대비 대형 폰트 및 3대 핵심 질문 답변 뷰

---

## 🚀 GitHub Pages 10초 무료 호스팅 방법

GitHub 웹사이트(브라우저)에서 바로 무료 호스팅하는 가장 간단한 방법입니다:

1. **`github-upload`** 폴더 안의 **`index.html`** 과 **`README.md`** (총 2개 파일)을 GitHub 저장소에 드래그 앤 드롭으로 업로드합니다.
2. GitHub 저장소의 **Settings** ➡️ **Pages** 메뉴로 이동합니다.
3. **Branch**를 `main` (또는 `master`) / `/(root)` 로 지정하고 **Save**를 누릅니다.
4. 약 1분 후 발급되는 링크(`https://<아이디>.github.io/<저장소이름>/`)로 접속하면 웹사이트가 전 세계에 무료 배포됩니다!

---

## 💻 로컬 개발 환경 실행

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 단일 파일(Single File) 프로덕션 빌드
npm run build
```

---
© 2026 약쏙 (PillSock) AI. All rights reserved.
