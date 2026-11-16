import AdSlot from './AdSlot';

export default {
  title: 'Components/AdSlot',
  component: AdSlot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
바깥 광고를 iframe으로 받아 세우는 자리(2026-11-16). 회색 면(\`bg-tertiary\`)으로 높이를 먼저 잡고, 그 위에 \`text-body-xs\` 흐린 글(\`text-tertiary\`)로 표시 문구를 둔다.

**규칙**
- \`height\`는 광고가 오기 전부터 잡는다. 광고가 늦게 오거나 안 와도 둘레가 밀리지 않는다. 광고 쪽 크기와 같은 값을 준다.
- 너비는 감싸는 쪽을 가득 채운다. 위아래 간격은 쓰는 쪽이 정한다. 부품은 바깥 여백(margin)을 갖지 않는다.
- 첫 화면 위쪽처럼 바로 보이는 자리만 \`eager\`를 준다. 나머지는 화면 가까이 와야 받는다(브라우저 지연 로딩). 광고가 편집 화면을 늦추지 않게 하려는 것이다.
- \`label\`은 광고임을 알리는 문구다. 광고마다 붙이고, 광고 바로 위에 둔다(2026-11-16 사용자).
- \`title\`은 화면 읽기 도구가 읽는 이름이다. 기본은 "광고".
- 광고 안은 바깥 것이라 토큰을 강제하지 않는다. 둘레(면, 표시 문구)만 MDS다.
- 모서리는 둥글리지 않는다(2026-11-16 사용자).
        `,
      },
    },
  },
  argTypes: {
    src: { control: 'text' },
    height: { control: 'number' },
    label: { control: 'text' },
    eager: { control: 'boolean' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

const 예시 = 'data:text/html,' + encodeURIComponent(
  '<body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font:14px sans-serif;background:#eef">광고 자리</body>'
);

export const Default = {
  name: '기본',
  args: { src: 예시, height: 100, label: '이 자리에 광고 표시 문구가 들어가요.', eager: true },
};

export const Empty = {
  name: '광고가 오기 전',
  args: { height: 100, label: '이 자리에 광고 표시 문구가 들어가요.' },
};
