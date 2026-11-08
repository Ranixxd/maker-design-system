import styles from './SelectRow.module.css';

/* 선택 줄(2026-10-12, 덕꾸 앱의 SelectRow를 웹으로 옮겼다). 선택 타일(SelectTile) 여럿을 한 줄로 담는 그릇이다.
   무엇을 고르는 줄인지는 상관없다(색, 사진, 말풍선 모양 등). 색만 고르는 줄은 ColorPalette를 쓴다.

   - 넘치면 가로로 넘긴다. leading을 주면 그 칸은 맨 앞에 서 있고 나머지만 넘어간다
   - 칸 위끝을 맞춘다. 이름이 붙은 칸과 안 붙은 칸이 섞여도 네모 칸끼리 한 줄에 선다
   - 줄 양 끝 여백은 16. 감싸는 쪽이 좌우 여백을 또 주지 않는다
   - columns를 주면 넘기지 않고 한 줄 그 칸 수의 격자로 쌓는다. 칸은 줄 너비를 꽉 채우게 늘어난 정사각이고 간격은 한 줄 띠와 같은 8이다. leading도 격자의 첫 칸이 된다
   - align="center"면 남을 때 가운데로 모은다. 넘치면 start와 같이 왼쪽부터 넘긴다(2026-10-12 사용자, 편집 화면 띠) */
export default function SelectRow({ leading, label, align = 'start', columns, className, children, ...props }) {
  return (
    <div role="group" aria-label={label}
      className={[styles.line, align === 'center' && styles.center, columns && styles.grid, className].filter(Boolean).join(' ')}
      style={columns ? { '--select-row-columns': columns } : undefined} {...props}>
      {!columns && leading}
      <div className={styles.scroll}>{columns ? leading : null}{children}</div>
    </div>
  );
}
