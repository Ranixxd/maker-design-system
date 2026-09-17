import { useState } from 'react';
import SearchField from './SearchField';

export default {
  title: 'Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
찾는 말을 적는 칸. **목록을 좁히는 자리**에 선다(이모지 찾기, 테마 이름 찾기).

**TextField와 가르기**
- 내가 쓴 값을 저장하는 폼 칸(테마명·아이디) → **TextField**. 이름표·필수 표시·힌트가 붙는다
- 목록 위에 얹혀 결과를 좁히는 도구 → **SearchField**. 이름표가 없고 돋보기와 지우기가 붙는다

**한글 조합**: 브라우저 기본 input을 그대로 쓴다. 조합 중에도 글자마다 \`onChange\`가 온다.
한 글자마다 목록을 다시 훑으면 무거우므로 **쓰는 쪽에서 손이 멎은 뒤에 찾는다**(예: 180ms).

\`onClear\`를 주면 값이 있을 때 지우기 단추가 선다. 사파리 기본 [x]는 모양이 제각각이라 걷는다.
        `,
      },
    },
  },
  argTypes: { placeholder: { control: 'text' } },
};

const Demo = (args) => {
  const [v, setV] = useState('');
  return (
    <div style={{ maxWidth: 360 }}>
      <SearchField {...args} value={v} onChange={setV} onClear={() => setV('')} />
    </div>
  );
};

export const Default = { name: '기본', render: Demo, args: { placeholder: '강아지, 하트, 케이크', 'aria-label': '이모지 검색' } };

export const Filled = {
  name: '적은 뒤(지우기)',
  parameters: { controls: { disable: true } },
  render: () => {
    const [v, setV] = useState('하트');
    return (
      <div style={{ maxWidth: 360 }}>
        <SearchField value={v} onChange={setV} onClear={() => setV('')} aria-label="이모지 검색" />
      </div>
    );
  },
};
