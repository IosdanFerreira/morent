import React from 'react';
import styles from './Home.module.scss';

// components
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';

// types
import { ProductsProps } from '@/types';

export default function Home({productsData}: {productsData: ProductsProps[]}) {

  return (
    <>
      <main>
        <Hero />
        
        <section className={styles.section__products}>
          <div className="container">
            <div className="row">
              <div className="col-12">

                <div className={styles.catalog__text}>
                  <h3>Best Sellers</h3>
                  <p>Explore our products and promotions</p>
                </div>

                {productsData && (
                  <div className={styles.products__container}>
                    {productsData.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                <div className={styles.catalog__text}>
                  <h3>Electronics</h3>
                  <p>Check out our electronics session products</p>
                </div>

                {productsData && (
                  <div className={styles.products__container}>
                    {productsData.map((product) => {
                      if (product.category === 'electronics') {
                        return <ProductCard key={product.id} product={product} />;
                      }
                      return null;
                    })}
                  </div>
                )}

                <div className={styles.catalog__text}>
                  <h3>Jewelery</h3>
                  <p>Check out our jewelery session products</p>
                </div>

                {productsData && (
                  <div className={styles.products__container}>
                    {productsData.map((product) => {
                      if (product.category === 'jewelery') {
                        return <ProductCard key={product.id} product={product} />;
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const productsData = await res.json();
  return { props: 
    { productsData } 
  };
}
