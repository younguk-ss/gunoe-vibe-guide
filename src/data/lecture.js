export const META = {
  title: '군외중 바이브코딩',
  subtitle: '우리 학교가 배경인 게임 만들기',
  date: '2026. 9. 7.',
  duration: '100분 연강',
  teacher: '선영욱 (장흥 관산중 · 사회/역사)',
  goal: '천관산 점프 게임 같은 것을 만들고 → 우리 지역·학교 사진을 배경에 넣고 → 깃허브에 올려 → 진짜 주소로 배포하고 → DB에 기록을 저장한다.',
}

export const TIMETABLE = [
  { time: '4분', label: '오프닝 + 강사 소개', note: '"사회쌤이 왜 코딩을?"' },
  { time: '6분', label: '선배 작품 사례', note: '천관산 게임 직접 플레이' },
  { time: '8분', label: '작동 원리 이론', note: '프론트 / DB / 배포 / 깃허브' },
  { time: '22분', label: 'STEP 1. 게임 만들기', note: 'Canvas로 점프 게임 제작', step: 1 },
  { time: '8분', label: 'STEP 2. 배경 픽셀아트', note: '우리 지역·학교 사진 변환', step: 2 },
  { time: '5분', label: 'STEP 3. 배경 연결 + 저장', note: '⭐ "안 보이는" 순간', step: 3 },
  { time: '17분', label: 'STEP 4. 깃허브 업로드', note: '가입 + 저장소 + 파일 2개', step: 4 },
  { time: '10분', label: 'STEP 5. Vercel 배포', note: '진짜 주소 + 배경 등장!', step: 5 },
  { time: '10분', label: 'STEP 6. DB 랭킹 연결', note: '반 전체 랭킹 공유', step: 6 },
  { time: '10분', label: '클로징 · 전원 랭킹전', note: 'QR 접속, 랭킹 실시간 중계' },
]

export const PACE = [
  { at: '40분', rule: 'STEP 2 미시작 → 배경은 강사 시연 1회로 축소' },
  { at: '60분', rule: 'STEP 4 미시작 → 즉시 Plan B 전환' },
]

export const REFERENCES = [
  { label: '물축제 미니게임 아케이드', url: 'https://jh-water-map.vercel.app/' },
  { label: '관산중 학생 작품', url: 'https://jh-01.vercel.app/' },
]

export const THEORY = [
  { term: '바이브코딩', desc: 'AI는 수많은 코드를 학습했기에, 한국어로 원하는 것을 쓰면 코드로 바꿔 작성해 준다' },
  { term: '프론트엔드', desc: '사용자의 브라우저에서 실행되는 코드. HTML(뼈대) + CSS(디자인) + JS(동작). 오늘 Canvas에서 만드는 게 이것' },
  { term: '백엔드', desc: '내 컴퓨터가 아니라 서버(24시간 켜진 컴퓨터)에서 실행되며 여러 사용자의 요청을 처리하는 코드' },
  { term: 'DB (데이터베이스)', desc: '데이터를 저장하는 전용 서버. 내 브라우저에 저장하면 나만 보이지만, DB에 저장하면 모두가 같은 데이터를 본다 → 오늘의 랭킹보드' },
  { term: '배포 (Vercel)', desc: '내 코드와 이미지 파일을 인터넷 서버에 올려, 누구나 URL로 접속하면 서버가 보내주게 만드는 것' },
  { term: '깃허브 (GitHub)', desc: '코드와 파일을 올려(push) 보관하고 버전 기록이 남는 저장소. Vercel은 깃허브 내용을 가져가 자동 배포한다' },
]

export const THEMES = [
  { emoji: '🏫', name: '군외중 탈출', desc: '밤의 학교를 빠져나가기', photo: '군외중 건물 · 운동장' },
  { emoji: '🌊', name: '완도 바다', desc: '명사십리 · 바닷속 탐험', photo: '완도 바다 · 해변' },
  { emoji: '🏯', name: '청해진 유적', desc: '장보고의 청해진에서 탈출', photo: '청해진 유적 · 완도타워' },
]

