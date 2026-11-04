import StatLine from './StatLine';

export default {
  title: 'Components/StatLine',
  component: StatLine,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
좋아요·이어 만들기 지표 줄(2026-11-04). 글 상세의 메타 묶음(\`PostMeta\`)과 목록 카드(\`MediaCard\`의 \`meta\`)가 같은 줄을 쓴다.
\`PostMeta\`에는 \`likes\`·\`takes\`·\`takesLabel\` 값을 넘기면 PostMeta가 이 줄을 그린다. 카드에는 \`meta\`에 이 부품을 넣는다.

**이모지가 아니라 픽토그램이다**(2026-11-04 사용자). ❤️·📥 같은 색 이모지는 글줄에서 콘텐츠보다 튀어 \`Icon\`으로 바꿨다.
좋아요는 \`Heart\`, 이어 만들기는 \`Download\`다. 이어 만들기 아이콘 이름은 \`StatLine.jsx\`의 \`TAKE_ICON\` 한 곳에서 정한다.
클릭을 부르는 자리(\`BottomCta\`의 좋아요 단추)와 좋아요를 눌렀을 때 터지는 하트는 이 줄이 아니라 이모지 그대로다.

**규칙**
- 글자 크기·색은 감싸는 쪽이 정한다. \`PostMeta\` 안에서는 \`text-body-sm\` secondary, 목록 카드 아래에서는 \`text-label-sm\`이다. 숫자를 굵게 쓰지 않는다
- 아이콘은 글줄 속 14px, 굵기는 24칸 단위 2(약 1.17px. \`Chip\` 지우기 ×, SNS 링크 아이콘과 같다). 색은 글자 색을 따른다(\`currentColor\`). 지표 글줄은 \`text-secondary\`라 \`icon-secondary\`와 같은 값이다
- 아이콘과 숫자 사이 4px, 점(·) 양옆 8px
- \`takesLabel\`은 이어 만든 수 뒤에 붙는 말이다('명이 이어 만들었어요', '명이 이 색으로 만들었어요'). 0이면 숫자만 선다
- 읽어 주는 이름: 좋아요는 "좋아요 N", 이어 만들기는 말이 안 붙을 때 "이어 만든 수 N"
        `,
      },
    },
  },
  decorators: [(Story) => <div className="text-body-sm" style={{ color: 'var(--color-text-secondary)' }}><Story /></div>],
};

export const Default = {
  name: '기본(카드)',
  args: { likes: 12, takes: 34 },
};

export const WithLabel = {
  name: '말이 붙은 것(상세)',
  args: { likes: 12, takes: 3, takesLabel: '명이 이어 만들었어요' },
};

export const Zero = {
  name: '0일 때',
  args: { likes: 0, takes: 0, takesLabel: '명이 이어 만들었어요' },
};

export const InLabel = {
  name: '카드 아래(text-label-sm)',
  parameters: { controls: { disable: true } },
  render: () => <span className="text-label-sm"><StatLine likes={12} takes={34} /></span>,
};
