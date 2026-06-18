"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, changeUserPassword, getMyWallet, deposit, withdraw } from "./utils";
import styles from "./page.module.css";

export default function ProfilePage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    username: "", email: "", birth_date: "",
    municipality: "", locality: "", first_name: "", last_name: "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [userWallet, setUserWallet] = useState(null);
  const [walletError, setWalletError] = useState("");
  const [walletSuccess, setWalletSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    setToken(token);

    const getUserWallet = async (token) => {
      const wallet = await getMyWallet(token);
      setUserWallet(wallet);
    };

    if (token) {
      getUserProfile(token).then((data) => {
        setUserData({
          username: data.username || "",
          email: data.email || "",
          birth_date: data.birth_date || "",
          municipality: data.municipality || "",
          locality: data.locality || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
        });
      });
      getUserWallet(token);
    } else {
      router.push("/login");
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    try {
      const result = await changeUserPassword(token, oldPassword, newPassword);
      setPasswordSuccess(result.detail);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err.message || "Error changing password.");
    }
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = formData.get("amount");
    const result = await deposit(token, amount);
    const wallet = await getMyWallet(token);
    setUserWallet(wallet);
    if (result.error) setWalletError(result.error);
    else { setWalletSuccess("Deposit made successfully."); setWalletError(""); }
  };

  const handleWithdrawal = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const amount = formData.get("amount");
    const result = await withdraw(token, amount);
    const wallet = await getMyWallet(token);
    setUserWallet(wallet);
    if (result.error) setWalletError(result.error);
    else { setWalletSuccess("Withdrawal made successfully."); setWalletError(""); }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>My profile</h2>

        {/* Profile info */}
        <div className={styles.infoCard}>
          <p><strong>Username</strong> {userData.username}</p>
          <p><strong>Email</strong> {userData.email}</p>
          <p><strong>First name</strong> {userData.first_name}</p>
          <p><strong>Last name</strong> {userData.last_name}</p>
          <p><strong>Date of birth</strong> {userData.birth_date}</p>
          <p><strong>Region</strong> {userData.municipality}</p>
          <p><strong>City</strong> {userData.locality}</p>
        </div>

        {/* Change password */}
        <div className={styles.sectionCard}>
          <h3 className={styles.h3Title}>Change password</h3>
          <form onSubmit={handlePasswordChange} className={styles.form}>
            <div>
              <label>Current password</label>
              <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
            </div>
            <div>
              <label>New password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div>
              <label>Confirm new password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            {passwordError   && <p className={styles.error}>{passwordError}</p>}
            {passwordSuccess && <p className={styles.success}>{passwordSuccess}</p>}
            <button type="submit" className={styles.submitButton}>Change password</button>
          </form>
        </div>

        {/* Wallet */}
        {userWallet ? (
          <div className={styles.sectionCard}>
            <h3 className={styles.h3Title}>Wallet</h3>
            <p className={styles.walletBalance}>€ {userWallet.balance}</p>
            <div className={styles.walletActions}>
              <form onSubmit={handleDeposit}>
                <label>Deposit</label>
                <input type="number" name="amount" min="0" step="0.01" placeholder="Amount (€)" required />
                <button type="submit">Deposit</button>
              </form>
              <form onSubmit={handleWithdrawal}>
                <label>Withdraw</label>
                <input type="number" name="amount" min="0" step="0.01" placeholder="Amount (€)" required />
                <button type="submit">Withdraw</button>
              </form>
            </div>
            {walletError   && <p className={styles.error}   style={{ marginTop: "0.75rem" }}>{walletError}</p>}
            {walletSuccess && <p className={styles.success} style={{ marginTop: "0.75rem" }}>{walletSuccess}</p>}
          </div>
        ) : (
          <div className={styles.sectionCard}>
            <h3 className={styles.h3Title}>Wallet</h3>
            <p style={{ marginBottom: "1rem" }}>No payment method linked yet.</p>
            <button onClick={() => router.push("add_payment")}>Add payment method</button>
          </div>
        )}
      </main>
    </div>
  );
}
