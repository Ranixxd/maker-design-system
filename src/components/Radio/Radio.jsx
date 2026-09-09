import { createContext, useContext } from 'react';
import styles from './Radio.module.css';

const RadioCtx = createContext(null);

export function RadioGroup({ name, value, onChange, children }) {
  return (
    <RadioCtx.Provider value={{ name, value, onChange }}>
      <div className={styles.group} role="radiogroup">
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

export function Radio({ value, children }) {
  const { name, value: groupValue, onChange } = useContext(RadioCtx);
  return (
    <label className={`text-body-md ${styles.option}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={groupValue === value}
        onChange={() => onChange(value)}
        className={styles.radioInput}
      />
      {children}
    </label>
  );
}
