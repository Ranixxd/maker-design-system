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
