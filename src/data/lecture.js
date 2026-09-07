/** 강사용 탭 전용 데이터. 슬라이드 본문은 slides.js에 있다. */

export const META = {
  title: '군외중 바이브코딩',
  subtitle: '우리 학교가 배경인 게임 만들기',
  date: '2026. 9. 7.',
  duration: '100분 연강',
  teacher: '선영욱 (장흥 관산중 · 사회/역사)',
}

export const MODEL_RANKING = {
  source: 'https://www.moket.kr/rankings',
  sourceNote: '모켓 AI 모델 순위 · 2026-09-06 기준 · 데이터 출처 Artificial Analysis',
  rows: [
    { rank: '27위', name: 'Gemini 3.8 Flash (high)', total: 83, coding: 76.3, pick: true },
    { rank: '28위', name: 'Gemini 3.8 Flash (medium)', total: 82, coding: 74.1 },
    { rank: '39위', name: 'Gemini 3.7 Flash (high)', total: 79, coding: 76.1 },
    { rank: '46위', name: 'Gemini 3.7 Flash (medium)', total: 76, coding: 71.5 },
    { rank: '49위', name: 'Gemini 3.8 Flash (low)', total: 74, coding: 73.5 },
    { rank: '순위 없음', name: 'Gemini 3.1 Pro', total: '—', coding: '—', absent: true },
  ],
  points: [
    '<b>3.1 Pro는 50위 안에 이름조차 없습니다.</b> 반면 3.8 Flash는 27위. "Pro가 상위 모델"이라는 이름값은 최신 Flash 앞에서 성립하지 않습니다.',
    '<b>같은 3.8 Flash라도 사고 수준에 따라 코딩 점수가 갈립니다</b> — high 76.3 / medium 74.1 / low 73.5. 게임의 충돌 판정처럼 까다로운 코드에서는 반드시 <b>high</b>.',
    '3.8 Flash(high) 83점 &gt; 3.7 Flash(high) 79점. <b>드롭다운에 3.8이 있으면 3.8.</b>',
  ],
  why: [
    { head: '속도', body: '이 실습의 본질은 "고쳐줘"를 수십 번 반복하는 것입니다. Pro는 추론 단계를 더 밟느라 느립니다. 응답이 30초씩 밀리면 학생 1인당 5~10분이 대기로 사라집니다.' },
    { head: '컨텍스트는 무의미', body: 'Pro의 최대 강점은 초대형 컨텍스트인데, 우리가 만드는 건 HTML 파일 하나(길어야 500줄)입니다.' },
    { head: '쿼터', body: '교육용 계정은 Pro 계열 사용량 제한이 더 빡빡합니다. 20명이 동시에 두드리다 수업 중반에 한도에 걸리면 복구가 안 됩니다.' },
  ],
}

export const PREP = [
  {
    group: '🔥 최우선',
    items: [
      '군외중 담당 선생님께 <b>학생 깃허브 가입 사전 요청</b> — 11분 절약, 가장 가치 있는 준비',
      '아이모두 학생 계정에서 <b>① Canvas ② 이미지 생성 ③ 3.8 Flash 선택</b> 가능 여부 사전 테스트',
      '<b>군외중·완도 사진 폴더 + QR</b> — STEP 2 필수. 검색시키면 시간 폭발',
      '<b>Supabase 프로젝트 + rankings 테이블 + 데모 게임 사전 배포</b> — STEP 6, 리허설 필수',
    ],
  },
  {
    group: '계정 · 인프라',
    items: [
      '강사용 깃허브 / Vercel / Supabase 로그인 상태로 대기 (수업 중 로그인 화면 금지)',
      'Supabase URL · anon key 대형 인쇄물 (학생이 보고 입력)',
      '군외중 와이파이 확인 + 핫스팟 백업',
      '학생 이메일 수신 가능 여부 확인 (사전 가입 불발 시 대비)',
    ],
  },
  {
    group: '자료',
    items: [
      '이 앱 주소 QR (학생 폰으로 프롬프트 복사용)',
      '강사가 미리 만든 픽셀아트 배경 전/후 예시 1장',
      '완성 게임 백업 코드 (좌초 학생 구제용)',
      'QR: 사진 폴더 / 사례 사이트 2개 / 데모 게임',
      '집에서 이어가기 안내문',
    ],
  },
]

