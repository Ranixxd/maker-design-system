import { createContext, useContext, useState, useCallback, useRef } from 'react';
import styles from './Toast.module.css';

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const uid = useRef(0);

  const show = useCallback((message, duration = 2100) => {
    const id = ++uid.current;
    setItems(prev => [...prev, { id, message }]);
    setTimeout(() => setItems(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={styles.container} role="status" aria-live="polite">
        {items.map(t => (
          <div key={t.id} className={styles.toast}>{t.message}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
