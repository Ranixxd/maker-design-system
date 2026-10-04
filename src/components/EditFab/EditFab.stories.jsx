import { Sun, Zap } from 'lucide-react';
import EditFab from './EditFab';

export default {
  title: 'Components/EditFab',
  component: EditFab,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
편집 판 위에 떠 있는 둥근 단추(에디터 플로팅 버튼). **편집 판 위에서 부가 기능을 줄 때만** 쓴다.

**쓰는 자리**
- 부가 기능: 초기화, 배경 지우기, 기기에 저장처럼 편집을 돕지만 없어도 편집은 끝나는 것
- **메인 기능은 여기 두지 않는다.** 판에 무엇을 넣고 고치는 도구는 \`EditFrame\`의 아래 고정 자리(\`footer\`)에 둔다

**모양**
- 36px 동그라미, 흰 바탕, 얇은 테두리, 옅은 그림자, 흐린 아이콘. **강조색을 쓰지 않는다.** 판보다 먼저 눈에 들면 안 된다
- 글자 없이 아이콘만 선다. \`label\`은 꼭 준다. 낭독기 이름과 PC에서 마우스를 올렸을 때 뜨는 말이 된다
- **\`showLabel\`이면 아이콘 오른쪽에 \`label\`을 글자로 세운다**(11px \`text-label-xs\`, 알약, 높이 36px 그대로). 아이콘 아래에 두면 단추가 커져 미리보기를 더 가려서 가로로 둔다. 미리보기 위에 늘 떠 있어 아이콘만으로 무슨 일인지 알기 어려운 단추에 쓴다(2026-10-04 사용자). 판 위 부가 기능(초기화, 배경 지우기)에는 쓰지 않는다. 글자는 짧게(두세 낱말)

**규칙**
- **켜고 끄는 단추가 아니다.** 누르면 한 번 일어나고 끝난다. 켜짐 상태가 필요하면(크기 가이드처럼) 아래 도구 줄의 \`ToolButton\` \`active\`로 간다
- **자리는 단추가 정하지 않는다.** \`EditFrame\`의 \`fabStart\`·\`fabEnd\`에 하나씩, 최대 두 개다
- 지금 할 수 없으면 \`disabled\`로 흐리게 둔다(배경을 지우는 중처럼)
        

**앱(덕꾸)에서는** 판 위 부가 기능만이 아니라 미리보기 위에 늘 떠 있는 단추(쉽게 시작하기, 다크모드)도 이것이다(2026-09-29 사용자).
아이콘 단추(IconButton)를 띄워 쓰지 않는다. 늘 떠 있고 완전한 원이라는 점이 IconButton과 다르다.
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ padding: 'var(--spacing-6)', background: 'var(--color-bg-secondary)', display: 'inline-flex', gap: 'var(--spacing-4)' }}>
      <Story />
    </div>
  )],
};

export const Default = { name: '기본', args: { icon: 'RotateCcw', label: '초기화' } };

export const Uses = {
  name: '쓰는 곳',
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <EditFab icon="RotateCcw" label="초기화" />
      <EditFab icon="Eraser" label="배경 지우기" />
      <EditFab icon="Download" label="기기에 저장" />
    </>
  ),
};

export const Labeled = {
  name: '글자를 세울 때 (showLabel)',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--spacing-2)' }}>
      <EditFab iconNode={<Zap aria-hidden="true" />} label="쉽게시작" showLabel />
      <EditFab iconNode={<Sun aria-hidden="true" />} label="테마모드" showLabel />
    </div>
  ),
};

export const Disabled = { name: '지금 못 누를 때', args: { icon: 'Eraser', label: '배경 지우기', disabled: true } };
