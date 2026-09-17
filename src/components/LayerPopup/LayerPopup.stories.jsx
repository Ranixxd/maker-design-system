import { useState } from 'react';
import LayerPopup from './LayerPopup';
import Button from '../Button/Button';

export default {
  title: 'Components/LayerPopup',
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
- Mobile (<768px) + \`mobileType="page"\` → **풀 페이지** (PC 모달과 같은 scaleIn)

---

### 모바일에서 시트와 페이지 고르기 (2026-09-17)

**바텀 시트는 "지금 하던 일을 잠깐 멈췄다가 언제든 원래 맥락으로 돌아갈 수 있어야 할 때"만 쓴다.**
시트는 뒤 화면이 비쳐 보이고, 바깥을 누르거나 끌어내리면 바로 닫힌다. 가볍게 들렀다 가는 자리라는 신호다.
그 신호가 맞지 않는 창을 시트로 띄우면, 몰입해야 할 일이 가볍게 보이고 손이 스치기만 해도 닫힌다.

두 가지를 차례로 묻는다.

1. **돌아갈 맥락이 있나.** 창을 연 뒤에도 사용자가 곧 원래 하던 일로 돌아가나?
   - 돌아간다(잠깐 보고, 잠깐 고르고, 닫는다) → 2번으로
   - 이 일에 **몰입**해야 한다(깊은 편집, 마무리 단계) → **페이지**. 짧아도 페이지다
2. **일이 가벼운가.** 입력 칸·단계·읽을 양이 적어 한 화면에서 금방 끝나나?
   - 가볍다 → **시트**
   - 입력 칸이 여럿이거나 단계가 있거나 길게 스크롤한다 → **페이지**. 시트는 실수로 닫히기 쉬워 적어 둔 것을 잃는다

**둘 다 "가볍게 들렀다 간다"일 때만 시트다.** 하나라도 걸리면 페이지다. 맥락(1번)을 먼저 본다.

**한 흐름 안에서 이어 여는 창은 같은 형태를 쓴다.** 앞 창에서 이어지는 일(말풍선 편집 → 이미지 만들기)이면
뒤 창을 따로 재지 않고 앞 창의 형태를 따른다. 같은 일을 하는 중인데 페이지가 시트로 바뀌면
다른 일로 빠져나온 것처럼 읽힌다.

단, **값 하나를 골라 넣고 바로 돌아오는 창(고르기)은 흐름 안에 있어도 시트다.** 다음 단계로 넘어가는 창이 아니라
흐름 안에서 잠깐 들렀다 제자리로 돌아오는 일이기 때문이다(이미지 만들기 안의 말풍선 고르기, 편집 중 이모지 고르기).

| 창 | 맥락 | 무게 | 형태 |
|---|---|---|---|
| 내 테마 목록 | 잠깐 보고 닫거나 하나 불러온다 | 목록 하나 | 시트 |
| 테마 보관 | 편집 중 잠깐 저장하고 돌아간다 | 칸 하나 | 시트 |
| 도움말·QnA | 읽고 닫는다 | 입력 없음 | 시트 |
| 말풍선 편집 | 딥한 편집이라 그 안에 몰입한다 | 단계 여럿 | 페이지 |
| 이미지 만들기 (말풍선 편집에서 연다) | 말풍선 편집과 한 흐름 | | 페이지 (앞 창을 따른다) |
| 말풍선 고르기 (이미지 만들기 안) | 하나 골라 넣고 돌아온다 | 목록 하나 | 시트 (고르기) |
| 이모지 고르기 | 하나 골라 넣고 돌아온다 | 목록 하나 | 시트 (고르기) |
| 내보내기 | 편집을 끝낸 마무리 단계라 몰입한다 | 입력 칸 여럿 | 페이지 |

PC(≥768px)는 이 구분 없이 가운데 모달이다.

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

**footer**
본문 아래에 늘 보이는 단추 자리. 본문만 스크롤되고 footer는 창 바닥에 남는다. 입력이 길어도 확인 단추를 찾아 내려가지 않게 할 때 쓴다(내보내기).

**공통 규칙**
- 제목은 PC·모바일 모두 가운데 정렬이다. 헤더는 [왼쪽 칸 | 제목 | 오른쪽 칸] 세 칸이고 양옆 칸 너비가 같아, 한쪽에만 아이콘이 있어도 제목은 창 한가운데에 선다. 닫기는 오른쪽 칸이다
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
  <p className="text-body-md" style={{ color: 'var(--color-text-secondary)' }}>
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
