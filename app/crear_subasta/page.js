"use client";

import { docreateAuction, fetchCategories } from "./utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import CategorySelect from "@/components/CategorySelect/CategorySelect";

export default function CreateAuction() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategory] = useState(null);



  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };

    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token-jwt"));
    }

    loadCategories();
  }, []);
  
  function getUserId(token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.target);
    const accessToken = localStorage.getItem("token-jwt");
    const userId = getUserId(accessToken);

    const auctionData = {
      title: formData.get("title"),
      description: formData.get("description"),
      closing_date: new Date(formData.get("closing_date")).toISOString(),
      thumbnail: formData.get("thumbnail"),
      price: formData.get("price"),
      stock: parseInt(formData.get("stock")),
      category: parseInt(categorySelect),
      brand: formData.get("brand"),
      auctioneer_id: userId,
    };

    const result = await docreateAuction(auctionData, token);


    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("✅ Subasta creada con éxito");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const handleCategoryChange = (selectedCategoryId) => {
    setCategory(selectedCategoryId);
  }; 

  if (!token) {
    return <p>Debes iniciar sesión para crear una subasta.</p>;
  }

  return (
    <div>
      <h2>Crear nueva subasta</h2>

      {error && (
        <div>
          {typeof error === "string" ? (
            <p>{error}</p>
          ) : (
            Object.entries(error).map(([field, messages]) => (
              <p key={field}>
                {field}: {messages.join(", ")}
              </p>
            ))
          )}
        </div>
      )}

      {success && <p>{success}</p>}

      <form onSubmit={handleOnSubmit} className={styles.form}>
        <input name="title" placeholder="Título" required />
        <textarea name="description" placeholder="Descripción" required />
        <label htmlFor="closing_date">Fecha de cierre:</label>
        <input type="datetime-local" name="closing_date" required />
        <input name="thumbnail" placeholder="URL de imagen" required />
        <input name="price" type="number" step="0.01" placeholder="Precio inicial" required />
        <input name="stock" type="number" placeholder="Stock" required />

        <label htmlFor="category">Categoría:</label>
        <CategorySelect categories={categories} onChange={handleCategoryChange} />

        <input name="brand" placeholder="Marca" required />
        <button type="submit">Crear subasta</button>
      </form>
    </div>
  );
}
