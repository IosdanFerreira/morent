import React from 'react';
import styles from './styles.module.scss';

export default function GeralLoading() {
  return (
    <div className={styles.spinner__wrapper} data-testid='loader_container'>
      <span className="loader" data-testid='loader'></span>
    </div>
  );
}
