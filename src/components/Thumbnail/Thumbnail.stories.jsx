import { useState } from 'react';
import Thumbnail from './Thumbnail';

const SAMPLE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
     <rect width="120" height="120" fill="#ffe08a"/>
     <circle cx="60" cy="52" r="26" fill="#8b5e00"/>
     <rect x="24" y="86" width="72" height="34" rx="17" fill="#8b5e00"/>
   </svg>`
);

export default {
  title: 'UI/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
이미지 슬롯. 업로드된 이미지 미리보기와 "아직 비어 있음" 상태를 같은 자리에서 표현한다.

**빈 상태 ↔ 채워진 상태**
- 비었을 때 — dashed 테두리, 내용 없음
- 채워졌을 때 — solid 테두리(\`--color-border-strong\`) + \`object-fit: cover\` 이미지

테두리 스타일만으로 구분한다. 빈 슬롯에 \`+\` 아이콘 같은 내용을 채워 넣지 않는다.
슬롯 옆의 레이블·힌트("400 × 400 권장")가 이미 무엇을 넣는 자리인지 말해주고 있어서,
아이콘을 더하면 같은 정보를 두 번 말하게 된다.

**클릭 가능 여부가 유일한 분기**
\`onClick\`을 넘겼는지가 이 컴포넌트의 실질적인 variant다.

| | \`onClick\` 있음 | \`onClick\` 없음 |
|---|---|---|
| 역할 | 이미지 불러오기 트리거 | 읽기 전용 미리보기 |
| 접근성 | \`role="button"\`, \`tabIndex=0\`, Enter/Space 활성화 | 시맨틱 없음 |
| 커서·hover | pointer, 테두리 강조 | 변화 없음 |

읽기 전용인데 \`onClick\`을 넘기면 클릭될 것처럼 보이므로 넘기지 않는다.

**size 선택 기준**
- \`sm\` (44px) — 편집 패널의 목록 행. 한 행에 두 개(나인패치 쌍)가 들어가기도 한다.
- \`md\` (60px) — 내보내기 모달의 테마 아이콘처럼 **단독으로 놓여 주목도가 필요한** 자리.
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    src: { control: 'text' },
    onClick: { control: false },
  },
};

export const Empty = {
  name: '빈 상태',
  args: { size: 'sm' },
};

export const Filled = {
  name: '이미지 있음',
  args: { size: 'sm', src: SAMPLE, alt: '샘플 이미지' },
};

function InteractionDemo() {
  const [src, setSrc] = useState(null);
  const caption = { color: 'var(--color-text-tertiary)' };
  const col = { display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' };
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
      <div style={col}>
        <Thumbnail size="md" src={src} alt="테마 아이콘" onClick={() => setSrc(src ? null : SAMPLE)} />
        <div>
          <div className="text-label-3">onClick 있음</div>
          <div className="text-label-3" style={caption}>눌러보세요 · Tab 포커스 가능</div>
        </div>
      </div>
      <div style={col}>
        <Thumbnail size="md" src={SAMPLE} alt="적용된 배경" />
        <div>
          <div className="text-label-3">onClick 없음</div>
          <div className="text-label-3" style={caption}>읽기 전용 미리보기</div>
        </div>
      </div>
    </div>
  );
}

export const Interaction = {
  name: '클릭 가능 vs 읽기 전용',
  parameters: { controls: { disable: true } },
  render: () => <InteractionDemo />,
};

export const Sizes = {
  name: '사이즈 비교',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-4)' }}>
      {['sm', 'md'].map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Thumbnail size={size} src={SAMPLE} alt="샘플" />
          <span className="text-label-3" style={{ color: 'var(--color-text-tertiary)' }}>
            {size} — {size === 'sm' ? '44px' : '60px'}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const PairRow = {
  name: '쌍 배치 예시 — 편집 패널 행',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', maxWidth: 360 }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        <Thumbnail size="sm" src={SAMPLE} alt="기본" />
        <Thumbnail size="sm" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="text-label-2">친구탭 아이콘</div>
        <div className="text-label-3" style={{ color: 'var(--color-text-tertiary)' }}>152 × 152 권장</div>
      </div>
    </div>
  ),
};
