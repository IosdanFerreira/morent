'use client';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import {BsCartPlus} from 'react-icons/bs';

// types
import { ProductsProps } from '@/types';
import { Rate } from 'antd/lib';

interface IProductCard {
    product: ProductsProps
}

export default function ProductCard({product}: IProductCard) {

  const formattedPrice = (price: number) => {
    const priceFormatted = price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return priceFormatted;
  };

  return (
    <div className={styles.card__container}>
      <button type='button' className={styles.btn__add__to__Cart}><BsCartPlus /></button>
      <Link href='/'>

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
    </div>
  );
}
