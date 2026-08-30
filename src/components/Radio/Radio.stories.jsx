import { useState } from 'react';
import { RadioGroup, Radio } from './Radio';

export default {
  title: 'UI/Radio',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
단일 선택 입력. \`RadioGroup\`이 Context로 \`name\` · \`value\` · \`onChange\`를 내려주고, 자식 \`Radio\`는 \`value\`만 선언한다.

**사용 규칙**
- 반드시 \`RadioGroup\`으로 감싼다. Context 없이 \`Radio\`만 쓰면 동작하지 않는다.
- \`name\`은 그룹마다 고유해야 한다. 한 화면에 두 그룹이 있으면 서로 다른 \`name\`을 준다.
- \`onChange\`는 이벤트가 아니라 **선택된 value 자체**를 받는다. (\`onChange={setPlatform}\`)

**선택 기준**
- 2~4개의 배타적 옵션 → Radio
- 5개 이상이거나 옵션이 길어지면 → Select 계열 검토
- 껐다 켜는 단일 값 → Switch (Radio 2개로 대체하지 않는다)
        `,
      },
    },
  },
};

function PlatformDemo() {
  const [value, setValue] = useState('ios');
  return (
    <RadioGroup name="sb-platform" value={value} onChange={setValue}>
      <Radio value="ios">아이폰 (.ktheme)</Radio>
      <Radio value="android">안드로이드 (.apk)</Radio>
    </RadioGroup>
  );
}

function SectionDemo() {
  const [value, setValue] = useState('friends');
  return (
    <RadioGroup name="sb-section" value={value} onChange={setValue}>
      <Radio value="friends">친구탭</Radio>
      <Radio value="chatroom">채팅방</Radio>
      <Radio value="passcode">잠금화면</Radio>
    </RadioGroup>
  );
}

function EchoDemo() {
  const [value, setValue] = useState('android');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <RadioGroup name="sb-echo" value={value} onChange={setValue}>
        <Radio value="ios">아이폰 (.ktheme)</Radio>
        <Radio value="android">안드로이드 (.apk)</Radio>
      </RadioGroup>
      <span className="text-label-3" style={{ color: 'var(--color-text-tertiary)' }}>
        선택됨: {value}
      </span>
    </div>
  );
}

export const Default = {
  name: '기본',
  parameters: { controls: { disable: true } },
  render: () => <PlatformDemo />,
};

export const ThreeOptions = {
  name: '옵션 3개',
  parameters: { controls: { disable: true } },
  render: () => <SectionDemo />,
};

export const WithSelectedState = {
  name: '선택값 표시',
  parameters: { controls: { disable: true } },
  render: () => <EchoDemo />,
};
