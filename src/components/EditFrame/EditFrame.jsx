import { useLayoutEffect, useRef, useState } from 'react';
import LayerPopup from '../LayerPopup/LayerPopup';
import Button from '../Button/Button';
import Popover from '../Popover/Popover';
import MenuItem from '../MenuItem/MenuItem';
import Spinner from '../Spinner/Spinner';
import styles from './EditFrame.module.css';

const fits = (accept, file) => !accept || accept.split(',').some((a) => {
  const t = a.trim();
  return t.endsWith('/*') ? file.type.startsWith(t.slice(0, -1)) : file.type === t;
});

/* 빈 캔버스(2026-10-28, 덕꾸 앱 EditFrame empty와 같다). 판 자리에 점선 상자, 가운데 만들기 이름과 안내.
   누르면 사진 고르기가 열린다. more가 있으면 [내 사진]과 그 줄들을 고르는 팝오버가 먼저 뜬다(찌그러진 얼굴의 이모지).
   PC에서는 파일을 상자에 끌어다 놓아도 받는다(웹만의 길).
   alt가 있으면 그 아래에 사진 없이 시작하는 두 번째 상자가 선다(같은 점선, 이름 한 줄, 2026-10-29 음식 짤의 표정 넣기).
   기다리는 동안(busy·alt.busy)은 그 상자에 글 없이 도는 표시만 두고, 두 상자 다 누를 수 없다(2026-11-07 주인장, 덕꾸 앱과 같다) */
function EmptyBox({ title, description = '사진을 올려주세요', accept = 'image/*', onPick, onReject, more, alt, busy = false }) {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  const take = (file) => {
    if (!file) return;
    if (fits(accept, file)) onPick(file); else if (onReject) onReject(file);
  };
  const open = () => input.current && input.current.click();
  const wait = busy || !!(alt && alt.busy);
  const box = (
    <button type="button" className={styles.empty} data-over={over || undefined} disabled={wait}
      onClick={more ? undefined : open}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files && e.dataTransfer.files[0]); }}>
      {busy ? <Spinner size="md" label="불러오는 중" /> : (
        <>
          <span className="text-heading-xs">{title}</span>
          {description && <span className={`text-body-md ${styles.emptyGuide}`}>{description}</span>}
        </>
      )}
    </button>
  );
  return (
    <>
      {more && !wait ? (
        <Popover portal side="bottom" align="start" label={title} trigger={box} panelClassName={styles.emptyMenu}>
          {(close) => (
            <>
              <MenuItem label="내 사진" onClick={() => { close(false); open(); }} />
              {more.map((m) => <MenuItem key={m.label} label={m.label} onClick={() => { close(false); m.onClick(); }} />)}
            </>
          )}
        </Popover>
      ) : box}
      {alt && (
        <button type="button" className={`${styles.empty} ${styles.emptyAlt}`} onClick={alt.onClick} disabled={wait}>
          {alt.busy ? <Spinner size="md" label="불러오는 중" /> : <span className="text-heading-xs">{alt.title}</span>}
        </button>
      )}
      <input ref={input} type="file" accept={accept} hidden
        onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; take(f); }} />
    </>
  );
}

/* 아래 자리의 높이를 재어 붙인다. 속이 바뀌어 높이가 달라지면 그 높이로 부드럽게 옮겨 간다(2026-11-06 사용자).
   처음 잴 때는 옮기지 않는다. 옮기는 동안만 넘침을 자른다(커지는 동안 속이 판 위로 비치지 않게).
   판 위로 떠오르는 띠는 아래 자리(.foot)에 붙어 있어 이 자르기에 걸리지 않는다 */
function FootSize({ inert, children }) {
  const wrap = useRef(null);
  const inner = useRef(null);
  /* 높이와 자르기는 React를 거치지 않고 잰 자리에서 바로 붙인다. 상태로 두면 한 프레임 늦어 커질 때 속이 판 위로 한 번 비친다 */
  useLayoutEffect(() => {
    const box = wrap.current, el = inner.current;
    if (!box || !el || typeof ResizeObserver === 'undefined') return undefined;
    let last = null, timer = 0;
    const settle = () => { clearTimeout(timer); delete box.dataset.moving; };
    const measure = () => {
      const h = el.offsetHeight;
      if (h === last) return;
      if (last !== null) {
        box.dataset.moving = '';
        clearTimeout(timer);
        /* 끝 신호(transitionend)가 안 오는 때(동작 줄이기 등)를 위해 시간으로도 푼다. 옮기는 시간(300ms)보다 넉넉히 */
        timer = setTimeout(settle, 450);
      }
      last = h;
      box.style.height = h + 'px';
    };
    const done = (e) => { if (e.target === box) settle(); };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    box.addEventListener('transitionend', done);
    return () => { ro.disconnect(); box.removeEventListener('transitionend', done); clearTimeout(timer); };
  }, []);
  return (
    <div ref={wrap} className={styles.footSize}>
      <div ref={inner} className={styles.footInner} inert={inert}>{children}</div>
    </div>
  );
}

