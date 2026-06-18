"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <Image
        src="/car.webp"
        alt="Luxury car auction"
        fill
        className={styles.heroImage}
        priority
      />
      <div className={styles.heroOverlay}>
        <h1>Plan <span>B</span> Auctions</h1>
        <p>Discover, bid and win premium vehicles at competitive prices.</p>
        <Link href="/all_auctions" className={styles.heroBtn}>
          Browse auctions →
        </Link>
      </div>
    </section>
  );
}
