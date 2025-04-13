"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {getUserProfile, updateUserProfile, deleteUserAccount} from "./utils";

import styles from "./page.module.css"

export default function PerfilPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  //Esto se hace para tener un estado inicial vacío pero con las claves ya definidas.
  //Evita errores cuando el componente intenta renderizar campos antes de que se carguen los datos del backend.
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    address: "",
    municipality: "",
    locality: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    setToken(token);

    if (token) {
      getUserProfile(token).then((data) => {
        setUserData({
          username: data.username || "",
          email: data.email || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          birth_date: data.birth_date || "",
          address: data.address || "",
          municipality: data.municipality || "",
          locality: data.locality || "",
        });
      });
    } else {
      router.push("/inicio");
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Mi perfil</h2>
        <p><strong>Usuario:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Nombre:</strong> {userData.first_name}</p>
        <p><strong>Apellidos:</strong> {userData.last_name}</p>
        <p><strong>Fecha de nacimiento:</strong> {userData.birth_date}</p>
        <p><strong>Dirección:</strong> {userData.address}</p>
        <p><strong>Municipio:</strong> {userData.municipality}</p>
        <p><strong>Localidad:</strong> {userData.locality}</p>
      </main>
    </div>
  );
}