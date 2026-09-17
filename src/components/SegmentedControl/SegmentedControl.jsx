import styles from './SegmentedControl.module.css';

/* 한 자리에서 보는 것을 바꾸는 탭 묶음. 옅은 판 위에 고른 칸만 흰 알약으로 떠오른다
   (내 테마의 보관한 테마·최근 내보낸 테마, 말풍선 만들기의 늘어나는 곳·글자 자리).

   Chip과 다른 자리다 — Chip은 목록을 걸러 보는 것이라 여럿을 늘어놓고 넘치면 굴리고,
   이쪽은 두셋을 한 줄에 꽉 채워 나눠 갖는다. 그래서 칸 수가 늘어날 수 있으면 Chip이다.

   items: [{ value, label, id? }] */
export default function SegmentedControl({
  items = [],
  value,
  onChange,
  label,                // 낭독기가 이 묶음을 무엇이라 부를지
  className,
  ...props
}) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} role="tablist" aria-label={label} {...props}>
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={on}
            id={it.id}
            className={[`text-label-md`, styles.item, on && styles.on].filter(Boolean).join(' ')}
            onClick={() => { if (!on && onChange) onChange(it.value); }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
