import Icon from './Icon';

export default {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Lucide React 기반 아이콘 래퍼. 사이즈 규칙(sm=16 / md=20)과 strokeWidth=1.5를 강제하여 앱 전체의 아이콘 일관성을 유지한다.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Lucide 아이콘 이름 (PascalCase). [전체 목록](https://lucide.dev/icons/)',
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
