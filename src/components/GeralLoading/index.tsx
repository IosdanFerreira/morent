import React from 'react';
import styles from './styles.module.scss';

export default function GeralLoading() {
  return (
    <div className={styles.spinner__wrapper}>
      <span className="loader"></span>
    </div>
  );
}
