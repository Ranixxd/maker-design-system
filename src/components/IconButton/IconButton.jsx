import Icon from '../Icon/Icon';
import styles from './IconButton.module.css';

export default function IconButton({ icon, size = 'md', variant = 'neutral', className, ...props }) {
  return (
    <button
      type="button"
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      {...props}
    >
      <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} />
    </button>
  );
}
