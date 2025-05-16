import React from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS
import ProductCard from '@/components/ProductCard/ProductCard'; // Importa el componente ProductCard


const ResultadoBusqueda = ({ products }) => {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Resultados de la búsqueda</h2>
          <p>La búsqueda debe tener al menos dos carácteres</p>
          <button
            className={styles.crear_subasta}
            onClick={() => window.location.href = '/crear_subasta'}>
            Crear Subasta
          </button>
        </header>
      
        <main className={styles.main}>
          <div className={styles.resultados_busqueda}>
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p>No hay subastas</p>
            )}
          </div>
        </main>
      </div>
    );
  };

export default ResultadoBusqueda;
