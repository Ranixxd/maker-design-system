import { useEffect, useRef, useState } from 'react';
import styles from './EditTray.module.css';

/* 편집 화면 아래 자리의 속(EditFrame footer). 칩 줄과 본문을 차례로 담는다.
   칩 줄과 본문 사이 24, 가로로 넘기는 줄이 화면 끝까지 닿도록 EditFrame 좌우 20을 되돌린다 */
export default function EditTray({ children, className, ...props }) {
  return (
    <div className={[styles.tray, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

/* 아래 자리의 본문. 칩 줄 밑에 고른 칩의 속 하나를 보인다.
   - value: 고른 칩, panes: { 칩 값: 속 }
   - 속을 모두 한 칸에 겹쳐 두고 가장 큰 높이에 고정한다. 칩을 바꿔도 아래 자리와 판이 움직이지 않는다.
     안 고른 속은 보이지도 눌리지도 않고 자리만 차지한다(늘 그려져 있어 안의 상태가 남는다)
   - 높이는 상한(192)까지다. 속이 그보다 길면 그 속 안에서 세로로 넘긴다. 판이 너무 작아지지 않게 한다
   - 넘기는 속은 아래가 더 남았을 때 아래 끝에 바탕색으로 흐려지는 띠를 깐다. 잘린 선이 묶음 사이에 떨어져도 밑에 더 있는 것이 보인다.
     끝까지 넘기면 띠가 걷힌다 */
export function EditTrayBody({ value, panes, className, ...props }) {
  const cls = [styles.body, className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...props}>
      {Object.entries(panes).map(([key, pane]) => (
        <TrayPane key={key} hidden={key !== value}>{pane}</TrayPane>
      ))}
    </div>
  );
}

/* 속 하나. 넘기는 칸과 아래 흐림 띠. 띠는 아래로 더 넘길 것이 있을 때만 선다(크기가 바뀌어도 다시 잰다) */
function TrayPane({ hidden, children }) {
  const ref = useRef(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const check = () => setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
    check();
    el.addEventListener('scroll', check, { passive: true });
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(check);
    if (ro) { ro.observe(el); if (el.firstElementChild) ro.observe(el.firstElementChild); }
    return () => { el.removeEventListener('scroll', check); if (ro) ro.disconnect(); };
  }, []);
  return (
    <div className={[styles.pane, hidden && styles.paneHidden].filter(Boolean).join(' ')} inert={hidden}>
      <div ref={ref} className={styles.scroll}><div>{children}</div></div>
      <div className={[styles.fade, more && styles.fadeOn].filter(Boolean).join(' ')} aria-hidden="true" />
    </div>
  );
}
