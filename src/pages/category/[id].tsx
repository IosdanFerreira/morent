import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

// redux
import { useDispatch } from 'react-redux';

// types
import { ProductsProps } from '@/types';
import { addProductsToCart } from '@/redux/cart/slice';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/router';

export default function Category({productsData}: {productsData : ProductsProps[]}) {

  const router = useRouter();
  const nameCategory = router.query.id;

  return (
    <main>
      <section className={styles.section__single__product}>
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className={styles.category__title}>
                <h3>{nameCategory}</h3>
                <p>Explore our products and promotions</p>
              </div>

              {productsData && (
                <div className={styles.products__container}>
                  {productsData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  const res = await fetch(`https://fakestoreapi.com/products/category/${params.id}`);
  const productsData = await res.json();
  return { 
    props: { productsData },
  };
}
