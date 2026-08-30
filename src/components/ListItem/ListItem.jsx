import Icon from '../Icon/Icon';
import styles from './ListItem.module.css';

export default function ListItem({
  variant = 'normal',
  icon,
  label,
  sub,
  trailing,
  onClick,
  className,
  ...props
}) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={[styles.item, styles[variant], className].filter(Boolean).join(' ')}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.leading}>{icon}</span>}
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </span>
      {trailing !== undefined && (
        <span className={styles.trailing}>
          {trailing === 'chevron' ? <Icon name="ChevronRight" size="sm" /> : trailing}
        </span>
      )}
    </Tag>
  );
}
