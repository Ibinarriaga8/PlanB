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
        <a href="/">
            <h2>Plan B Auctions</h2>
        </a>

        <Link href="/all_auctions" style={{ marginLeft: "20px" }}>
            All auctions
        </Link>

        <nav>
            <ul>
            <li>
                {token ? (
                <>
                    <ul>
                    <li><a href="/profile">My profile</a></li>
                    <li><a href="/my_auctions">My Auctions</a></li>
                    <li><a href="/my_bids">My Bids</a></li>
                    <li><a href="#" onClick={handleLogout}>Log Out</a></li>
                    </ul>
                </>
                ) : (
                <a href="/login">Log In</a>
                )}
            </li>
            </ul>
        </nav>
        </header>
    );
    };

    export default Header;
