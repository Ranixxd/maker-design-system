import { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
켜고 끄는 스위치(2026-10-20). 웹 프로필 사진 만들기의 사람 끄기에서 처음 썼다.

**선택 기준**
- 누르는 순간 **화면이 바로 바뀌는** 켜기/끄기 → Switch
- 저장·제출 전에 고르는 값, 동의 한 칸 → Checkbox
- 여럿 중 하나 → Radio, 칩이면 ChipGroup

**사용 규칙**
- \`onChange\`는 이벤트가 아니라 **바뀐 값(true/false)** 을 받는다. (\`onChange={setOn}\`)
- 글자 라벨 없이 혼자 설 때는 \`label\`로 읽어 주는 이름을 꼭 준다. 라벨을 보이려면 children으로 준다(스위치 오른쪽에 선다).
- 줄 끝에 세울 때(칩 줄 옆 등) 스위치는 줄어들지 않는다. 옆 줄이 남은 폭만 쓰게 감싸는 쪽이 \`min-width: 0\`을 준다.
- 덕꾸 앱 Switch와 같은 색이다(켜면 bg-primary). 앱은 운영체제 스위치를 쓰고 웹은 직접 그려서 모양은 조금 다르다.
        `,
      },
    },
  },
};

export const 기본 = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Switch checked={on} onChange={setOn} label="사람 보이기" />;
  },
};

export const 라벨 = {
  name: '라벨과 함께',
  render: () => {
    const [on, setOn] = useState(false);
    return <Switch checked={on} onChange={setOn}>사람 보이기</Switch>;
  },
};

export const 못누름 = {
  name: '못 누르는 상태',
  render: () => <Switch checked disabled label="사람 보이기" />,
};
