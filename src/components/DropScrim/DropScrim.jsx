import EditFab from '../EditFab/EditFab';
import DropZone from '../DropZone/DropZone';
import styles from './DropScrim.module.css';

/* 사진을 받기 전 편집 화면을 덮는 덮개(2026-10-23 사용자). 사진 첨부 상자(DropZone onDark)를 얹는다.
   편집 화면을 먼저 열고 그 위에 얹는다. 덮개 너머로 비치는 편집 화면(도구 줄·판)이 무엇을 하는 곳인지 알려 준다.
   사진만 덜렁 받는 화면으로 보내면 무엇을 하려고 사진을 넣는지 모른 채 넣게 된다.

   - area: 덮을 자리({ left, top, width, height, radius }, 화면 기준 px). 편집 화면의 머리 아래 몸통을 넘긴다.
           머리([편집 취소])가 덮이지 않아 사진 전에도 나갈 수 있다(2026-10-24 사용자). PC 가운데 창이면 창 안만 덮는다.
           없으면 화면 전체
   - frame: 상자를 얹을 자리(화면 기준 px). 편집 판의 자리를 넘기면 상자 점선이 판 둘레와 겹친다. 없으면 가운데에 선다
   - backLabel: 왼쪽 위 글자 붙은 뒤로 가기. 편집기에는 두지 않는다(2026-10-24 사용자, 편집기에서 다른 곳을 둘러보라는 것은 어색하다).
                편집 화면 머리까지 덮을 때만 쓴다
   - actions: 사진 말고 다른 길로 시작하는 단추 자리(2026-10-25 사용자, 찌그러진 얼굴의 [또는 이모지 넣기]).
              frame이 있으면 판 바로 아래 가운데, 없으면 상자 아래 가운데에 선다. 비우면 없다

   사진을 받으면 쓰는 쪽이 닫는다 */
export default function DropScrim({
  isOpen = true,
  label,                 // 상자 가운데 글
  area,
  frame,
  actions,
  backLabel,
  onBack,
  accept = 'image/*',
  onPick,                // (file) => void
  onReject,
  className,
  style,
  ...props
}) {
  if (!isOpen) return null;
  const 덮개 = area
    ? { left: area.left, top: area.top, width: area.width, height: area.height, right: 'auto', bottom: 'auto',
        borderBottomLeftRadius: area.radius, borderBottomRightRadius: area.radius, ...style }
    : style;
  const 바닥 = area || { left: 0, top: 0 };
  const 자리 = frame
    ? { position: 'absolute', left: frame.left - 바닥.left, top: frame.top - 바닥.top, width: frame.width, height: frame.height, maxWidth: 'none' }
    : undefined;
  const 단추자리 = frame
    ? { position: 'absolute', left: frame.left - 바닥.left, top: frame.top + frame.height - 바닥.top, width: frame.width }
    : undefined;
  return (
    <div className={[styles.scrim, frame && styles.placed, actions && styles.withActions, className].filter(Boolean).join(' ')} style={덮개} {...props}>
      {backLabel && (
        <EditFab icon="ArrowLeft" label={backLabel} showLabel className={styles.back} onClick={onBack} />
      )}
      <DropZone className={styles.zone} style={자리} ratio={frame ? null : '4 / 5'} tone="onDark"
        label={label} accept={accept} onPick={onPick} onReject={onReject} />
      {actions && <div className={styles.actions} style={단추자리}>{actions}</div>}
    </div>
  );
}
