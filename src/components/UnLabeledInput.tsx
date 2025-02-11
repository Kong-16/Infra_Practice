import React from 'react';
import styles from '../styles/input.module.css';

interface UnLabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const UnLabeledInput: React.FC<UnLabeledInputProps> = ({ ...props }) => {
  return <input className={`${styles['input-box']}`} {...props} />;
};

export default UnLabeledInput;
