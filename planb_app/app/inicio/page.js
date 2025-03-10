"use client";

import styles from "./page.module.css";

export default function Home() {

return (
  <div className={styles.page}>
    <main className={styles.main}>
        <h2>Inicio sesión</h2>

        <form method="post">
                    <input type="text" name="user" placeholder="Usuario" required />
                    <input type="password" name="password" placeholder="Contraseña" required />
                    <input type="submit" value="Iniciar Sesión" />
        </form>
        <a href="/crear_usuario">¿No tienes cuenta? Crear Usuario</a>
    </main>
  </div>
);
};