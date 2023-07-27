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
      <button type='button' className={styles.btn__menu__mobile} onClick={showDrawer} data-testid='btn_open_menu'>
        <AiOutlineMenu />
      </button>
  
      {open && (
        <Drawer 
          title={'Menu'} 
          placement="right"
          closeIcon={
            <AiOutlineArrowRight onClick={onClose} data-testid="close-icon" />
          }
          open={open}>
  
          <ul className={styles.menu__list}>
            <li onClick={onClose} data-testid='li_link_list'>
              <Link href='/'>Home</Link>
            </li>
            <li onClick={onClose} data-testid='li_link_list'>
              <Link href='/category/electronics'>Electronics</Link>
            </li>
            <li onClick={onClose} data-testid='li_link_list'>
              <Link href='/category/jewelery'>Jewelery</Link>
            </li>
            <li onClick={onClose} data-testid='li_link_list'>
              <Link href="/category/men's%20clothing">Men's Clothing</Link>
            </li>
            <li onClick={onClose} data-testid='li_link_list'>
              <Link href="/category/women's%20clothing">Women's Clothing</Link>
            </li>
          </ul>
  
        </Drawer>
      )}
    </>
  );
}
