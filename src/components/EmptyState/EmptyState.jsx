import Button from '../Button/Button';
import styles from './EmptyState.module.css';

/* 목록이나 내용이 들어갈 자리가 비었을 때 그 자리를 채운다.
   비었을 때만이 아니라 불러오는 중·못 불러왔을 때도 같은 부품을 쓴다 —
   같은 자리에 번갈아 뜨는 글이라 모양이 바뀌면 튀어 보인다.

   설명글만 둔다. 제목·아이콘 자리는 두지 않았다(2026-09-17). 버튼은 있어도 되고 없어도 된다.
   버튼 모양은 부품이 정한다(secondary·sm) — 쓰는 곳마다 버튼 무게가 달라지지 않게
   action에는 이름과 동작만 넘긴다 */
export default function EmptyState({ description, action, className, ...props }) {
  const { label, ...buttonProps } = action || {};
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
      <p className={`text-body-md ${styles.description}`}>{description}</p>
      {action && (
        <Button variant="secondary" size="sm" {...buttonProps}>{label}</Button>
      )}
    </div>
  );
}
