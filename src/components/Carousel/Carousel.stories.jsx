import Carousel from './Carousel';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**옆으로 넘기는 줄**(2026-10-24 사용자). 폰은 손가락으로 밀고, 넓은 화면(마우스)에서는 넘칠 때 양 끝에 화살표 단추(EditFab)가 선다.
마우스로는 옆으로 굴릴 길이 없어, 끝 칸이 걸쳐 보여도 넘기지 못했다.

- 넘친 쪽에만 단추가 선다. 맨 앞이면 왼쪽, 맨 끝이면 오른쪽 단추가 없다
- **넘친 쪽 끝은 흐리게 지운다**(스크롤 페이드, shadcn scroll fade 방식). 굴리는 상자에 마스크를 걸어 끝 32px를 투명하게 한다.
  바탕색을 덧칠하지 않아 어느 바탕 위에서도 같다. 폰에서도 걸린다(단추만 마우스 기기 전용)
- 누르면 보이는 너비의 80%만큼 넘긴다. 한 칸 남짓 겹쳐 보여 어디까지 봤는지 이어진다
- 손가락 기기(\`hover: none\` 또는 \`pointer: coarse\`)에서는 단추를 세우지 않는다

| prop | 쓰는 법 |
|---|---|
| \`className\` | 굴리는 상자의 모양(칸 간격·스냅·여백·스크롤 막대 숨김). 쓰는 쪽이 정한다 |
| \`rootClassName\` | 단추가 기대는 바깥 상자. 줄이 flex 안에서 늘어나야 하면 여기에 준다 |
| \`prevLabel\` / \`nextLabel\` | 단추 이름(낭독기, PC 말풍선) |

**감싸는 쪽이 지킬 것**
- 굴리는 상자(\`className\`)에 \`overflow-x: auto\`를 둔다. 이 부품은 굴리는 길을 바꾸지 않는다
- 단추가 줄 양 끝에서 8px 바깥으로 걸쳐 선다. 줄 바깥 8px이 잘리지 않게 둔다
- 기존 화면은 하나씩 이것으로 바꾼다
        `,
      },
    },
  },
};

const 칸 = Array.from({ length: 14 }, (_, i) => (
  <div key={i} style={{ flex: '0 0 72px', height: 72, borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-tertiary)' }} />
));

export const Default = {
  name: '기본',
  render: () => (
    <div style={{ inlineSize: 352, padding: 16 }}>
      <Carousel style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>{칸}</Carousel>
    </div>
  ),
};
