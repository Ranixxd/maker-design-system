import styles from './ListBox.module.css';

/* 목록 상자(2026-10-27, 덕꾸 앱 ListBox를 옮겼다). 흰 면에 border-default, 둥글기 2xl, 안쪽 4.
   어느 바탕 위에서나 쓴다. 줄 사이 선은 없다.

   MenuItem(팝오버·시트 줄)과는 다른 부품이다. 서로 바꿔 쓰지 않는다 */
export default function ListBox({ className, children, ...props }) {
  return (
    <div role="list" className={[styles.box, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}

/* 상자 안 한 줄. 줄은 투명하고 누르는 동안만 bg-pressed. 이름은 label-md 하나, 딸린 것(날짜)은 이름 아래.
   trailing(끝의 [⋯] 등)은 단추 안에 넣을 수 없어 줄 단추 옆에 따로 선다 */
export function ListBoxItem({ label, sub, trailing, onClick, className, ...props }) {
  return (
    <div role="listitem" className={[styles.row, className].filter(Boolean).join(' ')}>
      <button type="button" className={styles.main} onClick={onClick} {...props}>
        <span className="text-label-md">{label}</span>
        {sub !== undefined && <span className={`text-label-sm ${styles.sub}`}>{sub}</span>}
      </button>
      {trailing !== undefined && <span className={styles.trailing}>{trailing}</span>}
    </div>
  );
}
