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

**규칙**
- **켜고 끄는 단추가 아니다.** 누르면 한 번 일어나고 끝난다. 켜짐 상태가 필요하면(크기 가이드처럼) 아래 도구 줄의 \`ToolButton\` \`active\`로 간다
- **자리는 단추가 정하지 않는다.** \`EditFrame\`의 \`fabStart\`·\`fabEnd\`에 하나씩, 최대 두 개다
- 지금 할 수 없으면 \`disabled\`로 흐리게 둔다(배경을 지우는 중처럼)
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
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

export const Disabled = { name: '지금 못 누를 때', args: { icon: 'Eraser', label: '배경 지우기', disabled: true } };
