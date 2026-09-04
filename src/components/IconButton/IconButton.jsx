import { forwardRef } from 'react';
import Icon from '../Icon/Icon';
import styles from './IconButton.module.css';

/* forwardRef — Button과 같은 이유(자동 포커스 등에서 DOM 버튼에 ref가
   필요하다) */
const IconButton = forwardRef(function IconButton({ icon, size = 'md', variant = 'neutral', className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} />
    </button>
  );
});

export default IconButton;
