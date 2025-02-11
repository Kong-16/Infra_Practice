import React from 'react';
import styles from '../styles/input.module.css'


interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, ...props }) => {
  return (
    <div>
      <div className="label-container">
        {label && <div className={`${styles['input-label']}`}>{label}</div>}
      </div>
      <input className={`${styles['input-box']}`} {...props} />
    </div>
  );
};

export default LabeledInput;
