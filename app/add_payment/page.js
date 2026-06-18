"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import createWallet from "./utils";
import { useRouter } from "next/navigation";

export default function AddPaymentPage() {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token-jwt"));
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cardNumber = formData.get("cardNumber");
    setError("");

    try {
      await createWallet(token, cardNumber);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h3>Add payment method</h3>
        <p>Link a card to enable bidding and wallet deposits.</p>
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <input
            className={styles.cardnumber}
            name="cardNumber"
            type="text"
            placeholder="Card number"
          />
          <button type="submit" className={styles.submitButton}>Save card</button>
          {error && <p style={{ color: "var(--red)", fontSize: "0.875rem" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
