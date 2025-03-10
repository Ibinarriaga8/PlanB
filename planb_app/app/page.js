"use client";

import { useRef } from "react";
import Image from 'next/image';
import styles from "./page.module.css";

export default function Home() {

return (
  <div className={styles.page}>
    <main className={styles.main}>
      <Image src="/car.webp" alt="Car" width={500} height={300} />
    </main>
  </div>
);
};

