import { useState } from 'react';
import EditFrame from './EditFrame';
import EditFab from '../EditFab/EditFab';
import Button from '../Button/Button';
import ToolButton from '../ToolButton/ToolButton';
import Chip from '../Chip/Chip';

export default {
  title: 'Components/EditFrame',
  component: EditFrame,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
편집 화면의 틀. 그림을 판 위에 놓고 고치는 화면은 모두 이 틀을 쓴다(말풍선 편집, 칸 그림 크기 정하기, 짤 만들기, 부적 만들기).

**틀이 정하는 것**
- **머리:** 왼쪽은 취소·뒤로가기처럼 물러나는 일(\`neutral\`), 오른쪽은 끝내는 일(\`accent\`)이다. 자리를 맞바꾸거나 한쪽에 다른 일을 두지 않는다
  - 오른쪽 이름은 [편집 완료]다. [완성]·[완료]만 쓰지 않는다. 왼쪽은 [편집 취소]
  - 이름은 바꾸지 않는 것이 기본이다. 편집 안에서 한 단계 더 들어갈 때만(자르기 → [뒤로가기]·[자르기 완료]) \`cancelLabel\`·\`doneLabel\`로 바꾼다
  - 편집 화면이 여러 장 이어지는 흐름에서 다음 편집 화면으로 넘기는 단추는 [다음]이다(냉장고 얼굴 맞추기 → 판, 2026-10-03). 마지막 화면은 [편집 완료]
  - 단추에 id 같은 속성을 더 달려면 \`cancelProps\`·\`doneProps\`
- **판:** 회색 바탕 가운데. 판 바로 위에 안내 한 줄(\`hint\`)을 둘 수 있다
- **판 위 둥근 단추:** \`fabStart\`·\`fabEnd\`에 \`EditFab\`을 하나씩. 부가 기능만 둔다
- **아래 고정 자리:** \`footer\`. 위에 선 하나를 긋고 자리만 내준다. 메인 기능(도구 줄·탭·입력 칸)이 여기 온다. 없으면 비워 둔다

**쓰는 쪽이 정하는 것**
- 판의 크기와 비율, 판 안에서 일어나는 일
- 아래 자리에 무엇을 몇 줄 놓을지

**크기**
- 폰은 화면을 꽉 채우는 페이지, PC는 가운데 창(480×760)이다. 창 모양을 고르지 않는다. 편집은 몰입하는 일이라 늘 페이지다(\`LayerPopup\`의 시트·페이지 고르기)
- 한 흐름에서 이어 여는 편집 화면은 같은 크기라 같은 창이 옮겨 간 것처럼 보인다

**판 위로 떠오르는 띠**
- 아래 자리는 \`position: relative\`다. 색 고르기처럼 판 위로 잠깐 떠오르는 띠는 아래 자리 안에 두고 \`bottom: 100%\`로 붙인다
- 띠가 판 위 단추를 덮으면 \`fabOffset\`에 띠 높이(px)를 준다. 단추가 그만큼 올라간다

**판 위 개체 다루기** (틀이 그리지 않는다. 판을 만드는 쪽이 지킨다)
- **가운데 붙기:** 개체를 옮길 수 있는 판이면 판 가운데 근처에서 개체 중심이 저절로 붙는다. 붙는 동안 그 축에 점선을 보여 준다. 떼면 선도 걷는다
- **손잡이 자리:** 개체 상자 둘레에 기능마다 자리를 정해 둔다. 쓰지 않는 기능의 자리는 비운다(다른 기능을 당겨 오지 않는다)

| 자리 | 기능 |
|---|---|
| 왼쪽 위 | 지우기 |
| 오른쪽 위 | 레이어 순서 |
| 왼쪽 아래 | 좌우반전 |
| 오른쪽 아래 | 크기 조절 |
| 위 가운데, 대를 세워 삐져나오게 | 회전 |

- **판 밖으로 나가지 않게 붙드는 손잡이**
  - **크기 조절(+지우기)만 있는 판:** 오른쪽 아래 크기 손잡이를 늘 판 안에 둔다. 개체를 판보다 키워도 손잡이는 판 가장자리에 붙들어 잡을 수 있게 한다. 이 판에서는 크기 손잡이가 유일한 조작이라 안 보이면 할 수 있는 게 없다
  - **회전·반전·레이어 순서까지 있는 판(말풍선 편집):** 크기 손잡이는 붙들지 않아도 된다. 대신 **회전 손잡이를 늘 판 안에 둔다.** 위로 대를 세워 띄우는 자리라 다른 손잡이보다 먼저 판 밖으로 나간다. 각도는 손가락과 개체 중심 사이로 재므로 손잡이를 어디로 붙들든 결과는 같다

**판 크기**
- 바탕은 크기 컨테이너다. 판은 \`cqw\`·\`cqh\`로 바탕을 보고 제 크기를 정한다(예: \`width: min(340px, 100cqw, 100cqh - 32px)\`)
- 판 밖을 눌러도 받아야 하면(판에서 삐져나간 말풍선 끌기) \`stageRef\`로 바탕에 직접 건다
        `,
      },
    },
  },
};

function Board({ ratio = '1', width = '100%', children }) {
  return (
    <div style={{
      width, maxWidth: 340, aspectRatio: ratio, background: 'var(--color-bg-default)',
      border: '1px solid var(--color-border-default)', display: 'grid', placeItems: 'center',
      color: 'var(--color-text-tertiary)',
    }}>{children}</div>
  );
}

function Demo({ open: initial = false, ...frame }) {
  const [open, setOpen] = useState(initial);
  return (
    <>
      <Button onClick={() => setOpen(true)}>편집 열기</Button>
      <EditFrame isOpen={open} onCancel={() => setOpen(false)} onDone={() => setOpen(false)} aria-label="편집" {...frame} />
    </>
  );
}

export const Bubble = {
  name: '말풍선 편집',
  render: () => (
    <Demo
      hint="필요없는 공간은 잘라내요✂️"
      fabEnd={<EditFab icon="RotateCcw" label="초기화" />}
      footer={(
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <ToolButton icon="Image" label="내 사진" />
          <ToolButton icon="Layers" label="말풍선" />
          <ToolButton icon="Plus" label="이모지" />
          <ToolButton icon="Settings" label="크기 가이드" />
        </div>
      )}
    >
      <Board>판</Board>
    </Demo>
  ),
};

export const Slot = {
  name: '칸 그림 크기 정하기 (아래 자리 없음)',
  render: () => (
    <Demo hint="크기를 조절해요." fabStart={<EditFab icon="Eraser" label="배경 지우기" />}>
      <Board ratio="9 / 14" width="70%">판</Board>
    </Demo>
  ),
};

export const Meme = {
  name: '짤 만들기 (아래 자리 두 줄)',
  render: () => (
    <Demo
      fabStart={<EditFab icon="Download" label="기기에 저장" />}
      footer={(
        <>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-1)' }}>
            <Chip selected>말풍선</Chip><Chip>자막</Chip><Chip>표현</Chip>
          </div>
          <div style={{ height: 56, display: 'grid', placeItems: 'center', color: 'var(--color-text-tertiary)' }}>말풍선 목록</div>
        </>
      )}
    >
      <Board>판</Board>
    </Demo>
  ),
};
