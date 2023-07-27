'use client';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Badge, Drawer } from 'antd/lib';

import { AiOutlineShoppingCart, AiOutlineArrowRight} from 'react-icons/ai';

// components
import CartProduct from '../CartProduct';

// redux
import { useSelector } from 'react-redux';
import { selectTotalValueInCart, selectProductsCountInCart } from '@/redux/cart/cart.selector';

// types
import { ProductsProps } from '@/types';

export default function CartDrawer() {

  const { products }: {products: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.cartReducer);

  const totalValueInCart = useSelector(selectTotalValueInCart);
  const formattedTotalValueInCart = totalValueInCart.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  const countProductsInCart = useSelector(selectProductsCountInCart);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Badge count={countProductsInCart} showZero>
        <AiOutlineShoppingCart  onClick={showDrawer} data-testid='btn_cart' className={styles.cart__button} />
      </Badge>

      {open && (
        <Drawer 
          title={`Shopping Bag (${countProductsInCart})`} 
          placement="right"
          closeIcon={
            <AiOutlineArrowRight onClick={onClose} data-testid="close-icon" />
          }
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            padding: 0
          }} 
          open={open}>

          {products?.length > 0 ? (
            <div className={styles.products__container}>
              {products?.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.products__container}>
              <p style={{marginTop: '10px'}}>No products in your cart</p>
            </div>
          )}

          <div className={styles.checkout__container}>
            <h5>Total: {formattedTotalValueInCart}</h5>

            <button type='button' data-testid="checkout_button">Checkout</button>
          </div>

        </Drawer>
      )}
    </>
  );
};