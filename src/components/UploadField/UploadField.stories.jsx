import { useState } from 'react';
import UploadField from './UploadField';

const SAMPLE = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="26" r="14" fill="%23999"/><rect x="12" y="42" width="40" height="14" rx="7" fill="%23bbb"/></svg>'
);

export default {
  title: 'Components/UploadField',
  component: UploadField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
사진 한 장을 올리는 **폼 칸**. 누르면 파일 고르기가 열리고, 고른 사진이 그 자리에 보인다
(쉽게 시작하기의 기본 이미지·반응한 이미지).

**무엇과 가르나**
- 값을 넣는 칸이다 → TextField와 같은 줄에 선다
- **옵션 카드(ListItem box)와 다르다.** 카드는 "무엇을 할지 고르는 것"이고, 이 칸은 "값을 넣는 것"이다

**투명한 그림**
고른 뒤에는 칸 바탕에 격자가 비친다. 투명한 말풍선·아이콘을 올렸을 때 그것이 투명하다는 것이 보여야 한다.
그림은 contain으로 넣는다. 채우면(cover) 잘려서 무엇을 골랐는지 알 수 없다.

**견본(sample)**
아직 안 골랐을 때 어떤 그림이 들어갈 자리인지 연하게 깔아 둔다. 글로만 설명하면
"평소"와 "반응한" 같은 차이가 잘 와닿지 않는다. 사진을 고르면 견본은 사라진다.

파일 고르기 창은 이 부품이 열지 않는다. \`onClick\`에서 쓰는 쪽이 연다(앱마다 받는 형식이 다르다).
        `,
      },
    },
  },
  argTypes: { label: { control: 'text' }, description: { control: 'text' } },
};

export const Empty = {
  name: '고르기 전',
  args: { label: '기본 이미지', description: '탭이 안 눌렸을 때', sample: SAMPLE },
  decorators: [(Story) => <div style={{ width: 180 }}><Story /></div>],
};

export const Picked = {
  name: '고른 뒤',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 180 }}>
      <UploadField label="기본 이미지" description="탭이 안 눌렸을 때" value={SAMPLE} />
    </div>
  ),
};

export const Pair = {
  name: '두 칸 나란히',
  parameters: { controls: { disable: true } },
  render: () => {
    const [a, setA] = useState(null);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3)', maxWidth: 360 }}>
        <UploadField label="기본 이미지" description="탭이 안 눌렸을 때" sample={SAMPLE} value={a} onClick={() => setA(SAMPLE)} />
        <UploadField label="반응한 이미지" description="탭이 눌렸을 때" sample={SAMPLE} />
      </div>
    );
  },
};
