import { createContext, useContext, useState, useCallback, useRef, useLayoutEffect } from 'react';
import styles from './Toast.module.css';

const ToastCtx = createContext(null);

/* 사라지는 움직임이 끝난 뒤에 지운다. CSS의 --motion-duration-short(200ms)보다 조금 길게 둔다 */
const EXIT_MS = 240;
/* 맨 앞 하나와 그 뒤로 둘까지만 보인다. 그 뒤는 투명해져 자리를 기다린다 */
const VISIBLE = 3;

/* 두 번째 인자는 숫자(노출 시간)로도, 객체로도 받는다.
   숫자를 먼저 쓰던 곳이 있어서 그 모양을 그대로 둔 채 옵션을 열었다 */
function readOptions(options) {
  if (typeof options === 'number') return { duration: options, arrow: false };
  const { duration = 2100, arrow = false } = options || {};
  return { duration, arrow };
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const [front, setFront] = useState(null);
  const uid = useRef(0);
  const nodes = useRef(new Map());

  const show = useCallback((message, options) => {
    const { duration, arrow } = readOptions(options);
    const id = ++uid.current;
    setItems(prev => [...prev, { id, message, arrow, state: 'enter' }]);
    setTimeout(() => {
      setItems(prev => {
        const live = prev.filter(t => t.state !== 'leave');
        const pos = live.findIndex(t => t.id === id);
        return prev.map(t => (t.id === id ? { ...t, state: 'leave', i: live.length - 1 - pos } : t));
      });
      setTimeout(() => setItems(prev => prev.filter(t => t.id !== id)), EXIT_MS);
    }, duration);
  }, []);

  /* 들어올 자리(enter)를 브라우저가 한 번 계산하게 한 뒤 제자리(idle)로 보낸다. 그래야 움직임이 생긴다.
     requestAnimationFrame으로 미루면 뒤에 있는 탭에서 프레임이 멈춰 토스트가 안 보인 채 지나간다 */
  useLayoutEffect(() => {
    const entering = items.filter(t => t.state === 'enter');
    if (!entering.length) return;
    entering.forEach(t => nodes.current.get(t.id)?.offsetHeight);
    setItems(prev => prev.map(t => (t.state === 'enter' ? { ...t, state: 'idle' } : t)));
  }, [items]);

  /* 뒤에 깔린 것은 맨 앞 것과 같은 크기로 맞춘다. 글 길이가 달라도 겹친 모서리가 가지런하다 */
  const live = items.filter(t => t.state !== 'leave');
  const frontId = live.length ? live[live.length - 1].id : null;
  useLayoutEffect(() => {
    const el = frontId != null && nodes.current.get(frontId);
    if (!el) return;
    const size = { w: el.offsetWidth, h: el.offsetHeight };
    setFront(prev => (prev && prev.w === size.w && prev.h === size.h ? prev : size));
  }, [frontId, items.length]);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={styles.container} role="status" aria-live="polite">
        <div className={styles.stack}>
          {items.map(t => {
            const i = t.state === 'leave' ? t.i : live.length - 1 - live.indexOf(t);
            const behind = i > 0 && front;
            return (
              <div
                key={t.id}
                ref={el => (el ? nodes.current.set(t.id, el) : nodes.current.delete(t.id))}
                className={`text-body-md ${styles.toast}`}
                data-state={t.state}
                data-behind={i > 0 || undefined}
                data-hidden={i >= VISIBLE || undefined}
                aria-hidden={i > 0 || undefined}
                style={{
                  '--i': i,
                  ...(behind ? { width: front.w, height: front.h } : null),
                }}
              >
                <div className={styles.content}>
                  {t.message}
                  {t.arrow && <span className={styles.arrow} aria-hidden="true" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