export const STEPS = [
  {
    id: 1,
    icon: '🎮',
    title: '게임 만들기',
    duration: '22분',
    goal: '제미나이 Canvas로 2D 점프 게임의 뼈대를 완성한다.',
    blocks: [
      {
        type: 'theme',
        title: '1-1. 스테이지 테마 고르기 (30초)',
        note: '고민이 길어지면 안 됩니다. 30초 안에 결정하세요.',
      },
      {
        type: 'steps',
        title: '1-2. 제미나이 켜고 준비하기',
        items: [
          '아이모두 제미나이에 접속해서 로그인합니다.',
          '모델 선택 드롭다운에서 <b>3.8 Flash</b>를 고릅니다. (없으면 가장 최신 Flash)',
          '사고 수준 옵션이 있으면 <b>high</b>로 설정합니다.',
          '입력창 아래 <b>[Canvas]</b> 버튼을 켭니다.',
        ],
      },
      {
        type: 'warn',
        title: 'Canvas 버튼을 안 켜면 앱이 안 만들어집니다',
        text: '출발 전에 반 전체가 Canvas를 켰는지 반드시 확인하세요. 이걸 놓치면 나중에 처음부터 다시 해야 합니다.',
      },
      {
        type: 'prompt',
        label: '1-3. 시작 프롬프트 — 그대로 복사해서 붙여넣기',
        text: `너는 실력 있는 웹 게임 개발자야.
HTML 파일 하나로 완성되는 2D 점프 게임을 만들어줘.

[조작] 좌우 방향키로 이동, 스페이스바로 점프 (공중에서 한 번 더 점프 가능)
[목표] 왼쪽에서 시작해 오른쪽 끝의 출구에 닿으면 "STAGE CLEAR"
[구성] 높이가 다른 발판 5~6개, 아래로 떨어지면 시작 지점에서 다시 시작
[분위기] 어둡고 푸른 톤, 캐릭터와 지형은 검은 실루엣, 은은하게 빛나는 느낌
[배경] 하늘 / 먼 산 / 앞쪽 지형 3겹이 서로 다른 속도로 움직이는 패럴랙스 효과
[조건] HTML 파일 하나로, <canvas>로 그리고,
      스마트폰에서도 되도록 화면 아래에 터치 버튼(←, →, 점프)도 넣어줘`,
      },
      {
        type: 'note',
        title: '1-4. 다듬기 — 한 번에 하나씩',
        text: '아래 프롬프트를 <b>순서대로 하나씩</b> 넣으세요. 결과를 확인하고 다음으로 넘어갑니다. 여러 개를 한꺼번에 넣으면 AI가 헷갈립니다.',
      },
      {
        type: 'prompt',
        label: '① 수집품과 장애물 추가',
        text: `빛나는 수집품 5개를 배치하고, 다 모아야 출구가 열리게 해줘.
안 모으고 출구에 닿으면 "아직 ○개 남았어"가 뜨게 해줘.
바닥 두 곳에 가시를 놓고 닿으면 처음부터 다시 시작하게 해줘.`,
      },
      {
        type: 'prompt',
        label: '② 클리어 기록 표시',
        text: `시작부터 클리어까지 걸린 시간을 화면 위에 초 단위로 표시하고,
클리어하면 "STAGE CLEAR"와 기록이 크게 뜨게 해줘.`,
      },
      {
        type: 'prompt',
        label: '③ 효과음 넣기 ⭐',
        text: `점프할 때와 수집품 먹을 때 짧은 효과음을
Web Audio API로 코드에서 직접 만들어서 재생해줘. (음악 파일 없이)`,
      },
      {
        type: 'note',
        title: '왜 Web Audio API인가',
        text: 'Canvas는 외부 음악 파일을 쓸 수 없습니다. <b>코드로 소리를 만드는 것이 소리를 넣는 유일한 방법</b>입니다.',
      },
      {
        type: 'prompt',
        label: '④ 난이도 조절 (필요할 때만)',
        text: `점프력을 조금 키워줘`,
      },
      {
        type: 'teacher',
        title: '막힌 학생에게 할 말',
        items: [
          '"<b>에러 메시지를 그대로 복사해서 AI에게 던지세요.</b> \'이거 고쳐줘\'도 훌륭한 코딩입니다."',
          '"<b>증상을 그대로 말하세요.</b> 예: <code>캐릭터가 발판을 뚫고 지나가. 고쳐줘</code>"',
          '3회 이상 실패하면 → 강사 백업 코드를 투입합니다.',
        ],
      },
    ],
  },
  {
    id: 2,
    icon: '🎨',
    title: '배경 사진을 픽셀아트로',
    duration: '8분',
    goal: '우리 지역·학교 사진을 게임 배경용 픽셀아트로 바꾸고 bg.png로 저장한다.',
    blocks: [
      {
        type: 'warn',
        title: '이 작업은 Canvas가 아니라 "일반 대화"에서 합니다',
        text: '제미나이에서 <b>새 대화창</b>을 여세요. 게임을 만들던 <b>Canvas 대화는 닫지 마세요.</b> 곧 다시 돌아옵니다.',
      },
      {
        type: 'steps',
        title: '2-1. 사진 고르기',
        items: [
          '강사가 준 <b>사진 폴더 QR</b>을 찍습니다.',
          '군외중 또는 완도 사진 중 마음에 드는 것 <b>1장</b>을 고릅니다.',
          '내 컴퓨터에 다운로드합니다.',
        ],
      },
      {
        type: 'prompt',
        label: '2-2. 픽셀아트로 변환 — 사진을 첨부한 뒤 붙여넣기',
        text: `이 사진을 게임 배경으로 쓸 픽셀아트로 바꿔줘.
어둡고 신비로운 분위기로, 남색과 보라색 위주에 은은하게 빛나는 느낌으로.
가로로 긴 형태(16:9), 앞쪽은 어두운 실루엣, 뒤쪽은 흐릿하게.`,
      },
      {
        type: 'steps',
        title: '2-3. 저장하기 — 파일 이름이 가장 중요합니다',
        items: [
          '생성된 이미지에 <b>마우스 우클릭</b> → [이미지를 다른 이름으로 저장]',
          '저장 위치: <b>바탕화면</b>',
          '파일 이름: <b>bg.png</b>',
        ],
      },
      {
        type: 'warn',
        title: '파일 이름은 반드시 소문자 영문 bg.png',
        items: [
          '<code>배경.png</code> — 안 됩니다 (한글)',
          '<code>BG.PNG</code> — 안 됩니다 (대문자)',
          '<code>bg 1.png</code> — 안 됩니다 (띄어쓰기)',
          '<b><code>bg.png</code></b> — 이것만 됩니다',
        ],
      },
      {
        type: 'design3',
        title: '디자인 3단계 원칙',
      },
    ],
  },
  {
    id: 3,
    icon: '🔗',
    title: '배경 연결 + 파일 저장',
    duration: '5분',
    highlight: true,
    goal: '배경을 코드에 연결하고, 왜 지금은 안 보이는지 이해한다. 그리고 코드를 index.html로 저장한다.',
    blocks: [
      {
        type: 'steps',
        title: '3-1. Canvas 대화로 돌아가서 코드 수정',
        items: ['아까 게임을 만들던 <b>Canvas 대화</b>로 돌아갑니다.', '아래 프롬프트를 붙여넣습니다.'],
      },
      {
        type: 'prompt',
        label: '배경 이미지 연결 프롬프트',
        text: `bg.png 라는 배경 이미지 파일을 index.html과 같은 폴더에 넣을 거야.
게임 배경으로 이 이미지를 불러와서 쓰도록 코드를 수정해줘.
화면 크기에 맞게 늘어나고, 패럴랙스로 천천히 움직이게 해줘.`,
      },
      {
        type: 'aha',
        title: '3-2. 배경이 안 보입니다 — 정상입니다',
        teacherScript: `지금 배경 안 보이죠? <b>정상입니다. 여러분이 틀린 게 아닙니다.</b>

왜 그럴까요? 코드는 지금 <code>bg.png</code>를 찾고 있어요.
그런데 <b>여기(Canvas)에는 파일을 넣을 폴더 자체가 없습니다.</b>

그럼 어떻게 해야 할까요?
<b>파일을 넣을 수 있는 진짜 공간이 필요합니다. 그게 깃허브입니다.</b>

지금부터 그걸 만들러 갑니다.
그리고 배포하는 순간, 이 배경이 나타납니다.`,
      },
      {
        type: 'steps',
        title: '3-3. 코드를 파일로 저장하기',
        items: [
          'Canvas 화면 <b>우측 상단 코드 보기</b> → <b>복사 버튼</b>을 눌러 전체 코드를 복사합니다.',
          '<b>메모장</b>을 엽니다. (윈도우 키 → "메모장" 입력)',
          '<b>Ctrl + V</b>로 붙여넣습니다.',
          '<b>[파일] → [다른 이름으로 저장]</b>을 누릅니다.',
          '아래 <b>3가지를 반드시 확인</b>하고 저장합니다.',
          '저장 위치는 <b>바탕화면</b> — bg.png와 같은 곳이어야 합니다.',
        ],
      },
      {
        type: 'savetable',
        title: '저장할 때 반드시 확인할 3가지 — 가장 사고가 많은 구간',
      },
      {
        type: 'success',
        title: '여기까지 오면',
        text: '바탕화면에 <b>index.html</b>과 <b>bg.png</b> 두 개의 파일이 있어야 합니다. 강사가 순회하며 확인합니다.',
      },
    ],
  },
  {
    id: 4,
    icon: '📦',
    title: '깃허브에 올리기 (push)',
    duration: '17분',
    goal: '깃허브 계정을 만들고, 저장소에 index.html과 bg.png를 올린다.',
    blocks: [
      {
        type: 'note',
        title: '이미 가입했다면',
        text: '4-1을 건너뛰고 <b>4-2부터</b> 시작하세요. 6분이면 끝납니다.',
      },
      {
        type: 'steps',
        title: '4-1. 깃허브 가입하기',
        items: [
          '<b>github.com</b>에 접속합니다.',
          '우측 상단 <b>[Sign up]</b>을 클릭합니다.',
          '<b>이메일</b>을 입력하고 [Continue].',
          '<b>비밀번호</b>를 입력합니다. (8자 이상, 숫자와 소문자 포함) → [Continue]',
          '<b>사용자 이름(Username)</b>을 입력합니다. 영문+숫자만 되고, 이미 있는 이름은 거부됩니다. 예: <code>gunoe-hong01</code>',
          '이메일 수신 여부를 물으면 <code>n</code>을 입력해도 됩니다. → [Continue]',
          '사람인지 확인하는 퍼즐을 통과하고 <b>[Create account]</b>.',
          '<b>이메일로 온 8자리 코드</b>를 입력합니다.',
        ],
      },
      {
        type: 'warn',
        title: '사용자 이름은 신중하게',
        text: '이 이름이 <b>나중에 내 사이트 주소에 들어갑니다.</b> 친구들에게 보여줄 이름이라고 생각하고 정하세요.',
      },
      {
        type: 'steps',
        title: '4-2. 저장소(Repository) 만들기',
        items: [
          '우측 상단 <b>[+]</b> → <b>[New repository]</b>',
          '<b>Repository name</b>에 영문으로 이름을 씁니다. 예: <code>gunoe-game</code>',
          '<b>[Public]</b>을 선택합니다.',
          '아래 <b>[Create repository]</b>를 누릅니다.',
        ],
      },
      {
        type: 'warn',
        title: '반드시 Public을 선택하세요',
        text: 'Private으로 만들면 <b>무료 배포가 안 됩니다.</b> 이미 만들었다면 Settings 맨 아래 → Change visibility → Public으로 바꿀 수 있습니다.',
      },
      {
        type: 'steps',
        title: '4-3. 파일 2개 올리기 = push',
        items: [
          '화면 중간의 <b>uploading an existing file</b> 링크를 클릭합니다.',
          '바탕화면의 <b>index.html과 bg.png를 함께 드래그</b>해서 놓습니다.',
          '아래로 스크롤해서 초록색 <b>[Commit changes]</b>를 누릅니다.',
        ],
      },
      {
        type: 'teacher',
        title: '강사 멘트',
        items: [
          '"방금 여러분이 한 게 <b>push</b>입니다. 코드가 저장소에 올라갔고, <b>이제부터 바꿀 때마다 기록이 남습니다.</b> 실수해도 예전 버전으로 되돌릴 수 있어요."',
        ],
      },
      {
        type: 'success',
        title: '확인',
        text: '저장소 화면에 <b>index.html</b>과 <b>bg.png</b> 두 파일이 보이면 성공입니다.',
      },
    ],
  },
  {
    id: 5,
    icon: '🚀',
    title: 'Vercel로 배포하기',
    duration: '10분',
    highlight: true,
    goal: '진짜 인터넷 주소를 만들고, 드디어 배경이 나타나는 것을 확인한다.',
    blocks: [
      {
        type: 'steps',
        title: '5-1. Vercel 가입하기',
        items: [
          '<b>vercel.com</b>에 접속합니다.',
          '<b>[Sign Up]</b>을 클릭합니다.',
          '<b>[Continue with GitHub]</b>를 선택합니다.',
          '깃허브 로그인 화면이 뜨면 로그인하고 <b>[Authorize Vercel]</b>을 누릅니다.',
          '이름이나 용도를 물으면 <b>Personal(개인용)</b>을 선택합니다.',
        ],
      },
      {
        type: 'warn',
        title: '이메일로 가입하지 마세요',
        text: '반드시 <b>[Continue with GitHub]</b>로 가입해야 합니다. 그래야 아까 만든 저장소를 바로 가져올 수 있습니다.',
      },
      {
        type: 'steps',
        title: '5-2. 배포하기',
        items: [
          '<b>[Add New...]</b> → <b>[Project]</b>',
          '내 저장소 목록에서 아까 만든 <b>gunoe-game</b> 옆의 <b>[Import]</b>를 클릭합니다.',
          '설정은 <b>아무것도 건드리지 말고</b> 그냥 <b>[Deploy]</b>를 누릅니다.',
          '30초에서 1분 정도 기다립니다.',
          '축하 화면이 뜨면 <b>[Continue to Dashboard]</b> → 상단의 <b>주소(URL)</b>를 확인합니다.',
        ],
      },
      {
        type: 'aha',
        title: '5-3. 배경이 나타나는 순간',
        teacherScript: `아까 Canvas에서는 왜 안 보였고, 지금은 왜 보일까요?

<b>깃허브에 index.html과 bg.png를 같은 곳에 올렸기 때문입니다.</b>
이제 코드가 <code>bg.png</code>를 찾으면, 바로 옆에 진짜로 있으니까 불러올 수 있는 겁니다.

<b>여러분이 만든 그림이, 여러분이 만든 게임에 들어갔습니다.</b>`,
      },
      {
        type: 'steps',
        title: '이제 할 일',
        items: [
          '내 주소를 <b>QR로 만들어</b> 폰으로 접속해봅니다.',
          '친구에게 주소를 공유합니다.',
        ],
      },
      {
        type: 'warn',
        title: '배경이 안 나온다면 이 순서로 확인',
        items: [
          '<code>bg.png</code>가 <b>소문자</b>가 맞는지',
          '두 파일이 <b>같은 위치</b>에 올라갔는지',
          '파일 이름에 <b>띄어쓰기</b>가 없는지',
          '화면이 아예 비어 있다면 → 파일 이름이 <code>index.html</code>이 맞는지 (<code>.txt</code>가 붙지 않았는지)',
        ],
      },
    ],
  },
  {
    id: 6,
    icon: '🏆',
    title: 'DB 연결 — 반 전체 랭킹보드',
    duration: '10분',
    goal: '내 게임의 클리어 기록을 반 전체가 함께 쓰는 데이터베이스에 저장한다.',
    blocks: [
      {
        type: 'note',
        title: '반 전체가 하나의 랭킹을 공유합니다',
        text: '강사가 미리 만든 <b>하나의 테이블 주소</b>를 다 같이 씁니다. 그래서 <b>누가 만든 게임에서 플레이하든 기록이 한 곳에 모입니다.</b>',
      },
      {
        type: 'prompt',
        label: '6-1. 랭킹 기능 추가 — URL과 키는 화면을 보고 입력하세요',
        text: `클리어하면 이름을 입력받아서, 클리어 시간과 함께 Supabase에 저장하고,
전체 랭킹 TOP 10을 빠른 순서대로 보여주는 화면을 만들어줘.

Supabase URL: (강사가 알려준 주소)
anon key: (강사가 알려준 키)
테이블 이름: rankings
컬럼: name(텍스트), time(숫자)`,
      },
      {
        type: 'steps',
        title: '6-2. 새 코드를 다시 올리기',
        items: [
          '새로 만들어진 코드를 <b>복사</b>합니다.',
          '메모장에 붙여넣고 <b>index.html</b>로 저장합니다. (STEP 3과 똑같이, 3가지 확인!)',
          '깃허브의 내 저장소로 갑니다.',
          '<b>index.html</b>을 클릭하고 <b>연필 아이콘(Edit)</b>을 누릅니다.',
          '전체를 지우고 새 코드를 붙여넣습니다.',
          '<b>[Commit changes]</b>를 누릅니다.',
          'Vercel이 <b>자동으로 다시 배포</b>합니다. 1분만 기다리세요.',
        ],
      },
      {
        type: 'teacher',
        title: '강사 멘트',
        items: [
          '"<b>깃허브만 고쳤는데 사이트가 알아서 바뀌었죠?</b> Vercel이 깃허브를 계속 지켜보고 있다가, 바뀌면 자동으로 다시 배포하기 때문입니다."',
          '(클로징에서) "여러분 기록은 각자 폰이 아니라 <b>서버의 DB에 저장</b>됐고, 모두의 폰이 <b>같은 DB를 읽기 때문에</b> 순위가 함께 보이는 겁니다. 이게 데이터베이스입니다."',
        ],
      },
    ],
  },
]

