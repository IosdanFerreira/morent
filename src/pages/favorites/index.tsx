import React from 'react';
import styles from './styles.module.scss';

// redux
import { useSelector } from 'react-redux';

// types
import { ProductsProps } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function Favorites() {

  const { favoritesProducts }: {favoritesProducts: ProductsProps[]} = useSelector((rootReducer: any) => rootReducer.favoritesReducer);

  return (
    <main>
      <section className={styles.section__single__product}>
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className={styles.category__title}>
                <h3>Favorites</h3>
                <p>Your favorites products</p>
              </div>

              {favoritesProducts.length > 0 ? (
                <div className={styles.products__container}>
                  {favoritesProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className={styles.products__container}>
                  <p>No products here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
