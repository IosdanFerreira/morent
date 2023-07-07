'use client';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Badge, Drawer } from 'antd/lib';

import { AiOutlineShoppingCart, AiOutlineArrowRight} from 'react-icons/ai';

import CartProduct from '../CartProduct';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Badge count={2} showZero>
        <button onClick={showDrawer}>
          <AiOutlineShoppingCart />
        </button>
      </Badge>

      <Drawer 
        title="Shopping Bag (2)" 
        placement="right" 
        closeIcon={<AiOutlineArrowRight />}
        onClose={onClose} 
        open={open}>
        
        <CartProduct />

      </Drawer>
    </>
  );
};