export const ADVANCED = {
  intro: '먼저 끝낸 학생, 또는 다음 시간 과제용입니다. 게임과 성격이 달라 환기가 되고, DB가 반드시 필요한 앱이라 오늘 배운 것과 바로 연결됩니다.',
  main: {
    title: '급식표 피드백 앱',
    prompt: `이번 달 급식 메뉴가 달력 형태로 보이는 앱을 만들어줘.
날짜를 누르면 그날 메뉴가 뜨고, 별점(1~5)과 한 줄 평을 남길 수 있게 해줘.
아래에는 이번 달 평균 별점이 높은 메뉴 TOP 5를 보여줘.`,
    extra: ['친구들이 남긴 평에 좋아요 누르기', '메뉴별 찬반 투표 기능'],
  },
  others: ['게임 스테이지 2 만들기', '학교 시설 안내 지도', '반 밸런스게임 투표'],
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
    '<b>같은 3.8 Flash라도 사고 수준에 따라 코딩 점수가 갈립니다</b> — high 76.3 / medium 74.1 / low 73.5. 게임의 충돌 판정처럼 까다로운 코드에서는 반드시 <b>high</b>로 두세요.',
    '3.8 Flash(high) 83점 &gt; 3.7 Flash(high) 79점. <b>드롭다운에 3.8이 있으면 3.8을 고르세요.</b>',
  ],
  why: [
    { head: '속도', body: '이 실습의 본질은 "고쳐줘"를 수십 번 반복하는 것입니다. Pro는 추론 단계를 더 밟느라 느립니다. 응답이 한 번에 30초씩 밀리면 학생 1인당 5~10분이 대기로 사라집니다.' },
    { head: '컨텍스트는 무의미', body: 'Pro의 최대 강점은 초대형 컨텍스트인데, 우리가 만드는 건 HTML 파일 하나(길어야 500줄)입니다. Pro의 장점이 발휘될 자리가 없습니다.' },
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
    group: '유인물',
    items: [
      'STEP 1 시작 프롬프트 + 다듬기 프롬프트 4종 — 20부',
      '<b>STEP 3~5 클릭 매뉴얼 — 20부 (가장 중요한 유인물)</b>',
      '디자인 3단계 원칙 (유인물 뒷면)',
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
  { case: '메모장 저장 실수 (index.html.txt, 한글 깨짐)', fix: 'STEP 3 저장 3대 주의사항 표를 화면에 크게 띄워두기. 가장 사고 많은 구간' },
  { case: '배포했는데 배경이 안 나옴', fix: '① bg.png 소문자 확인 ② 두 파일이 같은 위치인지 ③ 파일명 공백 없는지' },
  { case: '배포했는데 빈 화면', fix: '파일명이 index.html이 맞는지 (대문자·오타·.txt 확인)' },
  { case: '깃허브 인증 메일 미도착', fix: '해당 학생은 짝의 화면으로 함께 진행 + 가정 학습 유인물' },
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
    '나머지 학생에게 "여러분 게임도 집에서 똑같이 하면 됩니다" + <b>STEP 4·5 매뉴얼 유인물</b>을 배부합니다.',
  ],
  note: '이 유인물이 있으면 Plan B로 가도 학습 손실이 거의 없습니다.',
}

