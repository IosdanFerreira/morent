'use client';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

// redux
import { useDispatch } from 'react-redux';

// types
import { ProductsProps } from '@/types';
import { addProductsToCart } from '@/redux/cart/slice';

export default function SingleProduct({productData}: {productData : ProductsProps}) {

  const dispatch = useDispatch();

  const handleAddProductToCart = () => {
    dispatch(addProductsToCart(productData));
  };

  const formattedPrice = (productData.price * 5).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  return (
    <main>

      <section className={styles.section__single__product}>
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className={styles.product__content}>
                <figure className={styles.product__img}>
                  <Image src={productData.image} fill alt={productData.title} /> 
                </figure>

                <div className={styles.product__text}>
                  <h4>{productData.title}</h4>

                  <h5>{formattedPrice}</h5>

                  <p>{productData?.description}</p>

                  <button type='button' onClick={handleAddProductToCart}>Add to cart</button>
                </div>
              </div>
              

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const productData = await res.json();
  return { 
    props: { productData },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const res = await fetch('https://fakestoreapi.com/products');
  const allProductData = await res.json();

  const paths = allProductData.map((product: ProductsProps) => {
    return {
      params: {
        id: `${product.id}`
      }
    };
  });

  return {paths, fallback: true};
}
