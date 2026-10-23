import styles from './LoadingScrim.module.css';

/* 기다리는 동안 덮는 흐린 덮개. 가운데에 글 한 줄("불러오는 중…")만 띄운다.
   - 기본은 감싼 상자(position이 있는 부모)를 덮는다. 편집 판은 EditCanvas 안에 넣으면 판 테두리 아래로 판을 덮는다
   - fullscreen: 화면 전체를 덮는다(--z-system). 편집기를 불러올 때 쓴다
   덮개는 보이기만 한다. 그동안 끌기·완료 같은 동작은 쓰는 쪽이 멈춘다 */
export default function LoadingScrim({ isOpen = true, fullscreen = false, label = '불러오는 중…', className, ...props }) {
  if (!isOpen) return null;
  return (
    <div className={['text-label-md', styles.scrim, fullscreen && styles.fullscreen, className].filter(Boolean).join(' ')} role="status" {...props}>
      {label}
    </div>
  );
}
