import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

// redux
import { useDispatch, useSelector } from 'react-redux';

// types
import { ProductsProps } from '@/types';
import { addProductsToCart } from '@/redux/cart/slice';
import { addProductsToFavorites } from '@/redux/favorites/slice';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function SingleProduct({productData}: {productData : ProductsProps}) {

  const dispatch = useDispatch();

  const handleAddProductToCart = () => {
    dispatch(addProductsToCart(productData));
  };
  const handleAddProductToFavorites = () => {
    dispatch(addProductsToFavorites(productData));
  };

  const formattedPrice = (productData.price * 5).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  const { favoritesProducts }: {favoritesProducts: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.favoritesReducer);
  const productInFavorites = favoritesProducts.find((productFavorite: ProductsProps) => productFavorite.id === productData.id);
  
  const { products }: {products: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.cartReducer);
  const productInCart = products.find((productCart: ProductsProps) => productCart.id === productData.id);

  return (
    <main>

      <section className={styles.section__single__product}>
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className={styles.product__content}>
                <figure className={styles.product__img}>
                  <Image src={productData.image} fill alt={productData.title} />
                  <button 
                    type='button' 
                    className={styles.btn__add__to__favorites} 
                    onClick={handleAddProductToFavorites}>
                    {!productInFavorites ? (
                      <AiOutlineHeart />
                    ):( 
                      <AiFillHeart />
                    )}
                  </button>
                </figure>

                <div className={styles.product__text}>
                  <h4>{productData.title}</h4>

                  <h5>{formattedPrice}</h5>

                  <p>{productData?.description}</p>

                  <button type='button' onClick={handleAddProductToCart}>Add to cart {Number(productInCart?.quantity) > 0 ? `(${productInCart?.quantity})` : ''}</button>

                  <button type='button' onClick={handleAddProductToFavorites}>{productInFavorites ? 'Remove to favorites' : 'Add to favorites'}</button>
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
