import { cloneElement, useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './Popover.module.css';

/* 무언가를 눌렀을 때 그 자리 옆에 뜨는 작은 패널.

   LayerPopup과 다른 자리다 — LayerPopup은 화면을 덮고 집중을 뺏는 모달·바텀시트고,
   Popover는 누른 것 옆에 붙어 있다가 딴 데를 누르면 사라진다. 잠깐 고르고 마는
   일(더보기, 계정 메뉴)에 쓴다.

   ── role="menu"를 붙이지 않는 이유 ──
   ARIA의 menu는 화살표 키로 항목 사이를 옮겨다니는 것까지가 약속이다. 그 약속을
   지키지 않으면서 이름만 붙이면, 화면 낭독기를 쓰는 사람은 되지도 않는 조작을
   안내받는다. 아무 role도 붙이지 않은 패널이 더 정직하다. 정말 메뉴가 필요해지면
   그때 화살표 키까지 함께 넣는다. */
export default function Popover({
  trigger,                 // 여는 요소. ref를 받을 수 있어야 한다(IconButton·Button 모두 가능)
  children,                // 함수면 close를 받는다: (close) => ReactNode
  side = 'bottom',         // 'bottom' | 'top'   — 트리거의 어느 쪽에 펴나
  align = 'end',           // 'start' | 'end'    — 어느 변에 맞춰 세우나
  label,                   // 패널의 이름(aria-label)
  className,
  panelClassName,
  onOpenChange,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();

  /* 닫을 때 포커스를 트리거로 돌려준다 — 키보드로 연 사람이 문서 맨 앞으로
     튕기지 않게 한다. 마우스로 닫았을 때도 해가 없다 */
  const close = useCallback((focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus?.();
  }, []);

  useEffect(() => { onOpenChange?.(open); }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    /* pointerdown으로 듣는다 — click은 눌렀다 뗀 뒤에 오므로, 누르는 순간
       사라지길 기대하는 손끝의 느낌과 어긋난다 */
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) close(false); };
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  /* 트리거는 쓰는 쪽이 준 것을 그대로 쓰고 필요한 것만 얹는다.
     이미 ref가 달려 있어도 잃지 않도록 둘 다 채운다 */
  const 트리거 = cloneElement(trigger, {
    ref: (node) => {
      triggerRef.current = node;
      const 원래 = trigger.ref;
      if (typeof 원래 === 'function') 원래(node);
      else if (원래 && typeof 원래 === 'object') 원래.current = node;
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': open,
    'aria-controls': open ? panelId : undefined,
    onClick: (e) => {
      trigger.props.onClick?.(e);
      if (!e.defaultPrevented) setOpen((v) => !v);
    },
  });

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} ref={rootRef}>
      {트리거}
      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={label}
          className={[styles.panel, styles[side], styles[align], panelClassName].filter(Boolean).join(' ')}
        >
          {typeof children === 'function' ? children(close) : children}
        </div>
      )}
    </div>
  );
}
