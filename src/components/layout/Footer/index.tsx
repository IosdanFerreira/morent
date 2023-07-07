import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import {AiOutlineCopyright} from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p className={styles.copy__text}><AiOutlineCopyright /> Morent 2023 | All Rights Reserved | By Iosdan Ferreira</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
