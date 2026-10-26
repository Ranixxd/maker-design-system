import Icon from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Lucide React 기반 아이콘 래퍼. 사이즈 규칙(sm=20 / md=24)과 크기별 실제 굵기를 강제하여 앱 전체의 아이콘 일관성을 유지한다.

**크기별 실제 굵기: 24px(\`md\`) 2px, 20px(\`sm\`) 1.5px** (2026-10-26 사용자). 화면에 보이는 px 기준이다.
루시드 \`strokeWidth\`는 24칸 그림판 단위라 크기와 함께 줄어든다. 전에는 모두 2를 줘서 20px가 약 1.67px로 보였다.
그래서 Icon이 실제 px를 24칸 단위로 바꿔 넘긴다(\`md\` 2, \`sm\` 1.8). 앱(덕꾸)도 같은 규칙을 따른다.

| size | 그리는 크기 | svg stroke-width (24칸) | 실제 굵기 |
|---|---|---|---|
| \`md\` | 24px | 2 | 2px |
| \`sm\` | 20px | 1.8 | 1.5px |

- **\`strokeWidth\`를 넘기면 24칸 단위로 그대로 덮어쓴다.** 실제 굵기는 \`strokeWidth × 그린 크기 / 24\`다.
  20·24px로 그릴 때는 넘기지 않는다
- **CSS로 크기를 바꾼 아이콘은 그 크기에서 다시 셈해 넘긴다.** sm 기본(1.8)을 그대로 줄이면 더 가늘어진다.
  지금 그런 곳: SearchField 지우기 X(12px, 3 → 1.5px), EditFab(18px, 2 → 1.5px), Chip 지우기(14px, 2 → 약 1.17px),
  CornerButton(12px, 2 → 1px). 18·14·12px의 굵기는 따로 정한 규칙이 아니라 2026-10-26 전 굵기를 지킨 것이다
- **svg를 직접 그리는 부품도 같은 규칙을 따른다.** ObjectBox 좌우 반전(20px)은 1.8을 준다

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
      description: '`sm` = 20px / `md` = 24px',
    },
    color: {
      control: 'color',
      description: 'CSS color 값. 기본값 `currentColor` — 부모의 color를 상속.',
    },
  },
};

export const Small = {
  name: 'sm (20px)',
  args: { name: 'Home', size: 'sm' },
};

export const Medium = {
  name: 'md (24px)',
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
      'Folder', 'FolderPlus', 'Astroid', 'RotateCcw',
      'CircleHelp', 'Search', 'ImagePlus', 'Eraser',
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpDown', 'Siren',
      'Wallpaper', 'Brush', 'Smile', 'LayersArrowUp', 'LayersArrowDown', 'Copy',
      'Moon', 'Sun', 'WandSparkles', 'Shuffle', 'SquareArrowOutUpRight',
      'MessageCirclePlus', 'Scan', 'ScanSquare', 'RulerDimensionLine', 'MoveVertical', 'MoveHorizontal',
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
