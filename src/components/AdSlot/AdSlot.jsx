import styles from './AdSlot.module.css';

/* 바깥 광고를 iframe으로 받아 세우는 자리(2026-11-16).
   높이를 먼저 잡아 두어 광고가 늦게 와도 둘레가 밀리지 않는다.
   eager가 아니면 iframe을 브라우저 지연 로딩에 맡겨 화면 가까이 와야 받는다.
   label은 광고 위에 서는 표시 문구다 */
export default function AdSlot({ src, height = 100, label, title = '광고', eager = false, className, ...props }) {
  return (
    <aside className={[styles.slot, className].filter(Boolean).join(' ')} aria-label={title} {...props}>
      {label && <p className={[styles.label, 'text-body-xs'].join(' ')}>{label}</p>}
      <div className={styles.frame} style={{ height }}>
        {src && (
          <iframe
            className={styles.iframe}
            src={src}
            title={title}
            loading={eager ? 'eager' : 'lazy'}
            referrerPolicy="unsafe-url"
            scrolling="no"
          />
        )}
      </div>
    </aside>
  );
}
