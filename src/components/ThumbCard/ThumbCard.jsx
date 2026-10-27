import styles from './ThumbCard.module.css';

/* 썸네일 카드(2026-10-27, 덕꾸 앱 이어서 편집 카드). 정사각 그림 칸 아래 한 줄에 글(날짜)과 끝의 [⋯].
   이름은 두지 않는다. 그림 칸 안은 부르는 쪽이 채운다(테마는 하단탭 아이콘 더미, 배경은 배경화면).
   그림 칸이 단추이고, trailing은 단추 밖 아래 줄에 선다 */
export default function ThumbCard({ children, caption, trailing, size = 120, label, onClick, className, ...props }) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')} style={{ width: size }} {...props}>
      <button type="button" className={styles.frame} style={{ height: size }} aria-label={label} onClick={onClick}>
        {children}
      </button>
      <div className={styles.foot}>
        <span className={`text-label-sm ${styles.caption}`}>{caption}</span>
        {trailing && <span className={styles.trailing}>{trailing}</span>}
      </div>
    </div>
  );
}
