import Dot from './Dot';

export default {
  title: 'Components/Dot',
  component: Dot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
"새 것이 있다"만 말하는 빨간 점. 숫자도 글자도 없다(헤더 메뉴 단추, 서랍의 업데이트 소식).

**Badge와 가르기**
- 읽으면 사라진다 → **Dot**
- 그 기능의 상태라 계속 붙어 있다(beta, 추천) → **Badge**

낭독기에는 잡히지 않는다(\`aria-hidden\`). 곁에 선 이름이 이미 무엇인지 말하고 있고,
점 하나가 따로 읽히면 무슨 뜻인지 알 수 없다. 읽지 않은 것이 있다는 사실을 소리로도 전해야 하면
곁의 이름에 적는다(예: "업데이트 소식, 새 글 있음").

\`ring\`은 그림·아이콘 위에 얹힐 때 쓴다. 바탕색 테두리를 둘러 어느 그림 위에서도 점이 보인다.
        `,
      },
    },
  },
  argTypes: { size: { control: 'radio', options: ['sm', 'md'] }, ring: { control: 'boolean' } },
};

export const Default = { name: '기본', args: { size: 'md' } };

export const InRow = {
  name: '메뉴 줄 오른쪽',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', maxWidth: 240 }}>
      <span className="text-label-lg" style={{ flex: 1 }}>업데이트 소식</span>
      <Dot />
    </div>
  ),
};

export const OnIcon = {
  name: '아이콘 위',
  parameters: { controls: { disable: true } },
  render: () => (
    <span style={{ position: 'relative', display: 'inline-flex', width: 36, height: 36, background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
      <Dot ring style={{ position: 'absolute', top: 6, right: 6 }} />
    </span>
  ),
};
