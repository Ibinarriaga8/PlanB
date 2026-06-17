"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCategories, doEditAuction, createCategories } from "./utils";
import styles from "./page.module.css";
import CategorySelect from "@/components/CategorySelect/CategorySelect";

export default function EditAuctionPage() {
  const router = useRouter();
  const { id } = useParams();

  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newcategory, setNewCategory] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token-jwt"));
    }
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };

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
    const userId = getUserId(token);

    let finalCategoryId = null;

    if (categorySelect === "new") {
      if (!newcategory) {
        setError("Please enter the name of the new category");
        return;
      }

      try {
        const created = await createCategories(newcategory, token);
        finalCategoryId = created.id;
        setCategories([...categories, created]); // optional: update local list
      } catch (err) {
        setError(err.message);
        return;
      }
    } else {
      finalCategoryId = parseInt(categorySelect);
    }


    // const auctionData = {
    //   title: formData.get("title"),
    //   description: formData.get("description"),
    //   closing_date: new Date(formData.get("closing_date")).toISOString(),
    //   thumbnail: formData.get("thumbnail"),
    //   price: formData.get("price"),
    //   stock: parseInt(formData.get("stock")),
    //   category: finalCategoryId,
    //   brand: formData.get("brand"),
    //   auctioneer_id: userId,

    // };
    formData.set("closing_date", new Date(formData.get("closing_date")).toISOString());
    formData.set("category", finalCategoryId);


    //const result = await doEditAuction(id, auctionData, token);
    const result = await doEditAuction(id, formData, token);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("✅ Auction updated successfully");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  if (!token) return <p>You must log in to edit an auction.</p>;

  return (
    <div>
      <h2>Edit auction #{id}</h2>

      {error && (
        <div>
          {typeof error === "string" ? (
            <p>{error}</p>
          ) : (
            Object.entries(error).map(([field, messages]) => (
              <p key={field}>
                {field}: {
                  Array.isArray(messages)
                    ? messages.join(", ")
                    : typeof messages === "object"
                      ? JSON.stringify(messages)
                      : messages
                }
              </p>
            ))
          )}
        </div>
      )}

      {success && <p>{success}</p>}

      <form onSubmit={handleOnSubmit} className={styles.form}>
        <input name="title" placeholder="Title" required />
        <textarea name="description" placeholder="Description" required />
        <label htmlFor="closing_date">Closing date:</label>
        <input type="datetime-local" name="closing_date" required />
        <input type="file" name="image" accept="image/*" required placeholder="Image"/>
        <input name="price" type="number" step="0.01" placeholder="Starting price" required />
        <input name="stock" type="number" placeholder="Stock" required />

        <label htmlFor="category">Category:</label>
        <CategorySelect categories={categories} category={categorySelect} setCategory={setCategory} newCategory={newcategory} setNewCategory={setNewCategory}/>

        <input name="brand" placeholder="Brand" required />
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
