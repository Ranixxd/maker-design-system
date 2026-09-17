import styles from './Chip.module.css';

/* 알약 모양의 작은 고르개. 여럿 중 하나를 걸러 보는 자리에 선다
   (이모지 분류, 말풍선 색, 좋아하는 색, 편집 패널 구역).

   선택 상태가 있다(selected). 눌러서 이동만 하는 것에는 쓰지 않는다 —
   그건 링크나 Button이다. 여러 개가 한 줄에 서므로 줄바꿈하지 않고,
   넘치면 부모가 가로로 굴린다 */
export default function Chip({
  children,
  selected = false,
  leading,              // 글자 앞 작은 그림(이모지 등)
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={[styles.chip, selected && styles.on, className].filter(Boolean).join(' ')}
      aria-pressed={selected}
      {...props}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      <span className={`text-label-sm ${styles.label}`}>{children}</span>
    </button>
  );
}
