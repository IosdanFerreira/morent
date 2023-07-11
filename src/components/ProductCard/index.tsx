'use client';
import React, {MouseEventHandler } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import {BsCartPlus} from 'react-icons/bs';

// antd
import { notification } from 'antd/lib';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addProductsToCart } from '@/redux/cart/slice';
import { addProductsToFavorites } from '@/redux/favorites/slice';

// types
import { ProductsProps } from '@/types';
import { Rate } from 'antd/lib';
import { AnyAction } from 'redux';
import { AiOutlineHeart } from 'react-icons/ai';

interface IProductCard {
    product: ProductsProps
}

export default function ProductCard({product}: IProductCard) {

  const { favoritesProducts }: {favoritesProducts: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.favoritesReducer);

  const productInFavorites = favoritesProducts.find((productFavorite: ProductsProps) => productFavorite.id === product.id);

  const dispatch = useDispatch();

  // Message notification add product to cart
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.success({
      placement: 'bottomLeft',
      duration: 2,
      message: 'Product added to cart!',
      description: '',
    });
  };

  const formattedPrice = (price: number) => {
    const priceFormatted = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return priceFormatted;
  };

  const handleAddProductToCart = () => {
    dispatch(addProductsToCart(product));
    openNotificationWithIcon();
  };

  const handleAddProductToFavorites = () => {
    dispatch(addProductsToFavorites(product));
  };


  return (
    <div className={styles.card__container}>
      <button type='button' className={styles.btn__add__to__Cart} onClick={handleAddProductToCart}><BsCartPlus /></button> 

      <button 
        type='button' 
        className={styles.btn__add__to__favorites} 
        onClick={handleAddProductToFavorites}
        style={{
          background: productInFavorites ? '#a9001e' : 'transparent',
          color: productInFavorites ? '#fff' : '#a9001e'
        }}>
        <AiOutlineHeart />
      </button>

      <Link href={`/single-product/${product.id}`}>

        <figure>
          <Image src={product.image} fill alt={product.title} sizes="(max-width: 768px) 50vw"/>
        </figure>

        <div className={styles.product__text}>
          <div>
            <small>{product.category}</small>
            {product.title.length > 27 ? (

              <p>{product.title.substring(0,27) + '...'}</p>
            ) : (
              <p>{product.title}</p> 
            )}

            <Rate disabled defaultValue={product.rating.rate} />
          </div>

          <h6>{formattedPrice(product.price * 5)}</h6>

        </div>
      </Link>
      {contextHolder}
    </div>
  );
}
