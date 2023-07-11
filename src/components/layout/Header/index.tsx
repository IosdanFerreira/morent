'use client';
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from './styles.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {AiOutlineHeart} from 'react-icons/ai';

// redux
import {useSelector } from 'react-redux';

// components
import CartDrawer from '@/components/CartDrawer';
import MenuMobile from '@/components/MenuMobile';
import { Badge } from 'antd/lib';

// types
import { ProductsProps } from '@/types';

export default function Header() {

  const { favoritesProducts }: {favoritesProducts: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.favoritesReducer);


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
                      <Link href='/category/electronics'>Electronics</Link>
                    </li>
                    <li>
                      <Link href='/category/jewelery'>Jewelery</Link>
                    </li>
                    <li>
                      <Link href="/category/men's%20clothing">Men's clothing</Link>
                    </li>
                    <li>
                      <Link href="/category/women's%20clothing">Women's clothing</Link>
                    </li>
                  </ul>

                  <CartDrawer />

                  <Badge count={favoritesProducts.length} showZero>
                    <Link href='/favorites' className={styles.link__favorites}><AiOutlineHeart /></Link>
                  </Badge>

                  <MenuMobile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
