import Divider from './Divider';

export default {
  title: 'UI/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
영역을 나누는 구분선. \`--color-border-default\` 1px 라인만 그린다.

**여백은 부모가 책임진다**
컴포넌트에 margin을 내장하지 않는다. 부모의 \`gap\`이나 \`padding\`으로 간격을 만든다.
구분선이 자체 여백을 갖고 있으면 flex \`gap\`과 이중으로 더해져 레이아웃이 어긋난다.

**쓰는 곳 / 안 쓰는 곳**
- ✅ 성격이 다른 입력 그룹 사이 (예: 테마 정보 ↔ 고유 아이디)
- ❌ 리스트 항목 사이 — ListItem·row가 자체 \`border-bottom\`을 갖는다. 중복해서 넣지 않는다.
        `,
      },
    },
  },
};

export const Default = {
  name: '기본',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Divider />
    </div>
  ),
};

export const InForm = {
  name: '폼 그룹 구분 예시',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)' }}>
      <div>
        <div className="text-label-sm" style={{ color: 'var(--color-text-secondary)' }}>테마 정보</div>
        <p className="text-body-md" style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--spacing-1)' }}>
          테마명 · 제작자 · 아이콘
        </p>
      </div>
      <Divider />
      <div>
        <div className="text-label-sm" style={{ color: 'var(--color-text-secondary)' }}>테마 고유 아이디</div>
        <p className="text-body-md" style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--spacing-1)' }}>
          자동 생성되며 변경할 수 있어요
        </p>
      </div>
    </div>
  ),
};
