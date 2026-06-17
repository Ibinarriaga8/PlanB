import React from 'react';
import styles from './styles.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';


const SearchResults = ({ products }) => {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Search results</h2>
          <p>The search must have at least two characters</p>
          <button
            className={styles.createAuction}
            onClick={() => window.location.href = '/create_auction'}>
            Create Auction
          </button>
        </header>

        <main className={styles.main}>
          <div className={styles.searchResults}>
            {products.length > 0 ? (
              products.map((product, index) => (
                console.log(product),
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </main>
      </div>
    );
  };

export default SearchResults;
