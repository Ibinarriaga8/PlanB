// components/SearchBar/SearchBar.jsx
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Importa los estilos del módulo CSS
import ResultadoBusqueda from '@/components/ResultadoBusqueda/ResultadoBusqueda'; // Importa el componente ResultadoBusqueda

const SearchBar = ({ onFilteredProducts = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/docs/productos.json');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const items = data.item; // Accede a la propiedad 'item' del JSON

        if (Array.isArray(items)) {
          setProducts(items);
          setFilteredProducts(items); // Muestra todos los productos inicialmente
        } else {
          console.error('Fetched data is not an array:', items);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
    onFilteredProducts(filteredProducts);
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilteredProducts(filteredProducts);
    localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
    window.location.href = `/resultados_busqueda?searchTerm=${searchTerm}`;
  };

  return (
    <div className={styles['search-bar-container']}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar..."
        className={styles['search-bar']} // Aplica el estilo al input
      />
      <button
        className={styles['search-button']} // Aplica el estilo al botón
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;