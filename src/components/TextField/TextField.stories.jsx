import { useState } from 'react';
import TextField from './TextField';

export default {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
텍스트 입력 필드. 레이블 · 필수 표시 · 힌트를 한 세트로 묶는다.

**구성 규칙**
- \`label\` — \`text-label-sm\`, secondary 톤. 생략 가능하지만 되도록 붙인다.
- \`required\` — 레이블 옆 \`*\` 표시. 색상은 \`--color-text-critical\`.
- \`hint\` — \`text-label-xs\`, tertiary 톤. 보조 설명·제약 조건을 적는다. ReactNode를 받으므로 줄바꿈(\`<br />\`)도 가능하다.

**주의**
- \`id\`를 반드시 넘긴다. label의 \`htmlFor\`와 연결되어 레이블 클릭 시 포커스가 이동한다.
- 값 검증(필수값 미입력 등)은 필드 하단이 아니라 Toast로 안내하는 것이 현재 패턴이다.

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
- 카톡테마 메이커는 2026-09-17에 모든 페이지에 넣었다. 배경화면 메이커는 아직 없다.
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    required: { control: 'boolean' },
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
