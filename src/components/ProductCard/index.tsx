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

import { formattedPriceInBRL } from '@/utils/formattedPriceInBRL';

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

  const handleAddProductToCart = () => {
    dispatch(addProductsToCart(product));
    openNotificationWithIcon();
  };

  const handleAddProductToFavorites = () => {
    dispatch(addProductsToFavorites(product));
  };


  return (
    <div className={styles.card__container}>
      <button type='button' className={styles.btn__add__to__Cart} onClick={handleAddProductToCart} data-testid='btn_add_to_Cart'><BsCartPlus /></button> 

      <button 
        type='button' 
        className={styles.btn__add__to__favorites} 
        onClick={handleAddProductToFavorites}
        style={{
          background: productInFavorites ? '#a9001e' : '#fff',
          color: productInFavorites ? '#fff' : '#a9001e'
        }}
        data-testid='btn_add_to_favorites'
      >
        <AiOutlineHeart />
      </button>

      <Link href={`/single-product/${product.id}`} data-testid='link_single_product'>

        <figure data-testid='image_container'>
          <Image src={product.image} fill alt={product.title} sizes="(max-width: 768px) 50vw" data-testid='product_image'/>
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

          <h6  data-testid='total_pice'>{formattedPriceInBRL(product.price * 5)}</h6>

        </div>
      </Link>
      {contextHolder}
    </div>
  );
}
