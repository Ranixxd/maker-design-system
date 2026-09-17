import styles from './Dot.module.css';

/* 읽지 않은 것이 있다고 알리는 점. 숫자도 글자도 없이 "새 것이 있다"만 말한다.
   읽으면 사라지는 자리에만 쓴다. 사라지지 않는 상태(beta 같은 것)는 Badge다.

   낭독기에는 잡히지 않는다(aria-hidden) — 곁에 선 이름이 이미 무엇인지 말하고 있고,
   점 하나가 따로 읽히면 무슨 뜻인지 알 수 없다 */
export default function Dot({ size = 'md', ring = false, className, ...props }) {
  return (
    <span
      className={[styles.dot, styles[size], ring && styles.ring, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...props}
    />
  );
}
