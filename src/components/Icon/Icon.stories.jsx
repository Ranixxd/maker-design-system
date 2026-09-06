import Icon from './Icon';

export default {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Lucide React 기반 아이콘 래퍼. 사이즈 규칙(sm=16 / md=20)과 strokeWidth=1.5를 강제하여 앱 전체의 아이콘 일관성을 유지한다.

**등록된 이름만 된다.** Lucide 전체(\`import *\`)를 끌어오면 어떤 이름이 실제 쓰이는지
빌드 타임에 알 수 없어 tree-shaking이 안 되고, IconButton 하나만 써도 번들이
+650KB(gzip +163KB) 뛴다. 그래서 아래 CommonIcons 목록만 \`Icon.jsx\`에 정적으로
import해 등록해뒀다 — 목록에 없는 이름을 넘기면 조용히 아무것도 렌더링하지 않는다.
새 아이콘이 필요하면 \`Icon.jsx\`의 import·ICONS와 이 페이지의 CommonIcons 목록에
함께 추가한다.`,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: '등록된 아이콘 이름 (PascalCase). 아래 CommonIcons 참고 — 목록에 없으면 렌더링되지 않는다.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '`sm` = 16px / `md` = 20px',
    },
    color: {
      control: 'color',
      description: 'CSS color 값. 기본값 `currentColor` — 부모의 color를 상속.',
    },
  },
};

export const Small = {
  name: 'sm (16px)',
  args: { name: 'Home', size: 'sm' },
};

export const Medium = {
  name: 'md (20px)',
  args: { name: 'Home', size: 'md' },
};

export const CommonIcons = {
  name: '자주 쓰는 아이콘',
  parameters: {
    docs: {
      description: {
        story: '앱에서 자주 사용하는 아이콘 모음. 이름을 클릭하면 Lucide 사이트로 이동.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const icons = [
      'Home', 'Palette', 'Bell', 'Settings', 'ChevronRight', 'ChevronLeft',
      'ChevronDown', 'X', 'Plus', 'Minus', 'Check', 'Info',
      'Upload', 'Download', 'Pencil', 'Trash2', 'Image', 'Layers',
      'Menu', 'MoreHorizontal', 'User', 'LogOut',
    ];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {icons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '12px 8px',
              borderRadius: 8,
              minWidth: 64,
              background: 'var(--color-bg-secondary)',
            }}
          >
            <Icon name={name} size="md" />
            <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{name}</span>
          </div>
        ))}
      </div>
    );
  },
};
