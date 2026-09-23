import { createContext, useContext, useState, useCallback, useRef } from 'react';
import styles from './Toast.module.css';

const ToastCtx = createContext(null);

/* 두 번째 인자는 숫자(노출 시간)로도, 객체로도 받는다.
   숫자를 먼저 쓰던 곳이 있어서 그 모양을 그대로 둔 채 옵션을 열었다 */
function readOptions(options) {
  if (typeof options === 'number') return { duration: options, arrow: false };
  const { duration = 2100, arrow = false } = options || {};
  return { duration, arrow };
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const uid = useRef(0);

  const show = useCallback((message, options) => {
    const { duration, arrow } = readOptions(options);
    const id = ++uid.current;
    setItems(prev => [...prev, { id, message, arrow }]);
    setTimeout(() => setItems(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={styles.container} role="status" aria-live="polite">
        {items.map(t => (
          <div key={t.id} className={`text-label-md ${styles.toast}`}>
            {t.message}
            {t.arrow && <span className={styles.arrow} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
