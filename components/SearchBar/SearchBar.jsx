'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { fetchCategories, fetchProducts } from './utils';
import CategoryFilter from "@/components/CategoryFilter/CategoryFilter";
import IsOpen from "@/components/IsOpen/IsOpen";
import OrderFilter from '../OrderFilter/OrderFilter';

const SearchBar = ({ setFetchedProducts }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (selectedCategoryId) => {
    setCategory(selectedCategoryId);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchTerm = formData.get("search");

    const products = await fetchProducts(category, searchTerm, open, order);
    setFetchedProducts(products);
  };

  const handleOpenChange = (selectedOpen) => {
    setOpen(selectedOpen)
  }

  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder)
  }

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className={styles.searchBar}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
      <CategoryFilter categories={categories} onChange={handleCategoryChange} />
      <IsOpen onChange= {handleOpenChange}></IsOpen>
      <OrderFilter onChange={handleOrderChange}></OrderFilter>

    </div>
  );
};

export default SearchBar;
