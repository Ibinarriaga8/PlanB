import React from "react";

import styles from "./styles.module.css";
import Searchbar from "@/components/SearchBar/SearchBar"

const Header = () => {  
    return (
        <header className={styles.header}>
            <h1>Subastas Plan B</h1>

            <Searchbar></Searchbar>

            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/inicio">Inicio Sesion</a></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;