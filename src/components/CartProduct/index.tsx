import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

import { ProductsProps } from '@/types';

// redux
import { useDispatch } from 'react-redux';
import { removeProductsToCart, increaseProductToCart, decreaseProductToCart } from '@/redux/cart/slice';

import {AiOutlineMinus, AiOutlinePlus, AiOutlineClose} from 'react-icons/ai';
import { formattedPriceInBRL } from '@/utils/formattedPriceInBRL';

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
            <button type='button' onClick={handleDecreaseProductToCart} data-testid='btn_descrease_product_to_cart'><AiOutlineMinus /></button>
            <span data-testid='product_quantity'>{product.quantity}</span>
            <button type='button' onClick={handleIncreaseProductToCart} data-testid='btn_increase_product_to_cart'><AiOutlinePlus /></button>
          </div>
        </div>
      </div>

      <div className={styles.total__value__per__product}>
        <button type='button' onClick={handleRemoveProductToCart} data-testid='btn_remove_product_to_cart'><AiOutlineClose /></button>
        <small data-testid='total_value'>{formattedPriceInBRL((product.price * 5) * Number(product.quantity))}</small>
      </div>

    </div>
  );
}
