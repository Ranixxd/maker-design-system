import Button from './Button';
import giftPng from './story-gift.png';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
버튼은 주요 액션을 트리거하는 인터랙티브 요소입니다. 텍스트 레이블을 쓰며 아이콘 포함 케이스는 없다. 대신 이미지는 넣을 수 있다(아래 "이미지").

**사용 규칙**
- \`primary\` — **페이지당 하나만**. 가장 중요한 CTA에만 사용한다.
- \`secondary\` — 취소·보조 액션. primary와 나란히 배치할 때 사용한다.
- \`neutral\` — 강조가 불필요한 액션 (예: "더보기", "건너뛰기").
- \`accent\` — neutral과 함께 쓰이며 다음 프로세스 진행을 유도. accent 색상으로 시선을 끈다.

**너비 규칙**
- \`auto\`(내용만큼) 또는 컨테이너를 꽉 채우는 값만 쓴다. 고정 px 값을 주면 화면·컨테이너마다 버튼 크기가 따로 놀아 전체 일관성을 지키기 힘들어진다.

**상태 규칙**
- \`disabled\` — 조건 불만족으로 트리거 불가한 상태. 개체 불투명도(opacity 0.4)로 표현.
- \`loading\` — 버튼을 눌러 부른 기능이 바로 끝나지 않으면, 누른 그 버튼이 로딩 상태가 된다 (예: 삭제 버튼 클릭 → 삭제 호출이 지연됨 → 삭제 버튼이 로딩). submit에만 쓰는 것이 아니다 (2026-09-11에 넓혔다).
  - 로딩 중에는 레이블이 사라지고 스피너만 돈다. 로딩 상태에 집중하게 하려는 것이다. 레이블은 투명하게 자리만 남아서 버튼 너비는 그대로다.
  - 다중 클릭을 막는다.

**이미지 (2026-09-18)**

이모지만으로 표현할 수 없는 특수한 경험을 표현하기 위해 이미지를 활용할 수 있다.
예를 들어 공유하기는 선물 이미지와 함께 배치해, 공유를 선물처럼 기쁘게 하자는 의미를 만들 수 있다.
아무 버튼에나 붙이는 꾸밈이 아니다. 그 버튼만의 경험이 있을 때만 쓴다.

스펙
- \`image\`에 그림 주소를 준다. 기본은 글자 뒤(\`imagePosition="end"\`), 앞에 두려면 \`"start"\`.
- **높이는 크기마다 고정**이다: \`sm\` 20px, \`md\` 24px. **너비는 높이에 맞춰 그림 비율대로** 자동으로 정해진다.
- **PNG를 권장한다.** 배경이 투명해야 버튼 색 위에 자연스럽게 얹힌다. JPG는 배경이 네모로 남는다.
- 선명하게 보이도록 **표시 높이의 3배 이상**으로 만든다(md면 72px 이상). 너무 큰 원본은 버튼마다 받게 되므로 그보다 훨씬 크게 두지 않는다.
- 그림에 뜻을 담지 않는다. 뜻은 글자가 전하고, 그림은 낭독기에서 빠진다(\`alt=""\`).
- 로딩 중에는 글자와 함께 그림도 사라지고 스피너만 돈다.

**모바일 hover 처리**
\`@media (hover: none)\` 환경(터치 디바이스)에서는 hover 오버레이가 표시되지 않는다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'neutral', 'accent'],
      description: '버튼 스타일 계층',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '`sm` = height 36px / label-sm (13px·500) · `md` = height 48px / label-md (15px·500)',
    },
    disabled: {
      control: 'boolean',
      description: '조건 불만족 시 트리거 불가 상태. 색상 변경 없이 opacity 0.4로 표현한다.',
    },
    loading: {
      control: 'boolean',
      description: '눌러서 부른 기능이 지연되는 동안의 상태. 레이블이 사라지고 스피너만 돈다. 다중 호출 방지.',
    },
    children: {
      control: 'text',
    },
  },
};

export const Primary = {
  args: { variant: 'primary', size: 'md', children: '확인' },
  parameters: {
    docs: {
      description: { story: '페이지당 하나만 사용. 가장 중요한 단일 CTA에만 배치한다.' },
    },
  },
};

export const Secondary = {
  args: { variant: 'secondary', size: 'md', children: '취소' },
  parameters: {
    docs: {
      description: { story: 'primary와 함께 배치되는 보조 버튼. bg-secondary fill 스타일.' },
    },
  },
};

export const Neutral = {
  args: { variant: 'neutral', size: 'md', children: '더보기' },
  parameters: {
    docs: {
      description: { story: '강조 없이 액션만 제공. 목록 더보기·건너뛰기 등에 사용.' },
    },
  },
};

export const Accent = {
  args: { variant: 'accent', size: 'md', children: '다음' },
  parameters: {
    docs: {
      description: {
        story: 'neutral과 함께 쓰이며 다음 프로세스 진행을 유도하는 버튼. accent 색상(sky-600)으로 시선을 끈다.',
      },
    },
  },
};

export const Small = {
  args: { variant: 'primary', size: 'sm', children: '완료' },
  parameters: {
    docs: {
      description: { story: '공간이 제한된 인라인 영역에 사용한다.' },
    },
  },
};

export const WithImage = {
  name: '이미지',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="secondary" size="md" image={giftPng}>친구에게 테마 공유하기</Button>
      <Button variant="secondary" size="sm" image={giftPng}>공유하기</Button>
      <Button variant="secondary" size="md" image={giftPng} loading>친구에게 테마 공유하기</Button>
    </div>
  ),
};

export const Disabled = {
  args: { variant: 'primary', size: 'md', children: '확인', disabled: true },
  parameters: {
    docs: {
      description: {
        story: '조건 불만족 상태. 색상 변경 없이 opacity 0.4로만 표현한다. hover·pressed 반응 없음.',
      },
    },
  },
};

export const Loading = {
  args: { variant: 'primary', size: 'md', children: '확인', loading: true },
  parameters: {
    docs: {
      description: {
        story: '누른 버튼이 기능 호출을 기다리는 상태 (예: 삭제 → 삭제 호출 지연 → 삭제 버튼 로딩). 레이블이 사라지고 스피너만 돌아 로딩에 집중하게 한다. 다중 클릭이 차단된다.',
      },
    },
  },
};

export const AllVariants = {
  name: '모든 Variant 비교',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="primary" size="md">Primary</Button>
      <Button variant="secondary" size="md">Secondary</Button>
      <Button variant="neutral" size="md">Neutral</Button>
      <Button variant="accent" size="md">Accent</Button>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md" disabled>Disabled</Button>
      <Button variant="primary" size="md" loading>Loading</Button>
    </div>
  ),
};
