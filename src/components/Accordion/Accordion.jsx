import { useId, useState } from 'react';
import styles from './Accordion.module.css';

/* 접었다 펴는 한 칸. 제목을 누르면 아래 내용이 열린다
   (자주 묻는 질문, 가이드의 긴 설명, 편집 패널의 부가 설명).

   - 제목은 늘 보이고, 내용은 열었을 때만 보인다
   - 여러 칸을 이어 붙이면 목록이 된다. 묶는 자리는 쓰는 쪽이 만든다
   - 열림을 밖에서 쥐려면 open과 onToggle을 함께 준다. 안 주면 제 안에서 쥔다

   화살표 대신 +를 쓴다. 열리면 가로줄만 남아 -가 된다.
   내용은 열지 않아도 DOM에 남긴다. 검색 엔진이 읽어야 하는 글이 들어오는 자리다 */
export default function Accordion({
  title,
  children,
  open,
  onToggle,
  defaultOpen = false,
  className,
  ...props
}) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open === undefined ? inner : open;
  const id = useId();

  const toggle = () => {
    if (onToggle) onToggle(!isOpen);
    if (open === undefined) setInner(!isOpen);
  };

  return (
    <div className={[styles.item, className].filter(Boolean).join(' ')} {...props}>
      <button type="button" className={`text-heading-xs ${styles.head}`} aria-expanded={isOpen} aria-controls={id} onClick={toggle}>
        <span className={styles.title}>{title}</span>
        <span className={[styles.icon, isOpen && styles.on].filter(Boolean).join(' ')} aria-hidden="true" />
      </button>
      <div className={`text-body-md ${styles.body}`} id={id} hidden={!isOpen}>{children}</div>
    </div>
  );
}
