import LayerPopup from '../LayerPopup/LayerPopup';
import Button from '../Button/Button';
import styles from './EditFrame.module.css';

/* 편집 화면의 틀. [편집 취소 | 편집 완료] 머리, 회색 바탕 위 판, 판 위 둥근 단추 두 자리, 아래 고정 자리.
   판 안에서 무슨 일이 일어나는지와 아래에 무엇을 둘지는 쓰는 쪽이 정한다.

   폰은 화면을 꽉 채우는 페이지, PC는 가운데 창(480×760)이다. 한 흐름에서 이어 여는 편집 화면이
   같은 크기로 떠야 같은 창이 옮겨 간 것처럼 보인다(말풍선 만들기 → 이미지 만들기) */
export default function EditFrame({
  isOpen,
  onCancel,
  onDone,
  cancelLabel = '편집 취소',
  doneLabel = '편집 완료',
  doneDisabled = false,
  hint,                 // 판 위 안내 한 줄
  fabStart,             // 판 아래 왼쪽 둥근 단추(EditFab)
  fabEnd,               // 판 아래 오른쪽 둥근 단추(EditFab)
  footer,               // 아래 고정 자리. 메인 기능(도구 줄·탭·입력 칸)
  children,             // 판
  className,
  ...props              // id·aria-label 등은 창(dialog)에 붙는다
}) {
  return (
    <LayerPopup
      isOpen={isOpen}
      onClose={onCancel}
      mobileType="page"
      className={[styles.frame, className].filter(Boolean).join(' ')}
      headerClassName={styles.head}
      bodyClassName={styles.body}
      footerClassName={styles.foot}
      headerStart={<Button variant="neutral" onClick={onCancel}>{cancelLabel}</Button>}
      headerEnd={<Button variant="accent" onClick={onDone} disabled={doneDisabled}>{doneLabel}</Button>}
      footer={footer ? <div className={styles.footInner}>{footer}</div> : undefined}
      {...props}
    >
      <div className={styles.stage}>
        {hint && <p className={`text-body-sm ${styles.hint}`}>{hint}</p>}
        <div className={styles.board}>{children}</div>
        {fabStart && <div className={`${styles.fabSlot} ${styles.fabStart}`}>{fabStart}</div>}
        {fabEnd && <div className={`${styles.fabSlot} ${styles.fabEnd}`}>{fabEnd}</div>}
      </div>
    </LayerPopup>
  );
}
