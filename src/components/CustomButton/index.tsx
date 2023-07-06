import React from 'react';
import styles from './styles.module.scss';

interface ICustomButton {
    title: string
}

export default function CustomButton({title}: ICustomButton) {
  return (
    <button className={styles.custom__button}>{title}</button>
  );
}
