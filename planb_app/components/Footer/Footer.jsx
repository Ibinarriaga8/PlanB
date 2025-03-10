import React from "react";

import styles from "./styles.module.css";


// No recibe props; devuelve un footer estatico
const Footer = () => { 
    return (
        <footer className={styles.footer}> 
        <p>&copy; 2025 Subastas Plan B. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;


