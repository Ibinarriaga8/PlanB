'use client'
import { useEffect, useState, Suspense } from "react";
import { fetchAllAuctions } from './utils';
import ResultadoBusqueda from "@/components/ResultadoBusqueda/ResultadoBusqueda";
import SearchBar from "@/components/SearchBar/SearchBar";

const ResultadosBusqueda = () => {
  const [products, setProducts] = useState([]);
  const [cleanProducts, setCleanProducts] = useState([])


  useEffect(() => {
    const fetchProducts = async () => {
      const initialProducts = await fetchAllAuctions();
      setProducts(initialProducts);
      setCleanProducts(initialProducts);

    };
    fetchProducts();
  }, []);

  const onChange = (e) =>{
    e.preventDefault();
    const lastCall = e.target.value;
    console.log(lastCall);

    if (lastCall==="true"){
      console.log(products);
      setProducts(products.filter(product => product.last_call === true));
    }
    else{
      setProducts(cleanProducts);
    }
    
  }

  return (
    <div>
      
      <SearchBar setFetchedProducts={setProducts} />
        <p>LAs VERDES SON DE LAST CALL = FALSE, LAS ROJAS LAST CALL = TRUE</p> 
        <select name="lastCall" required onChange={onChange}>
          <option value="">Filtrar por lastCall</option>
          <option value={true}>Last Call</option>
          <option value={false}>No Last Call</option>
        </select>
      <Suspense fallback={<div>No hay subastas</div>}>
        <ResultadoBusqueda products={products} />
      </Suspense>
    </div>
  );
};

export default ResultadosBusqueda;
