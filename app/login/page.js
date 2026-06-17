"use client";

import styles from "./page.module.css";

import { doLogin } from "./utils";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const username = formData.get("username");
      const password = formData.get("password");

      setLoading(true); // Change state to "loading"
      try {
          const userLogged = await doLogin(username, password);

          if (userLogged.error) {
              alert(userLogged.error);
              return;
          }

          // Save data to localStorage
          localStorage.setItem("token-jwt", userLogged.access);
          localStorage.setItem("userName", userLogged.username);

          // Redirect to main menu
          router.push("/");
      } catch (error) {
          alert("Something went wrong: " + error.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Log in</h2>

        <form onSubmit={handleOnSubmit}>
          <input type="text" name="username" placeholder="Username" required/>
          <input type="password" name="password" placeholder="Password" required/>
          <button type="submit">Log In</button>
        </form>

        <a href="/create_user">Don&apos;t have an account? Create User</a>
      </main>
    </div>
  );
};
