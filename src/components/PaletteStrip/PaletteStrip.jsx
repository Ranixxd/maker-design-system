import styles from './PaletteStrip.module.css';

/* 그림에 쓴 색을 같은 폭의 칸으로 나란히 늘어놓은 띠. 그림 아래에 붙어 그 그림의 색 조합을 보인다.

   - colors: '#RRGGBB' 목록. 앞에서부터 왼쪽에 선다. 비면 아무것도 그리지 않는다
   - size: 'sm'(목록 카드 아래 얇은 띠, 글자 없음) | 'lg'(글 페이지의 포스터 띠)
   - codes: 칸마다 색 코드를 세로로 적는다. lg에서만 쓴다
   - onPick: codes와 함께 주면 칸이 단추가 되고, 누르면 그 칸의 코드('#RRGGBB', 대문자)를 넘긴다. 복사와 알림은 쓰는 쪽이 한다
   - label: 낭독기가 읽는 띠 이름(기본 "사용한 색") */
const 밝은가 = (hex) => {
  const n = parseInt(String(hex).slice(1, 7), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 160;
};

export default function PaletteStrip({ colors, size = 'sm', codes = false, onPick, label = '사용한 색', className }) {
  if (!colors || !colors.length) return null;
  const cls = [styles.strip, styles[size], className].filter(Boolean).join(' ');

  if (!codes) {
    return (
      <div className={cls} role="img" aria-label={label + ' ' + colors.join(', ')}>
        {colors.map((c, i) => <span key={i} className={styles.band} style={{ background: c }} />)}
      </div>
    );
  }

  const Band = onPick ? 'button' : 'span';
  return (
    <div className={cls} role="group" aria-label={label}>
      {colors.map((c, i) => {
        const hex = String(c).toUpperCase();
        return (
          <Band key={i} {...(onPick ? { type: 'button', 'aria-label': hex + ' 복사', onClick: () => onPick(hex) } : {})}
            className={[styles.band, styles.code, onPick && styles.pick, 밝은가(hex) ? styles.onLight : styles.onDark].filter(Boolean).join(' ')}
            style={{ background: hex }}>
            <span className={styles.hex}>{hex}</span>
          </Band>
        );
      })}
    </div>
  );
}
