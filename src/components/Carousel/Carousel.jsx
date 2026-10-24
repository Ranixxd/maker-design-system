import { useCallback, useEffect, useRef, useState } from 'react';
import EditFab from '../EditFab/EditFab';
import styles from './Carousel.module.css';

/* 옆으로 넘기는 줄(2026-10-24 사용자). 폰은 손가락으로 밀고, 넓은 화면(마우스)에서는 넘칠 때 양 끝에 화살표 단추(EditFab)가 선다.
   마우스로는 옆으로 굴릴 길이 없어 끝 칸이 걸쳐 보여도 넘기지 못했다.

   줄의 모양(칸 간격·스냅·여백·스크롤 막대 숨김)은 쓰는 쪽이 className으로 정한다. 이 부품은 굴리는 상자에 ref를 달고
   넘친 쪽에만 단추를 세운다. 맨 앞이면 왼쪽, 맨 끝이면 오른쪽 단추가 없다.
   단추를 누르면 보이는 너비의 80%만큼 넘긴다. 한 칸 남짓 겹쳐 보여 어디까지 봤는지 이어진다

   rootClassName: 단추가 기대는 바깥 상자. 줄이 flex 안에서 늘어나야 하면 여기에 준다 */
export default function Carousel({
  className,
  rootClassName,
  prevLabel = '이전',
  nextLabel = '다음',
  children,
  ...props
}) {
  const ref = useRef(null);
  const [edge, setEdge] = useState({ prev: false, next: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    /* 1px 남짓은 반올림 찌꺼기다 */
    const next = { prev: el.scrollLeft > 1, next: el.scrollLeft < max - 1 };
    setEdge((e) => (e.prev === next.prev && e.next === next.next ? e : next));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    /* 칸이 늘거나 줄어도(올린 이미지 칸 등) 다시 잰다 */
    const mo = new MutationObserver(measure);
    mo.observe(el, { childList: true, subtree: false });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, [measure]);

  /* 갈 자리를 줄 끝 안으로 막는다. 끝을 넘는 자리를 주면 칸 맞춤(scroll-snap)이 가까운 칸을 찾다 맨 앞으로 되돌린다 */
  const go = (dir) => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const left = Math.max(0, Math.min(max, el.scrollLeft + dir * el.clientWidth * 0.8));
    el.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <div className={[styles.root, rootClassName].filter(Boolean).join(' ')}>
      {/* 넘친 쪽 끝을 흐리게 지운다(scroll fade). 더 있다는 것을 칸이 잘린 모양 대신 흐려지는 끝으로 알린다 */}
      <div ref={ref} className={[className, edge.prev && styles.fadeStart, edge.next && styles.fadeEnd].filter(Boolean).join(' ')}
        onScroll={measure} {...props}>{children}</div>
      {edge.prev && <EditFab icon="ArrowLeft" label={prevLabel} className={`${styles.arrow} ${styles.prev}`} onClick={() => go(-1)} />}
      {edge.next && <EditFab icon="ArrowRight" label={nextLabel} className={`${styles.arrow} ${styles.next}`} onClick={() => go(1)} />}
    </div>
  );
}
