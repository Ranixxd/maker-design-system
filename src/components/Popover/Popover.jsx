import {
  cloneElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState,
} from 'react';
import styles from './Popover.module.css';

/* 화면 밖으로 나가지 않게 남겨두는 가장자리 여백 */
const EDGE = 8;

/* 무언가를 눌렀을 때 그 자리 옆에 뜨는 작은 패널.

   LayerPopup과 다른 자리다 — LayerPopup은 화면을 덮고 집중을 뺏는 모달·바텀시트고,
   Popover는 누른 것 옆에 붙어 있다가 딴 데를 누르면 사라진다. 잠깐 고르고 마는
   일(더보기, 계정 메뉴)에 쓴다.

   ── role="menu"를 붙이지 않는 이유 ──
   ARIA의 menu는 화살표 키로 항목 사이를 옮겨다니는 것까지가 약속이다. 그 약속을
   지키지 않으면서 이름만 붙이면, 화면 낭독기를 쓰는 사람은 되지도 않는 조작을
   안내받는다. 아무 role도 붙이지 않은 패널이 더 정직하다. 정말 메뉴가 필요해지면
   그때 화살표 키까지 함께 넣는다.

   ── side·align은 "희망"이지 확정이 아니다 ──
   연 뒤에 실제로 재서, 화면 밖으로 나가면 스스로 밀어 넣고 위아래를 뒤집는다.
   부르는 쪽이 트리거가 화면 어디에 있는지까지 계산해서 넘길 수는 없다.
   좁은 화면에서는 같은 헤더라도 트리거가 왼쪽 끝에 붙기 때문이다. */
export default function Popover({
  trigger,                 // 여는 요소. ref를 받을 수 있어야 한다(IconButton·Button 모두 가능)
  children,                // 함수면 close를 받는다: (close) => ReactNode
  side = 'bottom',         // 'bottom' | 'top'   — 트리거의 어느 쪽에 펴고 싶은가
  align = 'end',           // 'start' | 'end'    — 어느 변에 맞추고 싶은가
  label,                   // 패널의 이름(aria-label)
  className,
  panelClassName,
  onOpenChange,
}) {
  const [open, setOpen] = useState(false);
  const [보정, set보정] = useState({ shiftX: 0, flipped: false });
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
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

  /* 화면 안으로 밀어 넣기.

     그리기 전에(useLayoutEffect) 재고 고쳐야 한 프레임 삐져나온 모습이 안 보인다.
     재기 전에 지난번 보정을 지우는 이유 — 밀어둔 상태로 재면 "이미 안에 있네"가
     되어 보정이 한 번 쓰이고 사라진다. */
  useLayoutEffect(() => {
    if (!open) { set보정({ shiftX: 0, flipped: false }); return; }

    const 재고고치기 = () => {
      const el = panelRef.current;
      const trigger = triggerRef.current;
      if (!el) return;

      el.style.transform = '';
      const r = el.getBoundingClientRect();
      const 폭 = window.innerWidth;
      const 높이 = window.innerHeight;

      let shiftX = 0;
      if (r.left < EDGE) shiftX = EDGE - r.left;               // 왼쪽으로 넘쳤다
      else if (r.right > 폭 - EDGE) shiftX = (폭 - EDGE) - r.right;  // 오른쪽으로 넘쳤다

      /* 세로는 밀지 않고 뒤집는다 — 트리거를 가리면 무엇을 눌러서 열었는지 잃는다.
         반대쪽에 자리가 더 있을 때만 뒤집는다. 양쪽 다 좁으면 그대로 둔다 */
      let flipped = false;
      if (trigger) {
        const t = trigger.getBoundingClientRect();
        const 위칸 = t.top, 아래칸 = 높이 - t.bottom;
        if (side === 'bottom' && r.bottom > 높이 - EDGE && 위칸 > 아래칸) flipped = true;
        if (side === 'top' && r.top < EDGE && 아래칸 > 위칸) flipped = true;
      }

      set보정({ shiftX, flipped });
    };

    재고고치기();
    /* 화면이 돌아가거나(모바일) 스크롤되면 자리가 달라진다 */
    window.addEventListener('resize', 재고고치기);
    window.addEventListener('scroll', 재고고치기, true);
    return () => {
      window.removeEventListener('resize', 재고고치기);
      window.removeEventListener('scroll', 재고고치기, true);
    };
  }, [open, side, align]);

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

  const 실제side = 보정.flipped ? (side === 'bottom' ? 'top' : 'bottom') : side;

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} ref={rootRef}>
      {트리거}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="group"
          aria-label={label}
          className={[styles.panel, styles[실제side], styles[align], panelClassName].filter(Boolean).join(' ')}
          style={보정.shiftX ? { transform: `translateX(${보정.shiftX}px)` } : undefined}
        >
          {typeof children === 'function' ? children(close) : children}
        </div>
      )}
    </div>
  );
}

