import React from 'react';
import styles from './Home.module.scss';

// components
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">

                <div className={styles.catalog__text}>
                  <h3>Car Catalogue</h3>
                  <p>Explore out cars you might like</p>
                </div>

                <div className={styles.filters_container}>
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
