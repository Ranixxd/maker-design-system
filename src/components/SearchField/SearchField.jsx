import { forwardRef } from 'react';
import Icon from '../Icon/Icon';
import styles from './SearchField.module.css';

/* 찾는 말을 적는 칸. 목록을 좁히는 자리에 선다(이모지 찾기, 테마 이름 찾기).

   TextField와 다른 자리다 — TextField는 내가 쓴 값을 저장하는 폼 칸이라 이름표·필수·힌트를 달고,
   이쪽은 목록 위에 얹혀 결과를 좁히는 도구라 이름표가 없고 돋보기와 지우기가 붙는다.

   한글 조합 중에도 글자마다 찾게 브라우저 기본 input을 그대로 쓴다. 값과 onChange는
   쓰는 쪽이 들고 있어도 되고(제어), 안 들고 ref로 읽어도 된다(비제어) */
const SearchField = forwardRef(function SearchField({
  value,
  onChange,             // (문자열) => void
  onClear,              // 없으면 지우기 단추도 없다
  placeholder,
  className,
  ...inputProps
}, ref) {
  const has = value !== undefined ? String(value).length > 0 : undefined;
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <Icon name="Search" size="sm" className={styles.icon} />
      <input
        ref={ref}
        type="search"
        className={`text-body-md ${styles.input}`}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        {...inputProps}
      />
      {/* 값이 있을 때만 선다. 비제어(값을 안 넘김)면 쓰는 쪽이 보일지 정한다 */}
      {onClear && has !== false && (
        <button type="button" className={styles.clear} aria-label="지우기" onClick={onClear}>
          <Icon name="X" size="sm" />
        </button>
      )}
    </div>
  );
});

export default SearchField;
