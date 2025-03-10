'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResultadoBusqueda from '@/components/ResultadoBusqueda/ResultadoBusqueda'; // Importa el componente ResultadoBusqueda


const ResultadosBusqueda = () => {

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const storedFilteredProducts = localStorage.getItem('filteredProducts');
    if (storedFilteredProducts) {
      setFilteredProducts(JSON.parse(storedFilteredProducts));
    }

  }, [searchTerm]);

  return (
    <div>
      <h1>Resultados de la búsqueda</h1>
      
      <ResultadoBusqueda products={filteredProducts} /> {/* Muestra los resultados de la búsqueda */}
    </div>
  );
};


export default ResultadosBusqueda;
