"use client";

import styles from "./page.module.css";
import { useState } from 'react';

const registerUser = async (userData) => {
  try {
    const response = await fetch("https://das-p2-backend.onrender.com/api/users/register/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }

    const createdUser = await response.json();
    console.log(createdUser);

    return createdUser;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return null;
  }
};


export default function Home() {
  const comunidades = {
    "Madrid": ["Madrid", "Alcalá de Henares", "Leganés", "Getafe"],
    "Cataluña": ["Barcelona", "Girona", "Tarragona", "Lleida"],
    "Andalucía": ["Sevilla", "Málaga", "Granada", "Córdoba"],
    "Valencia": ["Valencia", "Alicante", "Castellón"],
    "País Vasco": ["Bilbao", "San Sebastián", "Vitoria"],
    "Galicia": ["Santiago de Compostela", "A Coruña", "Vigo", "Lugo"],
    "Castilla y León": ["Valladolid", "León", "Salamanca", "Burgos"],
    "Castilla-La Mancha": ["Toledo", "Ciudad Real", "Cuenca", "Albacete"],
    "Extremadura": ["Mérida", "Cáceres", "Badajoz"],
    "Aragón": ["Zaragoza", "Huesca", "Teruel"],
    "Asturias": ["Oviedo", "Gijón", "Avilés"],
    "Cantabria": ["Santander"],
    "Murcia": ["Murcia"],
    "Navarra": ["Pamplona"],
    "La Rioja": ["Logroño"],
    "Baleares": ["Palma", "Ibiza", "Mahón"],
    "Canarias": ["Las Palmas", "Tenerife", "Santa Cruz de Tenerife"],
    "Ceuta y Melilla": ["Ceuta", "Melilla"]
  };

  const [formData, setFormData] = useState({});
  const [provincias, setProvincias] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'comunidad') {
      setProvincias(comunidades[e.target.value] || []);
      setFormData(prev => ({ ...prev, provincia: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username: formData.user,
      email: formData.email,
      password: formData.password,
      first_name: formData.name,
      last_name: formData.lastname,
      birth_date: formData.birthdate,
      locality: formData.adress,
      municipality: formData.provincia,
    };

    await registerUser(requestData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({});
    setProvincias([]);
    document.getElementById("UserForm").reset();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Crear usuario</h2>
        <form id="UserForm" onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="Usuario" onChange={handleChange} required />
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Apellidos" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />

          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input type="date" id="birthdate" name="birthdate" onChange={handleChange} required />

          <input type="text" name="adress" placeholder="Dirección" onChange={handleChange} required />

          <select id="comunidad" name="comunidad" onChange={handleChange} required>
            <option value="">Selecciona una comunidad</option>
            {Object.keys(comunidades).map((com, index) => (
              <option key={index} value={com}>{com}</option>
            ))}
          </select>

          <select id="provincia" name="provincia" onChange={handleChange} required>
            <option value="">Selecciona una provincia</option>
            {provincias.map((provincia, index) => (
              <option key={index} value={provincia}>{provincia}</option>
            ))}
          </select>

          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
          <input type="password" name="password2" placeholder="Repetir Contraseña" onChange={handleChange} required />

          <button type="submit">Crear Usuario</button>
          <button type="button" onClick={resetForm}>Limpiar formulario</button>
        </form>
        <a href="/pagina_inicio_sesion">Volver a inicio sesión</a>
      </main>
    </div>
  );
};
