import CreateCard from './CreateCard';

export default {
  title: 'Components/CreateCard',
  component: CreateCard,
  parameters: {
    docs: {
      description: {
        component: `새로 만들기 카드(2026-10-27, 덕꾸 앱 테꾸·배꾸 홈).

- 높이 140, 폭은 감싸는 쪽을 다 채운다. 테두리 없는 뮤트 면(\`bg-tertiary\`), 둥글기 \`radius-2xl\`
- 가운데 검은 48 네모(\`bg-inverse\`, \`radius-lg\`) 안에 흰 + 24, 아래 이름(\`label-md\`)
- 홈 맨 위에 하나만 둔다. 다른 상자(목록 상자·썸네일 카드)는 테두리가 있어서, 이 카드만 면으로 앞에 선다`,
      },
    },
  },
};

export const Default = {
  args: { label: '새 테마' },
  render: (args) => <div style={{ width: 340 }}><CreateCard {...args} /></div>,
};
