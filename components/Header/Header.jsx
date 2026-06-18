"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from "./styles.module.css";
import { doLogout } from "./utils";


const Header = () => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        // Access localStorage only on the client
        if (typeof window !== 'undefined') {
          setToken(localStorage.getItem("token-jwt"));
          setUserName(localStorage.getItem("userName"));
        }
    }, []);

    const handleLogout = async () => doLogout(setToken, setUserName, router);

    return (
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
              <h2>Plan <span>B</span></h2>
          </Link>

          <Link href="/all_auctions" className={styles.allAuctions}>
              All auctions
          </Link>

          <nav className={styles.nav}>
              <ul>
              <li>
                  {token ? (
                  <>
                      <ul>
                      <li><a href="/profile">My profile</a></li>
                      <li><a href="/my_auctions">My Auctions</a></li>
                      <li><a href="/my_bids">My Bids</a></li>
                      <li>
                        <a href="#" onClick={handleLogout} className={styles.logoutLink}>
                          Log Out
                        </a>
                      </li>
                      </ul>
                  </>
                  ) : (
                  <a href="/login" className={styles.loginBtn}>Log In</a>
                  )}
              </li>
              </ul>
          </nav>
        </header>
    );
};

export default Header;
