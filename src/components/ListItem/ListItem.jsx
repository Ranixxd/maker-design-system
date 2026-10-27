import Icon from '../Icon/Icon';
import styles from './ListItem.module.css';

export default function ListItem({
  variant = 'normal',
  size = 'md',          // 'md' | 'sm'. sm은 normal에서만 (44px)
  icon,
  label,
  sub,
  trailing,
  media,                // 줄 오른쪽에 서는 그림(옵션 카드의 움직이는 그림). 크기는 넘기는 쪽이 정한다
  onClick,
  href,                 // 주면 링크(a)로 그린다(2026-10-28). 옵션 카드가 제 페이지를 가리킬 때(짤 만들기 목록). 크롤러가 따라간다
  className,
  ...props
}) {
  const Tag = href ? 'a' : onClick ? 'button' : 'div';
  return (
    <Tag
      type={!href && onClick ? 'button' : undefined}
      href={href}
      className={[styles.item, styles[variant], size === 'sm' && styles.sm, className].filter(Boolean).join(' ')}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.leading}>{icon}</span>}
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        {sub && <span className={styles.sub}>{sub}</span>}
      </span>
      {media && <span className={styles.media}>{media}</span>}
      {trailing !== undefined && (
        <span className={styles.trailing}>
          {trailing === 'chevron' ? <Icon name="ChevronRight" size="sm" /> : trailing}
        </span>
      )}
    </Tag>
  );
}
