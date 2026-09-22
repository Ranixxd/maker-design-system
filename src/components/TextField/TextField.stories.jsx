import { useState } from 'react';
import TextField from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
텍스트 입력 필드. 레이블 · 필수 표시 · 힌트를 한 세트로 묶는다.

**구성 규칙**
- \`label\` — \`text-label-sm\`, secondary 톤. 생략 가능하지만 되도록 붙인다.
- \`required\` — 레이블 옆 빨간 점(4px, \`--color-bg-critical\`). 점은 눈으로만 보이고 낭독기에는 input의 \`aria-required\`로 알린다. "*"였는데 이름표 글자와 섞여 읽혀 점으로 바꿨다 (2026-09-17).
- 커서가 있는 칸은 강조색 테두리(\`--color-border-accent\`)다. 회색은 입력 중인 칸이 덜 드러났다 (2026-09-17).
- \`hint\` — \`text-body-sm\`, tertiary 톤. 설명글이라 body다(\`text-label-xs\`였다가 2026-09-17에 한 단계 키웠다). 보조 설명·제약 조건을 적는다. ReactNode를 받으므로 줄바꿈(\`<br />\`)도 가능하다.

**주의**
- \`id\`를 반드시 넘긴다. label의 \`htmlFor\`와 연결되어 레이블 클릭 시 포커스가 이동한다.
- 값 검증(필수값 미입력 등)은 필드 하단이 아니라 Toast로 안내하는 것이 현재 패턴이다.
- \`invalid\` — 어느 칸이 문제인지 칸 자체에 표시한다. 빨간 테두리(\`--color-border-critical\`) + 옅은 빨간 바탕(\`--color-bg-critical-subtle\`). 안내 문구는 여전히 Toast나 창 위 안내로 한다. 카톡테마 메이커 내보내기 창이 필수칸을 비웠을 때 쓴다 (2026-09-17 더함).

**그 밖의 속성** (2026-09-17 더함)
- \`ref\`는 input에 붙는다(창을 열자마자 포커스).
- 위에 없는 속성(\`maxLength\`, \`disabled\`, \`onKeyDown\`, \`onCompositionStart\`·\`onCompositionEnd\`, \`autoComplete\` 등)은 input에 그대로 넘어간다. 한글 조합이 끝날 때까지 값을 올리지 않는 일은 **쓰는 쪽이** 이 신호로 한다. 부품이 하면 쓰는 모든 곳의 입력 동작이 같이 바뀐다.

**여러 줄** (2026-09-22 더함)
- \`multiline\`을 주면 \`textarea\`가 된다. \`rows\`로 줄 수를 정한다(기본 6).
  테두리·초점 색·잘못 입력 표시는 한 줄 칸과 같고 높이만 늘어난다. 사람이 세로로 잡아 늘릴 수 있다.
- 글자 수 세기는 쓰는 쪽이 \`hint\`에 적는다. 부품이 세면 세는 방식을 쓰는 곳마다 바꿀 수 없다.

**입력 글자 크기와 아이폰 자동 확대** (2026-09-17)
- 입력 글자는 \`text-body-md\`(15px)다. **아이폰 확대를 피하려고 16px로 올리지 않는다.** 16px은 타이포 눈금에 없다.
- 아이폰 사파리는 입력 글자가 16px보다 작으면 **포커스하는 순간 화면을 확대한다.** 이것은 부품이 아니라 **쓰는 쪽 페이지**가 막는다. viewport 메타에 \`maximum-scale=1\`을 넣는다.

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
\`\`\`

- **헷갈리기 쉬운 것.** iOS 10부터 사파리가 무시하는 것은 손가락으로 벌려 확대하는 것을 막는 설정이다(\`user-scalable=no\` 등). 입력칸 자동 확대는 \`maximum-scale=1\`을 따른다. 그래서 아이폰에서는 자동 확대만 막히고 손가락 확대는 그대로 된다.
- **대가.** 안드로이드 크롬에서는 손가락 확대까지 막힌다. 입력 폼이 확대로 튀는 불편이 더 크다고 보고 골랐다.
- **이 메타가 없는 페이지에서 이 부품을 쓰면 아이폰에서 화면이 확대된다.** 부품을 쓰는 페이지를 새로 만들면 먼저 확인한다.

**참조**
- 토스 채용 지원서가 같은 방식이다. 입력칸 15px에 \`maximum-scale=1\`이다(2026-09-17에 열어서 확인).
- 카톡테마 메이커와 배경화면 메이커 모두 2026-09-17에 넣었다.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    type: { control: 'radio', options: ['text', 'password', 'email', 'number'] },
  },
  decorators: [
    (Story) => <div style={{ maxWidth: 320 }}><Story /></div>,
  ],
};

function Controlled(args) {
  const [value, setValue] = useState(args.value ?? '');
  return <TextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export const Default = {
  render: Controlled,
  args: { id: 'sb-default', label: '테마명', placeholder: '나만의 테마' },
};

export const Required = {
  name: '필수 입력',
  render: Controlled,
  args: { id: 'sb-required', label: '제작자', required: true, placeholder: '기니' },
};

export const WithHint = {
  name: '힌트 포함',
  render: Controlled,
  args: {
    id: 'sb-hint',
    label: '테마 고유 아이디',
    required: true,
    value: 'theme-a1b2c3',
    hint: '고유 아이디는 자동으로 생성되며, 변경할 수 있어요.',
  },
};

export const NoLabel = {
  name: '레이블 없음',
  render: Controlled,
  args: { id: 'sb-nolabel', placeholder: '검색어를 입력해요' },
};

function FormDemo() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      <TextField id="ex-name" label="테마명" required placeholder="나만의 테마"
        value={name} onChange={(e) => setName(e.target.value)} />
      <TextField id="ex-author" label="제작자" required placeholder="기니"
        value={author} onChange={(e) => setAuthor(e.target.value)} />
    </div>
  );
}

export const FormExample = {
  name: '폼 조합 예시 — 테마 내보내기',
  parameters: { controls: { disable: true } },
  render: () => <FormDemo />,
};

export const Invalid = {
  name: '잘못 입력',
  render: Controlled,
  args: { id: 'sb-invalid', label: '테마명', required: true, invalid: true, placeholder: '테마 이름을 입력해요' },
};

export const Disabled = {
  name: '잠김',
  render: Controlled,
  args: { id: 'sb-disabled', label: '보관할 테마 이름', value: '저장하는 중', disabled: true },
};

export const Multiline = {
  name: '여러 줄',
  args: { id: 'tf-multi', label: '의견 작성', required: true, multiline: true, rows: 8,
    placeholder: '의견을 자유롭게 작성해주세요', hint: '0 / 1000' },
};
