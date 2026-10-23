import { useState } from 'react';
import DropZone from './DropZone';

export default {
  title: 'Components/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
사진을 받는 **큰 상자**(2026-10-23 사용자). 누르면 파일 고르기가 열리고, 끌어다 놓아도 받는다.
모양은 핀터레스트 올리기 상자를 따랐다. 둥근 큰 회색 상자, 가운데 위 화살표 원과 글이다. 테두리는 없다(점선을 뺐다).

**어디에 쓰나**
사진을 받는 것 자체가 그 화면의 할 일일 때 쓴다. 짤 만들기의 글자 넣기·부적·찌그러진 얼굴·음식 짤이 사진을 받는 첫 화면이다.
주소로 바로 들어온 사람에게는 브라우저가 파일 고르기 창을 자동으로 못 띄운다. 이 상자가 그 첫 누름을 받는다.

**무엇과 가르나**
- **UploadField와 다르다.** UploadField는 폼 안에서 값 하나를 넣는 작은 칸이다(쉽게 시작하기의 이미지 칸). 이것은 화면의 주인공 자리를 차지한다
- 한 화면에 하나만 둔다

| prop | 쓰는 법 |
|---|---|
| \`label\` | 가운데 글 |
| \`description\` | 바닥에 붙는 작은 안내(받는 크기·형식). 없어도 된다 |
| \`accept\` | 받는 형식. 처음 값 \`image/*\`. 안 맞는 파일을 놓으면 받지 않고 \`onReject\`를 부른다 |
| \`ratio\` | 상자 비율. 처음 값 \`5 / 6\`. 쓰는 쪽 화면에 맞춘다. \`null\`이면 비율 없이 쓰는 쪽이 크기를 준다 |
| \`tone\` | \`default\` 밝은 바탕 위 회색 면. \`onDark\` 어두운 덮개(DropScrim) 위 흰 점선, 바탕 없음, 글·아이콘 흰색(2026-10-24 사용자) |
| \`onPick\` | 고르거나 놓은 파일 한 장을 받는다 |

**감싸는 쪽이 지킬 것**
상자는 너비를 다 쓴다(\`width: 100%\`). 너비는 감싸는 쪽이 정한다. 폰에서는 화면 좌우 여백 안을 다 쓰고, 넓은 화면에서는 가운데에 480px 남짓으로 둔다.
파일 고르기 창은 이 부품이 연다. 쓰는 쪽은 파일 입력칸을 따로 두지 않는다.
        `,
      },
    },
  },
  argTypes: { label: { control: 'text' }, description: { control: 'text' }, ratio: { control: 'text' } },
};

export const Default = {
  name: '기본',
  args: { label: '사진을 고르거나 여기로 끌어다 놓아요' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const WithDescription = {
  name: '아래 안내가 있는 것',
  args: { label: '사진을 고르거나 여기로 끌어다 놓아요', description: '20MB 미만의 사진을 올려요.' },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export const Picked = {
  name: '고르면',
  parameters: { controls: { disable: true } },
  render: () => {
    const [name, setName] = useState('');
    return (
      <div style={{ width: 360, display: 'grid', gap: 'var(--spacing-3)' }}>
        <DropZone label="사진을 고르거나 여기로 끌어다 놓아요" onPick={(f) => setName(f.name)} />
        <p className="text-body-sm">{name ? '받은 파일: ' + name : '아직 없음'}</p>
      </div>
    );
  },
};
