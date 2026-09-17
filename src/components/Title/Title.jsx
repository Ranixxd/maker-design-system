import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import styles from './Title.module.css';

/* 제목 한 줄. 페이지 맨 위, 창 머리, 본문 중간 구역 어디에나 선다.
   Header·Top이 아니라 Title인 이유는 자리가 아니라 역할로 불러서다. 본문 중간에도 쓴다(2026-09-17).

   - size: lg 24px(페이지 머리) / md 20px(창 머리) / sm 15px(본문 안 작은 제목)
   - icon: 제목 글자 바로 옆에 붙는 아이콘 단추. 도움말(?)처럼 제목에 딸린 것.
           크기는 제목을 따른다: lg·md는 48px(아이콘 24px), sm은 36px(아이콘 20px)
           톤은 neutral-weak로 낮춘다. 제목보다 먼저 보이면 안 된다
   - action: 제목 바로 옆 글자 단추(secondary sm). 제목과 한 묶음인 동작이다(말풍선 복붙).
           icon과 모양부터 달라 위계가 갈린다.
           페이지 머리 오른쪽 끝에 서는 단추(템플릿 페이지 [올리기] 등)는 제목과 묶이지 않는
           별도 요소라 여기 넣지 않는다. 쓰는 쪽이 배치한다
   - description: 제목 아래 설명 한 줄

   가운데 정렬일 때 제목 글자는 늘 정중앙이다. 아이콘·단추는 글자 오른쪽에 매달리고 자리를 차지하지 않는다.
   창마다 아이콘이 있고 없고에 따라 제목이 흔들리지 않게 하려는 것이다 */
const TEXT = { lg: 'text-heading-md', md: 'text-heading-sm', sm: 'text-heading-xs' };

export default function Title({
  children,
  size = 'md',            // 'lg' | 'md' | 'sm'
  align = 'start',        // 'start' | 'center'
  as: Tag = 'h2',
  icon,                   // { icon, 'aria-label', onClick, ... } → IconButton
  action,                 // { label, onClick, ... } → Button
  description,
  className,
  ...props
}) {
  const { label: actionLabel, ...actionProps } = action || {};
  const small = size === 'sm';
  return (
    <div className={[styles.root, styles[align], className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.row}>
        <span className={styles.heading}>
          <Tag className={`${TEXT[size] || TEXT.md} ${styles.text}`}>{children}</Tag>
          {(icon || action) && (
            <span className={styles.aside}>
              {icon && (
                <IconButton size={small ? 'sm' : 'md'} variant="neutral-weak" {...icon}
                  className={`${styles.icon} ${small ? styles.iconSm : styles.iconMd}`} />
              )}
              {action && (
                <Button variant="secondary" size="sm" {...actionProps} className={styles.action}>{actionLabel}</Button>
              )}
            </span>
          )}
        </span>
      </div>
      {description && <p className={`text-body-sm ${styles.description}`}>{description}</p>}
    </div>
  );
}
