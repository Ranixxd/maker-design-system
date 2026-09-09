# maker-design-system

[카톡테마 메이커](https://theme-maker.co.kr)와 배경화면 메이커가 함께 쓰는 디자인 시스템입니다.

토큰(색·타이포·여백·반경·그림자·모션)과 UI 부품 11개, 그리고 그것들을 언제 어떻게
쓰는지 적은 Storybook 문서로 이루어져 있습니다.

## 왜 따로 뺐나

두 서비스가 같은 시스템을 쓰기로 하면서, 처음에는 토큰 CSS를 배경화면 메이커로
복사해 두었습니다. 복사본은 원본이 바뀌어도 따라오지 않습니다. 두 곳이 조용히
어긋나기 시작하는 자리라, 한 곳에서만 관리하도록 떼어냈습니다.

## 무엇이 들어 있나

**토큰** — 원시 팔레트와 역할 기반 시멘틱 토큰을 나눠 둡니다. 쓰는 쪽에서는
`--color-gray-*` 같은 원시 값을 직접 부르지 않고 `--color-bg-*`, `--color-text-*`처럼
역할로 부릅니다. 색을 바꿀 때 팔레트만 갈아끼우면 되기 때문입니다.

타이포그래피도 같은 이유로 `--font-size-*`를 낱개로 쓰지 않고 `.text-heading-lg`,
`.text-body-md` 같은 프리셋 클래스로 묶어 두었습니다.

**부품** — Badge, Button, Divider, Icon, IconButton, LayerPopup, ListItem, Radio,
TextField, Thumbnail, Toast.

## 쓰는 법

```bash
npm i github:Ranixxd/maker-design-system
```

```js
import 'maker-design-system/styles';   // 토큰 + 부품 스타일, 한 번만
import { Button, useToast } from 'maker-design-system';
```

토큰만 필요하면 `styles`만 불러도 됩니다. CSS 변수와 타이포 클래스가 전부 들어 있습니다.

## 문서 보기

```bash
npm i
npm run dev      # Storybook, localhost:6007
```

부품을 쓰기 전에 해당 문서를 먼저 읽습니다. 버튼이 필요하면 Button 문서를 보고,
거기 적힌 토큰과 패턴만 참조합니다.

## 만들 때

```bash
npm run build            # 라이브러리 → dist/
npm run build-storybook  # 문서 → storybook-static/
```

`dist`는 커밋하지 않습니다. `package.json`의 `prepare`가 설치 시점에 빌드를 부르기
때문에, npm에 올리지 않아도 `github:` 주소로 설치하면 알아서 만들어집니다.

원본 JSX를 그대로 내보내지 않고 빌드해서 내보내는 이유는, Vite가 `node_modules`
안의 JSX를 변환해주지 않기 때문입니다. React와 lucide-react는 번들에 넣지 않습니다 —
넣으면 쓰는 쪽 앱에 React가 두 벌 올라가 훅이 깨집니다.
