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
          <div className="col-lg-3">
            <Link href='/'>
              <figure className={styles.logo}>
                <Image src='/images/logo.svg' alt='Logo' fill />
              </figure>
            </Link>

            <p>CarHub 2023 | All Rights Reserved <AiOutlineCopyright /> </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className={styles.footer__list}>
              <h6>About</h6>

              <ul>
                <li>
                  <Link href='/'>How it works</Link>
                </li>
                <li>
                  <Link href='/'>Featured</Link>
                </li>
                <li>
                  <Link href='/'>Partnership</Link>
                </li>
                <li>
                  <Link href='/'>Business Relation</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className={styles.footer__list}>
              <h6>Company</h6>

              <ul>
                <li>
                  <Link href='/'>Events</Link>
                </li>
                <li>
                  <Link href='/'>Blog</Link>
                </li>
                <li>
                  <Link href='/'>Podcast</Link>
                </li>
                <li>
                  <Link href='/'>Invite a friend</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className={styles.footer__list}>
              <h6>Social</h6>

              <ul>
                <li>
                  <Link href='/'>Discord</Link>
                </li>
                <li>
                  <Link href='/'>Instagram</Link>
                </li>
                <li>
                  <Link href='/'>Twitter</Link>
                </li>
                <li>
                  <Link href='/'>Facebook</Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <p className={styles.copy__text}><AiOutlineCopyright /> CarHub 2023 | All Rights Reserved</p>
    </footer>
  );
}
