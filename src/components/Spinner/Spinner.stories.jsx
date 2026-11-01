import Spinner from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
기다리는 자리에 놓는 도는 표시. 글은 띄우지 않는다.

**크기**
- \`sm\` 16px: 글자 줄 안의 값 자리
- \`md\` 24px: 칸이나 판의 가운데

**어디에 쓰나**
- 값 하나, 칸 하나만 기다릴 때 그 자리에 놓는다. 나머지 화면은 계속 쓸 수 있다
- 판이나 화면 전체를 덮어야 하면 \`LoadingScrim\`을 쓴다
- 단추를 누른 뒤 기다리면 \`Button\`·\`IconButton\`의 \`loading\`을 쓴다

**규칙**
- 기다리는 뜻이 둘레에 없으면 \`label\`을 준다. 읽어 주는 기능만 읽는다
- 값으로 바뀌는 자리는 줄 높이가 흔들리지 않게 쓰는 쪽이 높이를 잡는다
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    label: { control: 'text' },
  },
};

export const Default = {
  name: '기본',
  args: { size: 'md', label: '불러오는 중' },
};

export const Small = {
  name: '작게 (값 자리)',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 280 }}>
      <span className="text-label-md">용량</span>
      <Spinner size="sm" label="재는 중" />
    </div>
  ),
};
