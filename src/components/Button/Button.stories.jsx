import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
버튼은 주요 액션을 트리거하는 인터랙티브 요소입니다. 텍스트 레이블만 사용하며 아이콘 포함 케이스는 없다.

**사용 규칙**
- \`primary\` — **페이지당 하나만**. 가장 중요한 CTA에만 사용한다.
- \`secondary\` — 취소·보조 액션. primary와 나란히 배치할 때 사용한다.
- \`neutral\` — 강조가 불필요한 액션 (예: "더보기", "건너뛰기").
- \`accent\` — neutral과 함께 쓰이며 다음 프로세스 진행을 유도. accent 색상으로 시선을 끈다.

**너비 규칙**
- \`auto\`(내용만큼) 또는 컨테이너를 꽉 채우는 값만 쓴다. 고정 px 값을 주면 화면·컨테이너마다 버튼 크기가 따로 놀아 전체 일관성을 지키기 힘들어진다.

**상태 규칙**
- \`disabled\` — 조건 불만족으로 트리거 불가한 상태. 개체 불투명도(opacity 0.4)로 표현.
- \`loading\` — submit 후 응답 지연 시 표시. 레이블이 사라지고 스피너만 보인다. 다중 클릭을 막는다.

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
      description: '`sm` = height 36px / label-2 (13px·500) · `md` = height 48px / label-1 (15px·500)',
    },
    disabled: {
      control: 'boolean',
      description: '조건 불만족 시 트리거 불가 상태. 색상 변경 없이 opacity 0.4로 표현한다.',
    },
    loading: {
      control: 'boolean',
      description: 'submit 후 응답 지연 상태. 레이블 숨기고 스피너 표시. 다중 호출 방지.',
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
        story: 'submit 후 응답 대기 상태. 레이블이 사라지고 스피너만 보인다. 다중 클릭이 차단된다.',
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
