'use client';
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './styles.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, Badge, Space } from 'antd/lib';
import {AiOutlineShoppingCart, AiOutlineMenu} from 'react-icons/ai';

export default function Header() {
  return (
    <>
      <Head>
        <title>Morent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <header className={styles.header}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={styles.logo__container}>
                <Link href='/' className={styles.logo}>
                  <figure>
                    <Image src='/images/logo.svg' alt='Logo' fill />
                  </figure>
                  <h2>Morent</h2>
                </Link>

                <div className={styles.list__container}>
                  <ul>
                    <li>
                      <Link href='/'>Home</Link>
                    </li>
                    <li>
                      <Link href='/'>Electronics</Link>
                    </li>
                    <li>
                      <Link href='/'>Jewelery</Link>
                    </li>
                    <li>
                      <Link href='/'>Men's clothing</Link>
                    </li>
                    <li>
                      <Link href='/'>Women's clothing</Link>
                    </li>
                  </ul>

                  <Badge count={2} showZero>
                    <button>
                      <AiOutlineShoppingCart />
                    </button>
                  </Badge>

                  <button type='button' className={styles.btn__menu__mobile}>
                    <AiOutlineMenu />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
