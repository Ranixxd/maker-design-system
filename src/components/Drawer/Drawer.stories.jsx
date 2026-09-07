import { useState } from 'react';
import Drawer from './Drawer';
import Button from '../Button/Button';
import MenuItem from '../MenuItem/MenuItem';
import IconButton from '../IconButton/IconButton';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: `화면 가장자리에서 밀려나오는 서랍. 메뉴처럼 목적지가 여럿일 때 목록을 펼쳐 보이는 자리다.

바깥을 누르거나 Esc를 치면 닫히고, 열려 있는 동안 뒤 화면은 구르지 않는다.

### LayerPopup과 어떻게 다른가

LayerPopup은 가운데 모달(넓은 화면)·바텀시트(좁은 화면)로, **하나의 일을 끝내는** 자리다.
Drawer는 옆에서 나와 **어디로 갈지 고르는** 자리다. 겹쳐 쓰지 않는다 —
서랍 위에서 모달이 열리는 일은 있어도 그 반대는 없고, z 토큰도 그렇게 짜여 있다
(\`--z-drawer\` < \`--z-modal\`).

### 안에 무엇을 넣을지는 부르는 쪽이 정한다

이 부품은 껍데기만 맡는다. 앱마다 메뉴 내용이 다르기 때문이다 —
카톡테마 메이커는 일곱 줄, 배경화면 메이커는 한 줄이다.

### 닫기 단추를 기본으로 두지 않는다

바깥을 누르거나 Esc로 닫는 것이 서랍의 몸에 밴 방식이고, 좁은 화면에서도 서랍 밖이
늘 보여서 누를 곳이 이미 있다. 바깥이 잘 안 보이는 배치라면 \`showClose\`로 켠다.`,
      },
    },
  },
};

/* 서랍은 열림 상태를 부르는 쪽이 들고 있다 — 스토리마다 작은 껍데기를 둔다 */
function Demo({ children, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>메뉴 열기</Button>
      <Drawer {...props} open={open} onClose={() => setOpen(false)}>
        {children}
      </Drawer>
    </>
  );
}

export const Default = {
  render: () => (
    <Demo label="사이드 메뉴">
      <div style={{ padding: 'var(--spacing-4)' }}>
        <MenuItem label="카톡테마 만들기" />
      </div>
    </Demo>
  ),
};

export const RightSide = {
  name: '오른쪽에서',
  render: () => (
    <Demo side="right" label="사이드 메뉴">
      <div style={{ padding: 'var(--spacing-4)' }}>
        <MenuItem label="첫번째" />
        <MenuItem label="두번째" />
      </div>
    </Demo>
  ),
};

export const WithClose = {
  name: '닫기 단추까지',
  render: () => (
    <Demo showClose label="사이드 메뉴">
      <div style={{ padding: 'var(--spacing-4)' }}>
        <MenuItem label="카톡테마 만들기" />
      </div>
    </Demo>
  ),
};
