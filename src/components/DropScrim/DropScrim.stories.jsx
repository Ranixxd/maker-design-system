import DropScrim from './DropScrim';
import Button from '../Button/Button';

export default {
  title: 'Components/DropScrim',
  component: DropScrim,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
사진을 받기 전 **편집 화면을 덮는 덮개**(2026-10-23 사용자). 사진 첨부 상자(DropZone \`tone="onDark"\`)를 얹는다.

**왜 덮개인가**
사진만 받는 화면으로 바로 보내면 무엇을 하려고 사진을 넣는지 모른 채 넣는다. 편집 화면을 먼저 열고 그 위에 덮개를 얹으면
덮개 너머로 비치는 도구 줄과 판이 할 일을 알려 준다. 그래서 흐리게(blur) 하지 않고 어둡게만 덮는다.
상자도 바탕 없이 흰 점선만 둔다. 판이 상자 안으로 비쳐 보인다(2026-10-24 사용자).

**판에 맞춰 얹는다**
\`frame\`에 편집 판의 자리를 넘기면 상자 점선이 판 둘레와 겹친다. 사진을 넣기 전 판은 정사각이다(쓰는 쪽이 정한다).
\`area\`에 편집 화면의 머리 아래 몸통을 넘기면 그 안만 덮는다. 머리가 덮이지 않아 사진을 넣기 전에도 [편집 취소]로 나갈 수 있다.
PC 가운데 창이면 창 안만 덮어, 창 밖 어둡기(LayerPopup 덮개)와 겹쳐 줄이 생기지 않는다.

**뒤로 가기는 편집기에 두지 않는다**(2026-10-24 사용자)
편집기에서 다른 곳을 둘러보라는 글자 붙은 뒤로 가기는 어색하다. 나가는 길은 편집 화면 머리의 [편집 취소]다.
\`backLabel\`은 머리가 덮이는 자리에서만 쓴다.

| prop | 쓰는 법 |
|---|---|
| \`label\` | 상자 가운데 글 |
| \`frame\` | 상자를 얹을 자리 \`{ left, top, width, height }\`(화면 기준 px). 없으면 가운데 |
| \`area\` | 덮을 자리 \`{ left, top, width, height, radius }\`(화면 기준 px). 편집 화면 머리 아래 몸통. 없으면 화면 전체 |
| \`actions\` | 사진 말고 다른 길로 시작하는 단추(찌그러진 얼굴의 [또는 이모지 넣기]). \`frame\`이 있으면 판 바로 아래 가운데, 없으면 상자 아래 가운데. 비우면 없다 |
| \`backLabel\` / \`onBack\` | 왼쪽 위 글자 붙은 뒤로 가기. 편집기에서는 쓰지 않는다 |
| \`onPick\` | 고르거나 놓은 파일 한 장. 받으면 쓰는 쪽이 덮개를 닫는다 |

**감싸는 쪽이 지킬 것**
편집 화면(EditFrame)을 먼저 연 뒤에 얹는다. 덮개는 \`--z-system\`에 선다. 사진을 받기 전에는 편집 화면의 [편집 완료]를 막는다(\`doneDisabled\`).
\`actions\` 단추는 \`Button\` \`secondary\` \`sm\`이다(상자보다 눈에 덜 띄게). 단추가 창(LayerPopup)을 띄우면 창이 떠 있는 동안 덮개를 걷는다. 덮개가 창보다 위에 선다.
        `,
      },
    },
  },
};

export const Default = {
  name: '기본',
  args: { label: '여기를 눌러 사진을 고르거나, 끌어다 놓아요', area: { left: 0, top: 56, width: 375, height: 700 }, frame: { left: 16, top: 120, width: 343, height: 343 } },
  render: (args) => (
    <div style={{ height: '100vh', background: 'var(--color-bg-secondary)' }}>
      <DropScrim {...args} />
    </div>
  ),
};

export const WithActions = {
  name: '다른 길 단추',
  args: {
    ...Default.args,
    actions: <Button variant="secondary" size="sm">또는 이모지 넣기</Button>,
  },
  render: Default.render,
};
