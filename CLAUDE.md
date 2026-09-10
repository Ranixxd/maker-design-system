# 프로젝트 지시서 — maker-design-system

여기는 **부품과 토큰을 만드는 곳**이지, 화면을 만드는 곳이 아니다.
쓰는 쪽(카톡테마 메이커·배경화면 메이커)의 사정으로 여기를 고치기 전에
**그 사정이 정말 이 레포의 문제인지** 먼저 가른다.

## 여기를 고치면 두 곳이 같이 움직인다

| 쓰는 곳 | 어떻게 받나 |
|---|---|
| 배경화면 메이커 (`wallpaper-maker`) | npm — `github:Ranixxd/maker-design-system` |
| 카톡테마 메이커 (`phase4`) | 토큰 CSS 사본 — 빌드 단계가 없는 정적 사이트다 |

**그런데 push만으로는 어느 쪽에도 안 간다.**

배경화면 메이커의 `package-lock.json`에 **커밋 해시가 박혀 있다.** GitHub Actions가
`npm ci`로 그 해시를 그대로 받으므로, 여기를 고쳐 push해도 배포는 옛 것을 본다.
2026년 9월 8일에 Drawer를 넣고 순서대로 냈는데도 배포가
`"Drawer" is not exported by node_modules/maker-design-system/dist/mds.js`로 깨졌다.

**로컬에서는 절대 안 드러난다.** `vite.config.js`의 별칭이 `command === 'serve'`일
때만 붙어서, 개발 중에는 옆 폴더 소스를 직접 보고 빌드만 npm 패키지를 본다.

### 그래서 낼 때는

1. 여기서 커밋하고 push한다
2. 쓰는 쪽에서 `npm install maker-design-system@github:Ranixxd/maker-design-system`
3. **`package-lock.json`을 함께 커밋한다.** 이걸 빠뜨리는 것이 위 사고다
4. 쓰는 쪽에서 `npm run build`로 확인한다 — 이때만 실제 패키지를 본다

카톡테마 메이커는 사본이라 절차가 다르다. 그쪽 `tokens/`의 사본을 갱신하고,
파일 머리의 "가져온 커밋"을 새 해시로 고친다.

## 토큰

### 팔레트는 `colors.css` 안에서만 쓴다

`--color-gray-*` `--color-sky-*` `--color-red-*` `--color-black*` `--color-white*`는
**시멘틱 토큰을 정의할 때만** 쓴다. 컴포넌트 CSS나 쓰는 쪽 레이아웃에서 직접
참조하면 안 된다. 타이포도 같다 — `--font-size-*`를 낱개로 쓰지 말고
`.text-heading-*` `.text-body-*` `.text-label-*` 클래스를 쓴다.

### 필요한 시멘틱 토큰이 없으면 **먼저 사람에게 제안한다**

없다는 것은 팔레트를 써도 된다는 뜻이 아니라, **여기에 자리를 만들어야 한다**는 뜻이다.
다만 **혼자 정하지 않는다** — 어떤 이름으로 어느 팔레트를 참조할지 제안하고,
승인을 받은 뒤에 `colors.css`에 넣는다.

대비가 모자란다는 것도 팔레트를 꺼낼 이유가 되지 않고, 옆 역할의 토큰을 빌려올
이유도 되지 않는다(`text-link`는 링크가 걸린 글자에만 쓴다). 대비 수치는 **사람에게
넘기는 판단 재료**이지, 내가 토큰을 갈아치울 근거가 아니다.

2026년 9월 10일에 선에 강조색이 필요한데 `border`에 `default`와 `strong`밖에
없었다. 거기서 "없으니 `sky-600`을 직접 쓰자"고 제안해 지적받았다. 규칙은
`color.mdx` 첫 문단에 금지 예제까지 있었는데, **값을 보고 대비를 계산하기 시작한
순간부터 규칙이 아니라 숫자로 판단하고 있었다.** `--color-border-accent`가
그 뒤에 이 절차로 들어왔다.

### 토큰을 고치면 세 곳을 함께 고친다

값이 **CSS와 문서 양쪽에 적혀 있다.** `TokenComponents.jsx`의 표는 자동으로 읽지
않고 손으로 적은 값이다. 한 곳만 고치면 문서가 거짓말이 된다.