export const DESIGN3 = [
  { level: '1단계', name: '기본', method: '말로 설명하기 — "어둡고 예쁘게"', result: 'AI가 알아서 만든 무난한 디자인' },
  { level: '2단계', name: '고수', method: '닮고 싶은 디자인의 사진을 AI에게 직접 첨부', result: '말로 백 번 설명하는 것보다 사진 한 장이 훨씬 낫다' },
  { level: '3단계', name: '장인', method: '이미지를 직접 만들어 앱 폴더에 파일로 넣기', result: '세상에 하나뿐인 내 디자인 — 오늘 하는 것', now: true },
]

export const SAVE_RULES = [
  { item: '파일 이름', value: 'index.html', fail: '다른 이름이면 배포해도 화면이 안 뜸' },
  { item: '파일 형식', value: '모든 파일 (*.*)', fail: 'index.html.txt로 저장돼서 작동 안 함' },
  { item: '인코딩', value: 'UTF-8', fail: '한글이 전부 깨짐' },
]

export const INTENT = [
  { k: '재미', v: '우리 학교가 게임 배경이 됨 + 내 그림이 게임에 들어감 + 전원 랭킹전' },
  { k: '성취감', v: '진짜 URL + 친구가 내 게임을 플레이 + 랭킹보드에 내 이름' },
  { k: '직접 하기', v: '파일 저장 · 깃허브 업로드 · 배포 버튼을 학생이 클릭. AI는 코드만 쓴다' },
  { k: '핵심 장치', v: '"Canvas에선 배경이 안 보인다 → 배포하면 보인다"로 깃허브·배포를 하고 싶은 일로 전환' },
  { k: '안전장치', v: '사전 가입 요청 + 40·60분 기준점 + Plan B + 백업 코드 + 미니 조교' },
]
