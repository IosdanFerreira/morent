import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

import { ProductsProps } from '@/types';

// redux
import { useDispatch } from 'react-redux';
import { removeProductsToCart, increaseProductToCart, decreaseProductToCart } from '@/redux/cart/slice';

import {AiOutlineMinus, AiOutlinePlus, AiOutlineClose} from 'react-icons/ai';

interface ICartProduct {
    product: ProductsProps
}

export default function CartProduct({product}: ICartProduct) {

  const dispatch = useDispatch();

  const handleRemoveProductToCart = () => {
    dispatch(removeProductsToCart(product));
  };

  const handleIncreaseProductToCart = () => {
    dispatch(increaseProductToCart(product));
  };

  const handleDecreaseProductToCart = () => {
    dispatch(decreaseProductToCart(product));
  };

  const totalPerProduct = (product.price * 5) * Number(product.quantity);

  const formattedTotalPerProduct = totalPerProduct.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.product__container}>
      <div className={styles.product__info}>
        <figure>
          <Image src={product.image} fill alt={product.title} sizes="(max-width: 768px) 50vw"/>
        </figure>

        <div className={styles.product__text__container}>
          {product.title.length > 20 ? (

            <p>{product.title.substring(0,20) + '...'}</p>
          ) : (
            <p>{product.title}</p> 
          )}

          <div className={styles.count__controler}>
            <button type='button' onClick={handleDecreaseProductToCart}><AiOutlineMinus /></button>
            <span>{product.quantity}</span>
            <button type='button' onClick={handleIncreaseProductToCart}><AiOutlinePlus /></button>
          </div>
        </div>
      </div>

      <div className={styles.total__value__per__product}>
        <button type='button' onClick={handleRemoveProductToCart}><AiOutlineClose /></button>
        <small>{formattedTotalPerProduct}</small>
      </div>

    </div>
  );
}