| 고친 파일 | 함께 고칠 곳 |
|---|---|
| `tokens/colors.css` | `TokenComponents.jsx`의 `BgColorTable`·`TextColorTable`·`BorderColorTable`·`IconColorTable` (참조 팔레트와 용도), `semantic-color.mdx`·`color.mdx` |
| `tokens/typography.css` | `TypographyTable` (size·weight·lh를 그대로 적어 둔다), `typography.mdx` |
| `tokens/spacing.css` | `SpacingTable`·`SemanticSpacingTable`, `spacing.mdx` |
| `tokens/radius.css` | `RadiusTable` (값과 "어디에 쓰나"), `radius.mdx` |
| `tokens/shadow.css` | `ShadowTable`, `shadow.mdx` |

**쓰는 쪽 저장소도 본다.** 토큰을 지우거나 이름을 바꾸면 두 메이커가 조용히 깨진다.
카톡테마 메이커에는 `.claude/check-tokens.js`가 있어 없는 토큰을 잡아 주지만,
그것도 사본이 갱신된 뒤에나 안다.

## 문서

**별도 파일을 새로 만들지 않는다.** 보충할 것이 있으면 해당 토큰·컴포넌트의
기존 MDX에 덧붙인다. 관리할 파일을 늘리면 어느 것이 최신인지 알 수 없게 된다.

**판단의 배경을 날짜와 함께 남긴다.** 이 레포의 MDX는 "무엇이 있다"만이 아니라
"왜 그 값인가"를 적어 왔다(`text-default`를 gray-900에서 gray-800으로 눅인 이유,
`bg-overlay-blur`를 따로 만든 이유). 그 자리를 지킨다.

**말투는 한다체다.** 쓰는 쪽 서비스의 사용자 문구는 해요체이지만, 여기 문서는
사용자가 아니라 만드는 사람이 읽는다.

## 부품

- **작업 전 해당 컴포넌트의 MDX를 먼저 읽는다.** 버튼을 고치면 Button 문서를
  읽고 거기 쓰인 토큰과 패턴만 참조한다. 관련 없는 부품까지 훑지 않는다
- 폴더 하나에 `X.jsx` `X.module.css` `X.stories.jsx` `index.js` 넷을 둔다
- **`src/index.js`에 내보내기를 더한다.** 파일을 직접 가리키지 말고 폴더의
  `index.js`를 통한다 — 기본 내보내기가 없는 것(Radio, Toast)에서 어긋난다
- 짝이 있어야 뜻이 사는 부품은 이름으로 내보낸다(`RadioGroup`/`Radio`,
  `ToastProvider`/`useToast`)

### React를 두 벌 만들지 않는다

React와 lucide-react는 번들에 넣지 않는다(`peerDependencies`). 넣으면 쓰는 쪽 앱에
React가 두 벌 올라가 `Invalid hook call`로 화면이 통째로 안 뜬다. 이 레포에도
자기 `node_modules/react`가 있다(스토리북이 쓴다) — 쓰는 쪽에서 별칭으로 이
소스를 끌어올 때 `dedupe`가 그것을 막고 있다.

`dist`는 커밋하지 않는다. `package.json`의 `prepare`가 설치 시점에 빌드를 부른다.

## 내기 전에

```bash
npm run build      # 라이브러리 → dist/. 여기서만 나는 문제가 있다
npm run dev        # Storybook, localhost:6007
```

**빌드를 한 번 돌린다.** 별칭 때문에 개발 서버에서는 소스를 직접 보므로,
빌드에서만 나는 문제는 `npm run dev`로 안 잡힌다.

## 커밋·푸시

- **명시적으로 "푸시해줘"라고 하기 전까지 push하지 않는다.** 여기의 push는
  두 서비스에 번지는 변경이라 더 그렇다
- **브랜치를 만들지 않는다.** main에서 바로 작업한다
- **커밋 메시지는 한국어로.** 무엇을 바꿨는지가 아니라 **왜 그렇게 정했는지**를 쓴다.
  이 레포의 이력이 그렇게 쌓여 있다
- 한 부품을 만드는 과정 전체가 한 커밋이다. 대화가 여러 번 오갔다고 커밋을
  그만큼 뜨지 않는다
