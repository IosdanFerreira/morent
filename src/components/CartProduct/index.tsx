import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

import { ProductsProps } from '@/types';

interface ICartProduct {
    product?: ProductsProps
}

export default function CartProduct({product}: ICartProduct) {
  return (
    <div className={styles.product__container}>
      <div className={styles.product__info}>
        {/* <figure>
          <Image src={product.image} fill alt={product.title}/>
        </figure> */}
        <p>product</p>
      </div>
    </div>
  );
}
