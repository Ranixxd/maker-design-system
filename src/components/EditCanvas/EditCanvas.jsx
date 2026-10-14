import { forwardRef } from 'react';
import styles from './EditCanvas.module.css';

/* 편집 화면(EditFrame)의 판. 모든 편집 판은 이것으로 감싼다(2026-10-10 사용자).
   - 모서리는 radius-sm(2026-10-10 사용자, md에서 고쳤다), 테두리는 그림 위에 얹는 border-subtle이다. 판 안 그림 색과 섞여 어우러진다
   - 크기: ratio(폭 / 높이)를 주면 EditFrame이 내준 최대 크기(--edit-canvas-max-w·-h) 안에서 그 비율로 가장 크게 선다.
     ratio 없이 쓰는 쪽이 width·height를 정해도 최대 크기는 넘지 않는다
   - clip: 기본은 판 밖으로 나간 것을 잘라 모서리를 지킨다. 자르기 막대처럼 판 변에 걸쳐 그리는 것이 있으면 false로 두고 안쪽 그림을 따로 자른다
   - transparent: 판 바탕을 체크무늬로 깐다. 바탕 없이 그림만 남는 편집(누끼 그림에 얼굴 달기)에서 투명한 곳이 보이게 한다(2026-10-13).
     판 밖에서 같은 무늬를 깔 때(저장 미리보기)는 checkerClass를 쓴다
   ref는 판 자체(div)에 붙는다. 눌린 자리를 판 기준으로 재는 쪽이 쓴다 */
const EditCanvas = forwardRef(function EditCanvas({ ratio, clip = true, transparent = false, className, style, children, ...props }, ref) {
  const sized = ratio
    ? {
        width: `min(var(--edit-canvas-max-w, 340px), calc(var(--edit-canvas-max-h, 340px) * ${ratio}))`,
        aspectRatio: String(ratio),
      }
    : null;
  return (
    <div
      ref={ref}
      className={[styles.canvas, clip && styles.clip, transparent && styles.checker, className].filter(Boolean).join(' ')}
      style={{ ...sized, ...style }}
      {...props}
    >
      {children}
    </div>
  );
});

export default EditCanvas;

/* 투명을 뜻하는 체크무늬. 판 밖에서 같은 무늬를 깔 때 쓴다 */
export const checkerClass = styles.checker;
