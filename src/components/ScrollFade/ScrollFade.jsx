import { useEffect, useRef, useState } from 'react';
import styles from './ScrollFade.module.css';

/* 넘기는 칸의 아래 흐림 띠. 넘기는 칸 맨 끝에 하나 둔다.
   칸의 보이는 아래 끝에 붙어(sticky) 있다가, 아래로 더 남았을 때만 바탕색으로 흐려지는 띠를 보인다.
   끝까지 넘기면 걷힌다. 자리를 차지하지 않고(위로 제 높이만큼 당긴다) 누르는 데 끼지 않는다.
   칸의 높이가 사용자가 끄는 대로 바뀌는 바텀시트 안에서도 보이는 아래 끝을 따라간다 */
export default function ScrollFade({ className }) {
  const ref = useRef(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const el = ref.current && ref.current.parentElement;
    if (!el) return undefined;
    /* 넘기는 칸에 아래 안쪽 여백이 있으면 sticky가 그만큼 위에 멈춘다. 여백만큼 내려 칸의 보이는 아래 끝에 붙인다 */
    const pad = parseFloat(getComputedStyle(el).paddingBottom) || 0;
    ref.current.style.bottom = -pad + 'px';
    const check = () => setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
    check();
    el.addEventListener('scroll', check, { passive: true });
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(check);
    if (ro) { ro.observe(el); for (const c of el.children) ro.observe(c); }
    return () => { el.removeEventListener('scroll', check); if (ro) ro.disconnect(); };
  }, []);
  return <div ref={ref} aria-hidden="true" className={[styles.fade, more && styles.on, className].filter(Boolean).join(' ')} />;
}
