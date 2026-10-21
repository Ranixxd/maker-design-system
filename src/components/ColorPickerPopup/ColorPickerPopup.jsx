import { cloneElement, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Popover from '../Popover/index.js';
import LayerPopup from '../LayerPopup/index.js';
import ColorPicker from '../ColorPicker/index.js';
import styles from './ColorPickerPopup.module.css';

/* LayerPopup과 같은 기준(768px)으로 팝오버와 시트를 가른다 */
const MOBILE_Q = '(max-width: 767px)';
function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(MOBILE_Q).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_Q);
    const on = (e) => setM(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

/* 색 선택기를 띄우는 창(2026-10-21, ColorPalette의 직접 고르기에서 꺼냈다).
   데스크톱은 trigger 옆 Popover, 폰은 아래 시트. 둘 다 body로 나가 편집 화면 같은 창 위에 뜬다.
   [적용]하면 ColorPicker가 이 창을 닫는다(useOverlayClose).

   색 선택기를 띄우는 곳은 모두 이것을 쓴다. 곳마다 팝오버·시트를 따로 짜면 덮개·닫기 같은 규칙을
   바꿀 때 한 곳씩 빠진다.

   - trigger: 여는 요소. ref를 받을 수 있어야 한다. 없으면 open으로만 연다(메뉴에서 여는 곳). 그때는 늘 LayerPopup이다
   - open·onOpenChange: 밖에서 열고 닫을 때. 안 주면 스스로 든다
   - onOpen: 열릴 때 한 번 부른다(그 칸을 고른 칸으로 삼기 등) */
export default function ColorPickerPopup({
  trigger,
  value,
  onChange,
  title,
  open: openProp,
  onOpenChange,
  onOpen,
  side = 'top',
  align = 'end',
}) {
  const mobile = useIsMobile();
  const [own, setOwn] = useState(false);
  const open = openProp ?? own;
  const setOpen = (o) => { if (openProp === undefined) setOwn(o); onOpenChange?.(o); };

  /* Popover는 onOpenChange가 바뀔 때마다 다시 부른다. 고정해 두지 않으면 다시 그려질 때마다 불린다 */
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  const onPopover = useCallback((o) => { if (o) onOpenRef.current?.(); }, []);

  const picker = <ColorPicker value={value} onChange={onChange} label={title} />;

  if (trigger && !mobile) {
    return (
      <Popover portal side={side} align={align} trigger={trigger} label={title} panelClassName={styles.pop}
        onOpenChange={onPopover}>{picker}</Popover>
    );
  }
  return (
    <>
      {trigger && cloneElement(trigger, {
        'aria-haspopup': 'dialog',
        onClick: (e) => { trigger.props.onClick?.(e); onOpen?.(); setOpen(true); },
      })}
      {typeof document !== 'undefined' && createPortal(
        <LayerPopup isOpen={open} onClose={() => setOpen(false)} title={title} mobileType="sheet">{picker}</LayerPopup>,
        document.body,
      )}
    </>
  );
}
