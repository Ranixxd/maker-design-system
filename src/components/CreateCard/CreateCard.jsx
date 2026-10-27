import Icon from '../Icon/Icon';
import styles from './CreateCard.module.css';

/* 새로 만들기 카드(2026-10-27, 덕꾸 앱 테꾸·배꾸 홈의 [새 테마]·[새 배경]).
   높이 140, 테두리 없는 뮤트 면(bg-tertiary). 다른 상자보다 눈에 띄어야 해서 테두리 대신 면이다.
   가운데 검은 48 네모 안 흰 +, 아래 이름(label-md) */
export default function CreateCard({ label, className, ...props }) {
  return (
    <button type="button" className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.plus} aria-hidden="true"><Icon name="Plus" size="md" /></span>
      <span className="text-label-md">{label}</span>
    </button>
  );
}
