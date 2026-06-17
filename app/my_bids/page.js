"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getUserBids } from "./utils";

export default function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem("token-jwt");
        const data = await getUserBids(token);
        setBids(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>My Bids</h2>
        {loading ? (
          <p>Loading bids...</p>
        ) : bids.length === 0 ? (
          <p>You have not placed any bids.</p>
        ) : (
          <ul className={styles.bidList}>
            {bids.map((bid) => (
              <li key={bid.id} className={styles.bidItem}>
                <strong>Auction:</strong> {bid.auction_title} <br />
                <strong>Amount:</strong> {bid.amount}€ <br />
                <strong>Date:</strong> {new Date(bid.creation_date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
