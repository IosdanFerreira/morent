'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import styles from './styles.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {AiOutlineHeart} from 'react-icons/ai';
import {BiChevronLeft} from 'react-icons/bi';
import {HiMagnifyingGlass} from 'react-icons/hi2';

// redux
import {useSelector } from 'react-redux';

// components
import CartDrawer from '@/components/CartDrawer';
import MenuMobile from '@/components/MenuMobile';
import { Badge } from 'antd/lib';

// types
import { ProductsProps } from '@/types';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

interface SearchFormProps {
  search: string,
}

export default function Header() {

  const router = useRouter();

  const { favoritesProducts }: {favoritesProducts: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.favoritesReducer);

  
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const handleShowSearchMobile = () => {
    setShowSearchMobile(true);
  };

  const handleHiddenSearchMobile = () => {
    setShowSearchMobile(false);
  };

  const handleSubmit = (values: SearchFormProps, { resetForm }: FormikHelpers<SearchFormProps>) => {
    if (values.search !== '' && values.search !== null) {
      router.push(`/search/${values.search.replace(/[- ]+/g, '-')}`);
      resetForm();
    }
  };

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

                <Formik
                  initialValues={{search: ''}}
                  onSubmit={handleSubmit}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    resetForm
                  }) =>(
                    <form onSubmit={handleSubmit}>
                      <div className={styles.search__container}>
                        <input 
                          type="text" 
                          name="search" 
                          id="search" 
                          placeholder='What do you want?'
                          value={values.search}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <button><HiMagnifyingGlass /></button>
                      </div>
                    </form>
                  )}
                </Formik>

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

                  <button type='button' className={styles.btn__show__search__mobile} onClick={handleShowSearchMobile}><HiMagnifyingGlass /></button>

                  <MenuMobile />
                </div>
              </div>

              {showSearchMobile && (

                <div className={styles.search__mobile}>
                  <Formik
                    initialValues={{search: ''}}
                    onSubmit={handleSubmit}
                  >{({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      resetForm
                    }) =>(
                      <form onSubmit={handleSubmit}>
                        <div className={styles.search__mobile__container}>
                          <button type='button' onClick={handleHiddenSearchMobile}><BiChevronLeft /></button>
                          <input 
                            type="text" 
                            name="search" 
                            id="search" 
                            placeholder='What do you want?'
                            value={values.search}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <button type='button'><HiMagnifyingGlass /></button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              )}

            </div>
          </div>
        </div>
      </header>
    </>
  );
}
