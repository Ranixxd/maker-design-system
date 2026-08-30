import { useState } from 'react';
import LayerPopup from './LayerPopup';
import Button from '../Button/Button';

export default {
  title: 'UI/LayerPopup',
  component: LayerPopup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
레이어 팝업. 뷰포트 너비에 따라 자동으로 분기된다.

**분기 기준**
- PC (≥768px) → 중앙 **모달** (scaleIn 애니메이션)
- Mobile (<768px) + \`mobileType="sheet"\` → **바텀 시트** (핸들 드래그 가능)
- Mobile (<768px) + \`mobileType="page"\` → **풀 페이지** (slideUp)

---

### 바텀 시트 동작 규칙

#### 높이 (initialSnap)
| 값 | 설명 |
|---|---|
| \`'auto'\` | 콘텐츠 높이에 맞춤. 최대 90% 초과 불가 (기본값) |
| \`10\` | 화면의 10% 높이로 열림 |
| \`50\` | 화면의 50% 높이로 열림 |
| \`90\` | 화면의 90% 높이로 열림 |

#### 스냅 (snapPoints)
| 값 | 설명 |
|---|---|
| \`[]\` | 스냅 없음. 드래그 후 놓은 위치에 고정 |
| \`[10, 50, 90]\` | 드래그 후 가장 가까운 스냅 포인트로 이동 |

#### 닫힘 여부 (closeable)
| 값 | 설명 |
|---|---|
| \`true\` | 드래그로 닫힘. ESC 키, 오버레이 클릭으로도 닫힘 (기본값) |
| \`false\` | 드래그로 닫히지 않음. 최소 10%가 바닥. X 버튼으로만 닫힘 |

**공통 규칙**
- 핸들(그립 바 + 헤더 영역 전체)을 드래그해 높낮이 조절
- 모달 위에 모달 금지. 중첩 레이어 필요 시 풀 페이지 전환 검토
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    mobileType: {
      control: 'radio',
      options: ['sheet', 'page'],
    },
    initialSnap: {
      control: 'select',
      options: ['auto', 10, 50, 90],
      description: '시트 오픈 시 초기 높이 (% 또는 auto)',
    },
    snapPoints: {
      control: 'object',
      description: '[] = 스냅 없음 | [10,50,90] 등 배열 = 드래그 후 해당 포인트로 스냅',
    },
    closeable: {
      control: 'boolean',
      description: 'false이면 드래그로 닫히지 않으며 최소 10% 유지',
    },
    isOpen: { control: false },
    onClose: { control: false },
    children: { control: false },
  },
};

const Content = () => (
  <p className="text-body-2" style={{ color: 'var(--color-text-secondary)' }}>
    팝업 콘텐츠가 여기에 들어가요. PC에서는 모달, 모바일에서는 바텀 시트로 렌더됩니다.
  </p>
);

const Demo = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>팝업 열기</Button>
      <LayerPopup {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Content />
      </LayerPopup>
    </>
  );
};

// ── 기본 ──────────────────────────────────────────────
export const Default = {
  name: '기본 (auto height)',
  render: Demo,
  args: {
    title: '팝업 제목',
    mobileType: 'sheet',
    initialSnap: 'auto',
    snapPoints: [],
    closeable: true,
  },
};

// ── initialSnap ────────────────────────────────────────
export const Snap50 = {
  name: 'initialSnap=50, snapPoints=[10,50,90]',
  render: Demo,
  args: {
    title: '50% 오픈',
    mobileType: 'sheet',
    initialSnap: 50,
    snapPoints: [10, 50, 90],
    closeable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '50%로 열리고, 드래그 후 10/50/90% 중 가장 가까운 스냅 포인트로 이동한다.',
      },
    },
  },
};

export const Snap10 = {
  name: 'initialSnap=10 (Peek)',
  render: Demo,
  args: {
    title: '미리보기',
    mobileType: 'sheet',
    initialSnap: 10,
    snapPoints: [10, 90],
    closeable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '10%로 열려 일부만 노출(peek). 위로 드래그하면 90%로 확장.',
      },
    },
  },
};

// ── closeable=false ────────────────────────────────────
export const Persistent = {
  name: 'closeable=false (퍼시스턴트)',
  render: Demo,
  args: {
    title: '항상 떠있는 시트',
    mobileType: 'sheet',
    initialSnap: 50,
    snapPoints: [10, 50, 90],
    closeable: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
드래그로 닫히지 않는다. 최소 10%까지만 내려가고 그 아래로는 내려가지 않는다.
X 버튼으로만 닫힌다. 오버레이 클릭도 무효.
        `,
      },
    },
  },
};

// ── Full page ──────────────────────────────────────────
export const FullPage = {
  name: '풀 페이지 (mobileType=page)',
  render: Demo,
  args: {
    title: '풀 페이지',
    mobileType: 'page',
    closeable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`mobileType="page"` — 모바일에서 화면 전체를 덮는 레이어. PC에서는 동일하게 모달.',
      },
    },
  },
};

// ── No title ──────────────────────────────────────────
export const NoTitle = {
  name: '제목 없음',
  render: Demo,
  args: {
    mobileType: 'sheet',
    initialSnap: 'auto',
    closeable: true,
  },
  parameters: {
    docs: {
      description: { story: 'title 없이도 closeable=true이면 헤더 영역과 X 버튼이 표시된다.' },
    },
  },
};
