import ScrollFade from './ScrollFade';

export default {
  title: 'Components/ScrollFade',
  component: ScrollFade,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
넘기는 칸의 아래 흐림 띠. 칸이 잘려 밑에 무엇이 더 있는지 보이지 않을 때, 보이는 아래 끝을 바탕색으로 흐리게 덮어 "밑에 더 있다"를 알린다.

**규칙**
- 넘기는 칸(\`overflow-y: auto\`)의 **맨 끝 자식**으로 하나 둔다. 칸 바깥에 따로 감쌀 것이 없다
- 칸의 보이는 아래 끝에 붙는다(sticky). 칸 높이가 끄는 대로 바뀌는 바텀시트 안에서도 따라간다. 칸에 아래 안쪽 여백이 있어도 보이는 끝에 붙는다
- **아래로 더 남았을 때만 선다.** 끝까지 넘기면 걷히고, 다 들어가는 칸에는 서지 않는다
- 높이 40(\`spacing-10\`). 위는 투명에서 시작해 70% 지점부터 \`bg-default\`가 꽉 찬다. 칸 바탕이 \`bg-default\`인 곳에 쓴다
- 자리를 차지하지 않고(제 높이만큼 위로 당긴다) 누르는 데 끼지 않는다
- 쓰는 곳: 편집 화면 아래 자리 본문(\`EditTrayBody\`, 부품이 이미 넣는다), 테마 편집기 패널, 배경 편집기 시트
        `,
      },
    },
  },
};

const ROWS = Array.from({ length: 14 }, (_, i) => `줄 ${i + 1}`);

export const Default = {
  name: '넘기는 칸',
  render: () => (
    <div style={{ width: 320, height: 200, overflowY: 'auto', border: '1px dashed var(--color-border-default)', background: 'var(--color-bg-default)' }}>
      {ROWS.map((r) => <p key={r} className="text-body-md" style={{ margin: 0, padding: 'var(--spacing-2) var(--spacing-4)' }}>{r}</p>)}
      <ScrollFade />
    </div>
  ),
};
