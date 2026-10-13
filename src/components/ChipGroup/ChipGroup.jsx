import Chip from '../Chip/Chip';
import styles from './ChipGroup.module.css';

/* 칩 묶음(2026-10-14). Chip 여럿을 한 줄로 담고 그중 하나를 고르는 그릇이다. 넘치면 가로로 넘긴다.
   덕꾸 앱 ChipGroup과 같은 자리·같은 이름이다(앱 쪽 규칙은 앱 스토리북).

   - items: [{ value, label }]
   - value: 고른 값. allowEmpty면 ''나 null(아무것도 안 고름)일 수 있다
   - allowEmpty: 고른 칩을 다시 누르면 풀린다(onChange(null)). 고르지 않는 것도 답인 자리
     (프로필 SNS 종류: 안 고르면 SNS가 없다)에 쓴다. 끄면 늘 하나가 골라진 전환이다
   - inset: 줄 양 끝 여백. 기본 16(SelectRow와 같다). 카드처럼 이미 여백이 있는 안쪽이면 0 */
export default function ChipGroup({
  items,
  value,
  onChange,
  allowEmpty = false,
  inset = 'var(--spacing-4)',
  disabled = false,
  label,
  className,
  ...props
}) {
  return (
    <div role="group" aria-label={label}
      className={[styles.line, className].filter(Boolean).join(' ')}
      style={{ '--chip-group-inset': typeof inset === 'number' ? `${inset}px` : inset }}
      {...props}>
      {items.map((it) => {
        const on = value === it.value;
        return (
          <Chip key={it.value} selected={on} disabled={disabled}
            onClick={() => onChange(on && allowEmpty ? null : it.value)}>
            {it.label}
          </Chip>
        );
      })}
    </div>
  );
}