export const RISKS = [
  { case: '캐릭터가 발판을 뚫고 지나감', fix: '"캐릭터가 발판을 뚫고 지나가. 고쳐줘"처럼 증상 그대로 말하게 안내. 3회 실패 시 백업 코드' },
  { case: 'Canvas 버튼을 안 켜서 앱이 안 만들어짐', fix: 'STEP 1-2에서 전원 Canvas 켜짐 확인 후 출발' },
  { case: '학생 계정에서 이미지 생성 제한', fix: 'STEP 2를 강사 시연 1회로 축소, 강사가 만든 배경 이미지를 공유 폴더로 배포' },
  { case: '메모장 저장 실수 (index.html.txt, 한글 깨짐)', fix: 'STEP 3 저장 3대 주의사항 슬라이드를 띄운 채로 순회. 가장 사고 많은 구간' },
  { case: '배포했는데 배경이 안 나옴', fix: '① bg.png 소문자 확인 ② 두 파일이 같은 위치인지 ③ 파일명 공백 없는지' },
  { case: '배포했는데 빈 화면', fix: '파일명이 index.html이 맞는지 (대문자·오타·.txt 확인)' },
  { case: '깃허브 인증 메일 미도착', fix: '해당 학생은 짝의 화면으로 함께 진행 + 가정 학습 안내문' },
  { case: '저장소를 Private으로 만듦', fix: 'Settings 맨 아래 → Change visibility → Public' },
  { case: '와이파이 다운', fix: '강사 핫스팟 전환 (Canvas는 각자 세션이라 개인 실습은 계속 가능)' },
  { case: '진도 차 심화', fix: '먼저 끝낸 학생을 미니 조교로 임명해 순회 지원 — 핵심 운영 장치' },
  { case: '60분에 STEP 4 미시작', fix: '즉시 Plan B 전환' },
  { case: '부적절 콘텐츠 프롬프트', fix: '시작 전 약속 1개: "우리 반 모두가 봐도 즐거운 것만" + 랭킹은 실명' },
]

export const PLAN_B = {
  trigger: '60분 시점에 STEP 4(깃허브)가 시작되지 않았을 때',
  steps: [
    '손들기 투표로 <b>대표작 2개</b>를 선정합니다.',
    '제작한 학생을 앞으로 불러 <b>함께 클릭하며 라이브 배포</b>합니다. (주인공 경험)',
    '완성된 URL을 QR로 즉시 표시하고 전원 접속 → 랭킹전은 그대로 진행합니다.',
    '나머지 학생에게 "여러분 게임도 집에서 똑같이 하면 됩니다" + <b>STEP 4·5 안내문</b>을 배부합니다.',
  ],
  note: '안내문이 있으면 Plan B로 가도 학습 손실이 거의 없습니다.',
}

export const INTENT = [
  { k: '재미', v: '우리 학교가 게임 배경이 됨 + 내 그림이 게임에 들어감 + 전원 랭킹전' },
  { k: '성취감', v: '진짜 URL + 친구가 내 게임을 플레이 + 랭킹보드에 내 이름' },
  { k: '직접 하기', v: '파일 저장 · 깃허브 업로드 · 배포 버튼을 학생이 클릭. AI는 코드만 쓴다' },
  { k: '핵심 장치', v: '"Canvas에선 배경이 안 보인다 → 배포하면 보인다"로 깃허브·배포를 하고 싶은 일로 전환' },
  { k: '안전장치', v: '사전 가입 요청 + 40·60분 기준점 + Plan B + 백업 코드 + 미니 조교' },
]
