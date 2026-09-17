import { useState } from 'react';
import ToolButton from './ToolButton';

export default {
  title: 'Components/ToolButton',
  component: ToolButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
그림 아래 이름이 붙는 세로 단추. **도구 줄에 여럿이 나란히 설 때** 쓴다(이미지 만들기 툴바).

**Button과 가르기**
- 글자로 무엇을 하는지 말하는 한 줄짜리 → **Button**
- 그림이 먼저 눈에 들어오는 도구, 여럿이 줄지어 선다 → **ToolButton**

**켜고 끄는 도구**(크기 가이드처럼)는 \`active\`를 준다. 켜지면 옅은 강조 바탕에 강조색 글자가 되고,
\`aria-pressed\`로 낭독기에도 켜짐이 전해진다. 늘 떠 있는 말풍선(툴팁)은 달지 않는다. 안내가 아니라 장식이 된다.

이름이 길면 \`wide\`로 폭을 준다. 줄을 접지 않는다.
        `,
      },
    },
  },
  argTypes: { label: { control: 'text' }, active: { control: 'boolean' }, wide: { control: 'boolean' } },
};

export const Default = { name: '기본', args: { icon: 'Image', label: '내 사진' } };

export const Toolbar = {
  name: '도구 줄',
  parameters: { controls: { disable: true } },
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <ToolButton icon="Image" label="내 사진" />
        <ToolButton icon="Layers" label="말풍선" />
        <ToolButton icon="Plus" label="이모지" />
        <ToolButton icon="Settings" label="크기 가이드" active={on} onClick={() => setOn((v) => !v)} />
      </div>
    );
  },
};

export const Wide = { name: '이름이 길 때', args: { icon: 'Check', label: '기본과 위치 맞추기', wide: true } };
