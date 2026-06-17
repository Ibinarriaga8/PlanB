"use client";

import { useEffect, useState } from "react";
import { getUserAuctions } from "./utils";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function MyAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAuctions() {
      try {
        const data = await getUserAuctions();
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAuctions();
  }, []);

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <h2>My Auctions</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {auctions.length > 0 ? (
              auctions.map((auction) => (
                <div key={auction.id} className={styles.layout}>
                  <li>My auction: {auction.title}</li>
                  <button onClick={() => router.push(`/detail/${auction.id}`)}>View my auction</button>
                </div>
              ))
            ) : (
              <p>You have no auctions created.</p>
            )}
          </ul>
        )}
      </main>
    </div>
  );
}
