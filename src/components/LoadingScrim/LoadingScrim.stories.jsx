import { useState } from 'react';
import LoadingScrim from './LoadingScrim';
import Button from '../Button/Button';

export default {
  title: 'Components/LoadingScrim',
  component: LoadingScrim,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
기다리는 동안 덮는 흐린 덮개. 바탕은 \`bg-overlay-blur\`에 흐림 24px, 가운데에 도는 표시(24px) 하나다. 글은 띄우지 않는다.

**어디에 쓰나**
- **편집 판 위:** \`EditCanvas\` 안에 넣는다. 판 테두리 아래로 판을 꼭 맞게 덮는다. 창(시트)에서 고른 뒤 오래 걸리는 일(그림 모양 따기)은 창을 바로 닫고 다음 편집 화면을 열어 그 판에서 기다린다
- **화면 전체:** \`fullscreen\`. 편집기를 불러올 때(기본 그림·저장본·템플릿 받기, 테마 불러오기). \`--z-system\`에 선다

**규칙**
- 화면에는 도는 표시만 선다. \`label\`(기본 "불러오는 중…")은 읽어 주는 기능에만 간다
- 편집 판에서 불러오는 일은 누른 타일·단추가 아니라 이 덮개로 판 위에 보인다
- 덮개는 보이기만 한다. 그동안 끌기·[완료] 같은 동작은 쓰는 쪽이 멈춘다
- 창에 로딩을 걸어 닫기를 막지 않는다
        `,
      },
    },
  },
};

export const Box = {
  name: '상자 위',
  render: () => (
    <div style={{ position: 'relative', width: 240, height: 240, borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-tertiary)' }}>
      <LoadingScrim />
    </div>
  ),
};

export const Fullscreen = {
  name: '화면 전체',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => { setOpen(true); setTimeout(() => setOpen(false), 2000); }}>2초 덮기</Button>
        <LoadingScrim isOpen={open} fullscreen />
      </>
    );
  },
};
