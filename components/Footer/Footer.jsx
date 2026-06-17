import React from "react";

import styles from "./styles.module.css";


// Receives no props; returns a static footer
const Footer = () => {
    return (
        <footer className={styles.footer}>
        <p>&copy; 2025 Plan B Auctions. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
