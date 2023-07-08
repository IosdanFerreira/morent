import React from 'react';
import styles from './Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

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

                <div className={styles.grid__banners__container}>
                  <Link href='/'>
                    <figure>
                      <Image src='/images/banner-1.jpg' fill alt='banner-1' sizes="(max-width: 768px) 50vw" />
                    </figure>
                  </Link>

                  <Link href='/'>
                    <figure>
                      <Image src='/images/banner-4.jpg' fill alt='banner-4' sizes="(max-width: 768px) 50vw" />
                    </figure>
                  </Link>
                </div>

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

                <div className={styles.grid__banners__container}>
                  <Link href='/'>
                    <figure>
                      <Image src='/images/banner-2.jpg' fill alt='banner-2' sizes="(max-width: 768px) 50vw" />
                    </figure>
                  </Link>

                  <Link href='/'>
                    <figure>
                      <Image src='/images/banner-3.jpg' fill alt='banner-3' sizes="(max-width: 768px) 50vw" />
                    </figure>
                  </Link>
                </div>

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

export async function getStaticProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const productsData = await res.json();
  return { 
    props: { productsData },
    revalidate: 60
  };
}
