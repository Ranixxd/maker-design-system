import { forwardRef } from 'react';
import Icon from '../Icon/Icon';
import styles from './IconButton.module.css';

/* forwardRef — Button과 같은 이유(자동 포커스 등에서 DOM 버튼에 ref가
   필요하다) */
const IconButton = forwardRef(function IconButton({ icon, size = 'md', variant = 'neutral', loading = false, onClick, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      {...props}
    >
      {/* 로딩 중에는 아이콘 자리에 스피너가 돈다(Button과 같다). 아이콘을 지우지 않고
          숨기는 이유는 버튼 크기가 흔들리지 않게 하려는 것이다 */}
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} className={loading ? styles.iconHidden : undefined} />
    </button>
  );
});

export default IconButton;
