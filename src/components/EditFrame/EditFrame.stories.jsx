import { useState } from 'react';
import EditFrame from './EditFrame';
import EditCanvas from '../EditCanvas/EditCanvas';
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

**영역은 셋이다(2026-10-10 사용자).** 머리(탑 액션) / 본문(판) / 아래 자리(툴바). 영역 사이에 선을 긋지 않는다. 본문 바탕(\`bg-tertiary\`) 면으로 갈린다.

**틀이 정하는 것**
- **머리:** 왼쪽은 취소·뒤로가기처럼 물러나는 일(\`neutral\`), 오른쪽은 끝내는 일(\`accent\`)이다. 자리를 맞바꾸거나 한쪽에 다른 일을 두지 않는다
  - 오른쪽 이름은 [편집 완료]다. [완성]·[완료]만 쓰지 않는다. 왼쪽은 [편집 취소]
  - 맥락에 따라 오른쪽이 [저장]일 수 있다(2026-10-10 사용자)
  - 이름은 바꾸지 않는 것이 기본이다. 편집 안에서 한 단계 더 들어갈 때만(자르기 → [뒤로가기]·[자르기 완료]) \`cancelLabel\`·\`doneLabel\`로 바꾼다
  - 편집 화면이 여러 장 이어지는 흐름에서 다음 편집 화면으로 넘기는 단추는 [다음]이다(냉장고 얼굴 맞추기 → 판, 2026-10-03). 마지막 화면은 [편집 완료]
  - 단추에 id 같은 속성을 더 달려면 \`cancelProps\`·\`doneProps\`
- **판:** 본문(\`bg-tertiary\`) 한가운데. 판 바로 위에 안내 한 줄(\`hint\`)을 둘 수 있다
- **판 위 둥근 단추:** \`fabStart\`·\`fabEnd\`에 \`EditFab\`을 하나씩. 부가 기능만 둔다
- **안내와 둥근 단추는 띄워 둔다(absolute).** 있다가 없어져도 판이 움직이지 않는다. 판 둘레에 다른 글·단추를 더 둘 때도 띄운다. 판과 같은 줄에 흐르게 두면 숨길 때 판이 움직인다
- **아래 고정 자리:** \`footer\`. 선 없이 자리만 내준다. 캔버스 내용을 고치거나 더하는 도구(도구 줄·탭·입력 칸)가 여기 온다. 없으면 비워 둔다

**쓰는 쪽이 정하는 것**
- 판의 크기와 비율, 판 안에서 일어나는 일
- 아래 자리에 무엇을 몇 줄 놓을지

**크기**
- 폰은 화면을 꽉 채우는 페이지, PC는 가운데 창(480×760)이다. 창 모양을 고르지 않는다. 편집은 몰입하는 일이라 늘 페이지다(\`LayerPopup\`의 시트·페이지 고르기)
- 한 흐름에서 이어 여는 편집 화면은 같은 크기라 같은 창이 옮겨 간 것처럼 보인다

**판 위로 떠오르는 띠**
- 아래 자리는 \`position: relative\`다. 색 고르기처럼 판 위로 잠깐 떠오르는 띠는 아래 자리 안에 두고 \`bottom: 100%\`로 붙인다. 윗선 없이 흰 면(\`bg-default\`)으로 갈린다
- 본문 위 색 칩의 고른 표시는 primary(\`border-primary\` 2px)다. accent(보라)나 채움으로 가르지 않는다(2026-10-10 사용자)
- 띠가 판 위 단추를 덮으면 \`fabOffset\`에 띠 높이(px)를 준다. 단추가 그만큼 올라간다
- 색을 고르는 띠는 안에 \`ColorPalette align="center"\`를 둔다. 띠는 위아래 8만 주고 좌우 여백은 줄이 준다. 직접 고르기는 \`picker\`로 팔레트가 띄운다

**판 위 개체 다루기** (틀이 그리지 않는다. 판을 만드는 쪽이 지킨다)
- **가운데 붙기는 반드시 있다**(2026-10-12 사용자): 개체를 옮길 수 있는 판이면 판 가운데 근처(4px)에서 개체 중심이 저절로 붙는다. 붙는 동안 그 축에 점선을 보여 준다. 떼면 선도 걷는다. 사진 하나만 맞추는 판(얼굴·부적·프로필 사진 자리 잡기)도 같다
- **비정형으로 잘리는 판은 잘리는 모양을 미리 보인다**(권장, 2026-10-12 사용자): 사각형이 아닌 형태(원 등)로 잘려 템플릿에 들어가면, 판 위에 그 형태를 보여 어떻게 잘리는지 알게 한다. 보이는 부분 밖은 검은 dim(\`bg-overlay\`)으로 덮는다
- **고른 상자(선택 박스)는 반드시 있다**(2026-09-30 사용자). 움직일 수 있는 그림에는 늘 상자 선이 보인다. 움직이는 것이 하나뿐인 판도 상자를 늘 띄운다
- **상자·손잡이·도구 줄·가운데 점선은 `ObjectBox`, 끄는 셈은 `useObjectDrag`로 그린다**(2026-10-20). 손잡이 자리와 도구 줄 규칙은 ObjectBox 문서에 있다. 판마다 따로 그리지 않는다

**판은 EditCanvas로 감싼다(2026-10-10 사용자)**
- 모서리 \`radius-sm\`, 테두리는 그림 위에 얹는 \`border-subtle\`. 판마다 테두리·모서리를 따로 그리지 않는다
- **최대 크기는 하나의 식이다:** 340, 본문 폭(좌우 여백 20씩 뺀 것), 본문 높이 - 112 중 가장 작은 값(\`--edit-canvas-max-w\`·\`--edit-canvas-max-h\`).
  112는 위 안내와 아래 둥근 단추(아래에서 12 + 36 + 틈 8 = 56) 자리를 위아래 똑같이 비우는 값이라, 세로로 긴 판이나 짧은 화면에서도 안내·단추가 판을 덮지 않는다
- \`ratio\`(폭 / 높이)를 주면 그 안에서 그 비율로 가장 크게 선다. 판 안 그림의 실제 px는 판을 재서(getBoundingClientRect) 쓴다
- 판 밖을 눌러도 받아야 하면(판에서 삐져나간 말풍선 끌기) \`stageRef\`로 바탕에 직접 건다
- 바탕 없이 그림만 남는 편집(누끼 그림에 얼굴 달기)은 \`transparent\`로 판 바탕에 체크무늬를 깐다(2026-10-13). 판 밖 미리보기에 같은 무늬를 깔 때는 \`checkerClass\`
        `,
      },
    },
  },
};

function Board({ ratio = 1, children }) {
  return (
    <EditCanvas ratio={ratio} style={{
      background: 'var(--color-bg-default)', display: 'grid', placeItems: 'center',
      color: 'var(--color-text-tertiary)',
    }}>{children}</EditCanvas>
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
      <Board ratio={9 / 14}>판</Board>
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
