import { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
켜고 끄는 입력. 라디오(Radio)와 짝이다.

**선택 기준**
- 여럿 중 **하나**만 고른다 → Radio
- 각각 **켜고 끈다**, 또는 동의 한 칸처럼 혼자 선다 → Checkbox
- 화면을 바로 바꾸는 켜기/끄기(미리보기 다크 모드 같은) → Switch 계열 검토

**사용 규칙**
- \`onChange\`는 이벤트가 아니라 **바뀐 값(true/false)** 을 받는다. (\`onChange={setAgreed}\`)
- 묶음(Group)이 없다. 체크박스는 서로를 모르므로 필요한 만큼 나란히 둔다.
- 칸과 라벨은 **한 줄 가운데**로 맞춘다(기본값). 라벨이 감기는 창에서만 \`align="start"\`로 첫 줄에 맞춘다.
  baseline으로 맞추지 않는다 — 칸은 글자가 아니라 네모라 밑선에 걸면 혼자 내려앉는다.
        `,
      },
    },
  },
};

function AgreeDemo() {
  const [on, setOn] = useState(false);
  return <Checkbox checked={on} onChange={setOn}>올린 테마는 누구나 가져가서 활용할 수 있어요.</Checkbox>;
}

export const 기본 = { render: () => <AgreeDemo /> };

export const 긴라벨 = {
  name: '감기는 라벨',
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div style={{ maxWidth: 240 }}>
        <Checkbox align="start" checked={on} onChange={setOn}>
          올린 테마는 누구나 가져가서 활용할 수 있어요. 가져간 사람이 다시 올리면 내 닉네임이 출처로 보여요.
        </Checkbox>
      </div>
    );
  },
};

export const 못누름 = {
  name: '못 누르는 상태',
  render: () => <Checkbox checked disabled>이미 동의했어요</Checkbox>,
};
