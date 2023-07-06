import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

import CustomButton from '../CustomButton';

export default function Hero() {
  return (
    <section className={styles.hero__container}>
      <div className="container">
        <div className="row">
          <div className="col-12">

            <div className={styles.hero__content}>
              <div className={styles.hero__text__container}>
                <h1>AUTUMN SALE STYLISH <strong>WOMENS</strong></h1>

                <p>Check the news of the promotion</p>

                <CustomButton title='SEE MORE' />
              </div>

              <div className={styles.hero__img__container}>
                <figure >
                  <Image src='/images/woman_hero.png' fill alt='Hero image' />
                </figure>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
