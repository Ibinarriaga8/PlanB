'use client'
import { useEffect, useState, Suspense } from "react";
import { fetchAllAuctions } from './utils';
import SearchResults from "@/components/SearchResults/SearchResults";
import SearchBar from "@/components/SearchBar/SearchBar";

const AllAuctionsPage = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const initialProducts = await fetchAllAuctions();
      setProducts(initialProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div>

      <SearchBar setFetchedProducts={setProducts} />
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchResults products={products} />
      </Suspense>
    </div>
  );
};

export default AllAuctionsPage;
