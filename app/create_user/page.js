"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { registerUser } from './utils';
import { useRouter } from "next/navigation";

export default function Register() {
  const regions = {
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
  const [provinces, setProvinces] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === 'municipality') {
      setProvinces(regions[e.target.value] || []);
      setFormData(prev => ({ ...prev, locality: '' }));
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
      municipality: formData.municipality,
      locality: formData.locality,
    };

    const response = await registerUser(requestData);

    if (response && response.user) {
      setSuccessMessage("User created successfully!");
      resetForm();
      router.push("/login")
    } else if (response && response.errors) {
      setError("There was an error during registration. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({});
    setProvinces([]);
    document.getElementById("UserForm").reset();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Create user</h2>
        <form id="UserForm" onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="name" placeholder="First name" onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Last name" onChange={handleChange} required />
          <label htmlFor="birthdate">Date of Birth:</label>
          <input type="date" id="birthdate" name="birthdate" onChange={handleChange} required />

          <select id="municipality" name="municipality" onChange={handleChange} required>
            <option value="">Select a region</option>
            {Object.keys(regions).map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>

          <select id="locality" name="locality" onChange={handleChange} required>
            <option value="">Select a province</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>{province}</option>
            ))}
          </select>

          <button type="submit">Create User</button>
          <button type="button" onClick={resetForm}>Clear form</button>
        </form>
      </main>
    </div>
  );
};