/* 편집 화면의 틀. [편집 취소 | 편집 완료] 머리, 회색 바탕 위 판, 판 위 둥근 단추 두 자리, 아래 고정 자리.
   판 안에서 무슨 일이 일어나는지와 아래에 무엇을 둘지는 쓰는 쪽이 정한다.

   폰도 PC도 화면을 꽉 채우는 페이지다(2026-10-24 사용자, 전에는 PC가 가운데 480×760 창). 한 흐름에서 이어 여는 편집 화면이
   같은 크기로 떠야 같은 창이 옮겨 간 것처럼 보인다(말풍선 만들기 → 이미지 만들기) */
export default function EditFrame({
  isOpen,
  onCancel,
  onDone,
  cancelLabel = '편집 취소',
  doneLabel = '편집 완료',
  doneDisabled = false,
  cancelProps,          // 머리 단추에 더 붙일 속성(id 등). 옮겨 온 코드·점검이 단추를 이름으로 찾는 곳에서 쓴다
  doneProps,
  hint,                 // 판 위 안내 한 줄
  below,                // 판 아래 한 줄. 판에만 걸리는 켜고 끄기(시선 집중 등)
  fabStart,             // 판 아래 왼쪽 둥근 단추(EditFab)
  fabEnd,               // 판 아래 오른쪽 둥근 단추(EditFab)
  fabOffset = 0,        // 판 위 단추를 이만큼(px) 올린다. 아래 자리에서 띠가 판 위로 떠올라 단추를 덮을 때
  footer,               // 아래 고정 자리. 메인 기능(도구 줄·탭·입력 칸)
  stageRef,             // 판을 세우는 바탕. 판 밖을 눌러도 끌기·고르기를 받아야 하는 편집(짤 만들기)이 쓴다
  empty,                // 빈 캔버스 { title, description(''이면 안내 줄 없이 이름만), accept, onPick(file), onReject, more: [{ label, onClick }], busy, alt: { title, onClick, busy } }. 주면 판 대신 점선 상자가 서고
                        // 아래 자리는 흰 덮개로 가려 누를 수 없고 [편집 완료]도 꺼진다
  children,             // 판
  className,
  ...props              // id·aria-label 등은 창(dialog)에 붙는다
}) {
  return (
    <LayerPopup
      isOpen={isOpen}
      onClose={onCancel}
      mobileType="page"
      desktopType="page"
      still
      className={[styles.frame, className].filter(Boolean).join(' ')}
      headerClassName={styles.head}
      bodyClassName={styles.body}
      footerClassName={styles.foot}
      headerStart={<Button variant="neutral" {...cancelProps} onClick={onCancel}>{cancelLabel}</Button>}
      headerEnd={<Button variant="accent" {...doneProps} onClick={onDone} disabled={doneDisabled || !!empty}>{doneLabel}</Button>}
      footer={footer ? (
        <>
          <FootSize inert={empty ? true : undefined}>{footer}</FootSize>
          {empty && <div className={styles.footCover} aria-hidden="true" />}
        </>
      ) : undefined}
      {...props}
    >
      <div className={[styles.stage, !((hint && !empty) || below || fabStart || fabEnd) && styles.roomy].filter(Boolean).join(' ')} ref={stageRef} style={fabOffset ? { '--edit-fab-offset': fabOffset + 'px' } : undefined}>
        <div className={styles.board}>
          {hint && !empty && <p className={`text-body-sm ${styles.hint}`}>{hint}</p>}
          {empty ? <EmptyBox {...empty} /> : children}
          {below && !empty && <div className={styles.below}>{below}</div>}
        </div>
        {fabStart && <div className={`${styles.fabSlot} ${styles.fabStart}`}>{fabStart}</div>}
        {fabEnd && <div className={`${styles.fabSlot} ${styles.fabEnd}`}>{fabEnd}</div>}
      </div>
    </LayerPopup>
  );
}
