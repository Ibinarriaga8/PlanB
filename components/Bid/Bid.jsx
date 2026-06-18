"use client";

import { useState } from "react";
import { createBid } from "./utils";
import styles from "./styles.module.css";

const Bid = ({ auctionId }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token-jwt");
    if (!token) {
      setError("You must be authenticated to place a bid.");
      return;
    }

    try {
      await createBid(auctionId, amount, token);
      setMessage("Bid placed successfully!");
      setAmount("");
      setError(null);
    } catch (err) {
      setError(err.message);
      setMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.bidForm}>
      <input
        type="number"
        step="0.01"
        placeholder="Enter your bid (€)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit" className={styles.bidBtn}>Bid</button>
      {message && <p style={{ color: "var(--green)", fontSize: "0.875rem" }}>{message}</p>}
      {error   && <p style={{ color: "var(--red)",   fontSize: "0.875rem" }}>{error}</p>}
    </form>
  );
};

export default Bid;
