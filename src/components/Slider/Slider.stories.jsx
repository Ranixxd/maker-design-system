import { useState } from 'react';
import Slider from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
값 하나를 끌어서 고르는 막대. 왼쪽 끝부터 손잡이까지를 채워 보인다.

**왜 만들었나 (2026-09-29)**
주인장의 냉장고에서 음식에 단 팔·다리 한 쌍의 간격을 맞추려고 만들었다. 숫자를 치는 것보다
끌면서 뒤 그림이 바뀌는 것을 보는 편이 빠른 자리다.

**규칙**
- **끄는 대로 onChange.** 손을 뗄 때까지 기다리지 않는다. 값은 숫자로 넘긴다
- **값은 쓰는 쪽이 든다.** \`value\`·\`onChange\`로 주고받는다
- **손잡이에 그림자가 없다.** 흰 원에 primary 테두리로 막대와 가른다
- **이름이 눈에 안 보이면 \`label\`을 꼭 준다.** 낭독기가 막대를 부를 이름이다
- 브라우저의 \`input type="range"\`라 키보드(화살표·Home·End)가 그대로 된다

**감싸는 쪽이 지킬 것**
- 막대는 받은 너비를 다 채운다. 너비는 감싸는 쪽이 정한다
- 손가락이 닿는 높이가 32px이다. 위아래로 다른 것을 붙일 때 그만큼 자리를 준다
- 이름·값을 함께 보이려면 감싸는 쪽이 막대 위 한 줄에 둔다(아래 "이름과 함께")
        `,
      },
    },
  },
  argTypes: {
    value: { control: false },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

const Demo = (args) => {
  const [v, setV] = useState(40);
  return <Slider {...args} value={v} onChange={setV} />;
};

export const Default = {
  name: '기본',
  args: { min: 0, max: 100, step: 1, label: '간격' },
  render: (args) => <div style={{ maxWidth: 320 }}><Demo {...args} /></div>,
};

export const WithLabel = {
  name: '이름과 함께',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState(60);
    return (
      <div style={{ maxWidth: 320 }}>
        <div className="text-label-sm" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
          <span>간격</span><span>{v}</span>
        </div>
        <Slider value={v} onChange={setV} label="간격" />
      </div>
    );
  },
};

export const Disabled = {
  name: '못 쓰는 상태',
  parameters: { controls: { disable: true } },
  render: () => <div style={{ maxWidth: 320 }}><Slider value={30} disabled label="간격" /></div>,
};
