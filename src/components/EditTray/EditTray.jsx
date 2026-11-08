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
   - height 'auto'(기본): 고른 속만 그린다. 높이가 속을 따르고 EditFrame이 재어 부드럽게 옮긴다
   - height 'max': 속을 모두 한 칸에 겹쳐 두고 가장 큰 높이에 고정한다. 안 고른 속은 보이지도 눌리지도 않고 자리만 차지한다.
     칩이 자주 바뀌어(판에서 개체를 고르면 칩이 저절로 넘어가는 등) 판이 밀리면 안 될 때 쓴다 */
export function EditTrayBody({ value, panes, height = 'auto', className, ...props }) {
  const cls = [height === 'max' ? styles.bodyMax : undefined, className].filter(Boolean).join(' ') || undefined;
  if (height !== 'max') {
    return <div className={cls} {...props}>{panes[value]}</div>;
  }
  return (
    <div className={cls} {...props}>
      {Object.entries(panes).map(([key, pane]) => (
        <div key={key} className={key === value ? undefined : styles.paneHidden} inert={key !== value}>{pane}</div>
      ))}
    </div>
  );
}
