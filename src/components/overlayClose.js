import { createContext, useContext } from 'react';

/* 감싼 창(LayerPopup·Popover)을 닫는 함수를 안쪽 부품에 건넨다(2026-10-21).
   안쪽 부품이 할 일을 마치면 스스로 창을 닫게 한다(ColorPicker [적용]).
   쓰는 쪽이 창마다 닫는 줄을 따로 달지 않아도 된다. 창 밖에 두면 null이라 아무 일도 안 한다 */
export const OverlayCloseContext = createContext(null);

export function useOverlayClose() {
  return useContext(OverlayCloseContext);
}
