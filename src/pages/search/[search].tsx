import React from 'react';
import styles from './styles.module.scss';

// types
import { ProductsProps } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useRouter } from 'next/router';

export default function Search({searchResult}: {searchResult: ProductsProps[]}) {

  const router = useRouter();
  const searchQuery = router?.query?.search?.toString().toLowerCase();

  function formattedQueryRegex(text: string) {
    const regexAcents = /[\u0300-\u036f]/g;
    const regexEspecialCaracteres = /[^a-zA-Z0-9]/g;
  
    // Remove acentos
    const noAccentsText = text?.normalize('NFD').replace(regexAcents, '');
  
    // Remove traços e caracteres especiais
    const completedFormattedText = noAccentsText?.replace(regexEspecialCaracteres, '');
  
    return completedFormattedText;
  }

  const searchProduct = searchResult?.filter((product) => {
    if (
      product.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ +/g, '-')
        .includes(
          formattedQueryRegex(searchQuery ? searchQuery : '')
        )
    ) {
      return true;
    }
  });

  return (
    <main>
      <section className={styles.section__search}>
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className={styles.category__title}>
                <h6>Here are the results of your search</h6>
              </div>

              {searchProduct.length > 0 ? (
                <div className={styles.products__container}>
                  {searchProduct.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p>No results</p>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products');
  const searchResult = await res.json();
  return { 
    props: { searchResult }
  };
}