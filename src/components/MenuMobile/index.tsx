/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import styles from './styles.module.scss';

import { Drawer } from 'antd/lib';

import { AiOutlineArrowRight, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';

export default function MenuMobile() {
  
  const [open, setOpen] = useState(false);
  
  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <button type='button' className={styles.btn__menu__mobile} onClick={showDrawer}>
        <AiOutlineMenu />
      </button>
  
      <Drawer 
        title={'Menu'} 
        placement="right"
        closeIcon={<AiOutlineArrowRight />}
        onClose={onClose} 
        open={open}>
  
        <ul className={styles.menu__list}>
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
  
      </Drawer>
    </>
  );
}
