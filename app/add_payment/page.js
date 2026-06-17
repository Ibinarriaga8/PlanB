"use client";


import { useState, useEffect} from "react";
import styles from "./page.module.css";
import createWallet from "./utils";
import { useRouter } from "next/navigation";


export default function AddPaymentPage(){

    const [token, setToken] = useState(null);
    const router = useRouter();
    const [error, setError] = useState("");


    useEffect(()=>{
        setToken(localStorage.getItem("token-jwt"))
    }, [])

    const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cardNumber = formData.get("cardNumber");
    setError("");

    try {
        await createWallet(token, cardNumber);
        router.push("/profile");
    } catch (err) {
        console.log(err);
        setError(err.message);
    }
    };


    return(
        <div className= {styles.main}>
            <h3>Enter a payment method</h3>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <input className = {styles.cardnumber}  name = "cardNumber" type = "text" placeholder="Enter card number"></input>
                <button className={styles.submitButton} type = "submit">Submit</button>
                {error?(<p>Error: {error}</p>):(<></>)}
            </form>
        </div>
    )
}
