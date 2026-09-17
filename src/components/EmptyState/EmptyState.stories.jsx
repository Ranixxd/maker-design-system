import EmptyState from './EmptyState';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
목록·내용이 들어갈 자리가 비었을 때 그 자리를 채우는 부품.

**규칙**
- 가로·세로 가운데 정렬이다.
- 설명글 + 버튼 조합이다. 버튼은 없어도 된다.
- 최소 160px 높이를 늘 차지한다. 목록이 비었다가 차도 창 높이가 크게 흔들리지 않게 하려는 것이다.
- 설명글만 둔다. 제목·아이콘은 넣지 않는다.

**같은 부품으로 보여주는 것**
- 비었을 때: "아직 보관한 테마가 없어요."
- 불러오는 중: "불러오는 중…" (버튼 없음)
- 못 불러왔을 때: "목록을 불러오지 못했어요." (필요하면 "다시 시도" 버튼)
- 로그인이 필요할 때: "보관하려면 로그인이 필요해요." + 로그인 버튼

같은 자리에 번갈아 뜨는 글이라 모양이 같아야 덜 튄다.

**버튼**
\`action={{ label, onClick, ... }}\`으로 이름과 동작만 넘긴다. 모양은 부품이 \`secondary\`·\`sm\`으로 정한다.
그 밖의 속성(id, loading, disabled)은 그대로 Button에 넘어간다.
        `,
      },
    },
  },
  argTypes: {
    description: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360, border: '1px dashed var(--color-border-default)' }}><Story /></div>],
};

export const Default = {
  name: '설명글만',
  args: { description: '아직 보관한 테마가 없어요.' },
};

export const WithAction = {
  name: '설명글 + 버튼',
  args: { description: '보관하려면 로그인이 필요해요.', action: { label: '구글로 로그인', onClick: () => {} } },
};

export const Loading = {
  name: '불러오는 중',
  args: { description: '불러오는 중…' },
};

export const LoadError = {
  name: '못 불러왔을 때',
  args: { description: '목록을 불러오지 못했어요.', action: { label: '다시 시도', onClick: () => {} } },
};
