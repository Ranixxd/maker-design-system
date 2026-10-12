import CornerButton from './CornerButton';
import SelectTile, { ColorDot } from '../SelectTile/SelectTile';
import Chip from '../Chip/Chip';

export default {
  title: 'Components/CornerButton',
  component: CornerButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
모서리 단추. 칸·칩의 **오른쪽 위에 걸쳐 앉는 작은 원 단추**다. 그 칸을 지우거나(×) 고치는(연필) 일만 한다.

**규칙**
- 크기 20, 칸 모서리에서 위·오른쪽으로 8씩 나간다. 흰 바탕(\`bg-default\`), 옅은 테두리(\`border-default\`), 진한 표시(\`icon-default\`)
  - 2026-10-13 전에는 웹 배경 만들기에서 검정 바탕에 흰 표시였고 크기도 16·18로 섞여 있었다. 덕꾸 앱 모양으로 맞추고 한 벌로 묶었다
- 아이콘은 둘. 지우기 \`X\`, 편집 \`Pencil\`
- **올리거나 눌러도 모양이 바뀌지 않는다**(2026-10-13 사용자). 작은 원이라 바탕이 바뀌면 날아가 보였다
- **고른 칸에만 세운다**(레이어 칩, 다양한 크기 칸). 늘 서 있는 지우기(올린 이미지·색 칩)는 예외로 늘 세운다
- 감싸는 칸은 \`position: relative\`. 가로로 넘기는 줄 안이면 줄이 위아래로 8을 비워 단추가 잘리지 않게 한다
- \`label\`(낭독기 이름)은 무엇을 하는지까지 적는다. "지우기"가 아니라 "레이어 2 지우기"
- 칸 안 단추가 아니라 칸 **옆에** 둔다. 단추 안에 단추를 둘 수 없어 칸과 이 단추를 한 상자에 나란히 담는다
        `,
      },
    },
  },
  argTypes: { icon: { control: 'radio', options: ['X', 'Pencil'] } },
};

const wrap = { position: 'relative', display: 'inline-flex' };

export const OnTile = {
  name: '타일 위',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', padding: 'var(--spacing-3)' }}>
      <span style={wrap}>
        <SelectTile label="하늘" selected><ColorDot value="#dcefff" /></SelectTile>
        <CornerButton label="하늘 빼기" />
      </span>
      <span style={wrap}>
        <SelectTile label="다양한 크기" selected><ColorDot value="#ebe3ff" /></SelectTile>
        <CornerButton icon="Pencil" label="다양한 크기 편집" />
      </span>
    </div>
  ),
};

export const OnChip = {
  name: '칩 위',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-1)', padding: 'var(--spacing-3)' }}>
      <Chip>레이어 1</Chip>
      <span style={wrap}>
        <Chip selected>레이어 2</Chip>
        <CornerButton label="레이어 2 지우기" />
      </span>
    </div>
  ),
};
