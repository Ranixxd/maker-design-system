import { useEffect, useRef } from 'react';
import IconButton from '../IconButton/IconButton';
import styles from './Drawer.module.css';

/* 화면 가장자리에서 밀려나오는 서랍.

   메뉴처럼 "지금 하던 일을 덮되 잠깐 들렀다 가는" 자리를 맡는다.
   LayerPopup이 가운데 모달·바텀시트라면 이쪽은 옆에서 나온다 — 목적지가 여럿일 때
   목록을 펼쳐 보이는 자리다.

   **안에 무엇을 넣을지는 부르는 쪽이 정한다.** 이 부품은 껍데기만 맡는다 —
   밀려나오기, 뒷배경, 바깥·Esc로 닫기, 열렸을 때 뒤 스크롤 잠그기.
   앱마다 메뉴 내용이 다르기 때문이다(카톡테마 메이커는 일곱 줄, 배경화면
   메이커는 한 줄).

   닫기 단추를 안에 두지 않는다. 바깥을 누르거나 Esc로 닫는 것이 서랍의 몸에
   밴 방식이고, 좁은 화면에서는 서랍 밖이 늘 보인다 — 누를 곳이 이미 있다. */
export default function Drawer({
  open,
  onClose,
  side = 'left',          // 'left' | 'right'
  label = '메뉴',          // 낭독기가 이 영역을 무엇이라 부를지
  closeLabel = '닫기',
  showClose = false,      // 넓은 화면에서 바깥이 잘 안 보이는 배치라면 켠다
  children,
  className,
}) {
  const panelRef = useRef(null);

  /* Esc로 닫는다. LayerPopup과 같은 방식이다 */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  /* 열려 있는 동안 뒤가 스크롤되지 않게 한다 — 서랍을 밀다가 뒤 화면이
     따라 움직이면 어느 것을 만지는지 알 수 없다 */
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = before; };
  }, [open]);

  /* 열릴 때 서랍 안으로 포커스를 옮긴다. 안 옮기면 탭 키가 뒤 화면을 돌아다녀,
     보이는 것과 만지는 것이 어긋난다 */
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (first || panelRef.current)?.focus?.();
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.root} data-side={side}>
      {/* 뒷배경. 누르면 닫힌다 — aria-hidden이라 낭독기에는 잡히지 않는다 */}
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <nav
        ref={panelRef}
        className={[styles.panel, className].filter(Boolean).join(' ')}
        aria-label={label}
        tabIndex={-1}
      >
        {showClose && (
          <div className={styles.closeRow}>
            <IconButton icon="X" aria-label={closeLabel} onClick={onClose} />
          </div>
        )}
        {children}
      </nav>
    </div>
  );
}
