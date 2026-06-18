"use client";

import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Bid from "@/components/Bid/Bid";
import { getUserIdFromToken, fetchAuctionDetail, deleteAuction, createRating, getMyRating, deleteRating, editRating } from "./utils";
import styles from "./page.module.css";


const Detail = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [myRating, setMyRating] = useState(null);
  const [myRatingId, setMyRatingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    setToken(token);
    if (token) {
      const id = getUserIdFromToken(token);
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchAuctionDetail(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    const loadMyRating = async () => {
      try {
        const ratingData = await getMyRating(id, token);
        setMyRating(ratingData.rating);
        setMyRatingId(ratingData.id);
      } catch (error) {
        console.error("Error loading rating:", error);
      }
    };

    if (id && token) {
      loadProduct();
      loadMyRating();
    }
  }, [id, token]);

  const handleOnDelete = async () => {
    await deleteAuction(product.id, token);
    router.push("/my_auctions");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rating = parseInt(formData.get("rating"));
    try {
      await createRating(product.id, rating, token);
      router.push("/all_auctions");
    } catch (error) {
      console.error("Error creating rating:", error);
      setErrorMessage("You have already rated this auction");
    }
  };

  const handleOnRatingDelete = async () => {
    try {
      await deleteRating(product.id, myRatingId, token);
      setMyRating(null);
      setMyRatingId(null);
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  const handleOnRatingEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rating = parseInt(formData.get("rating"));
    try {
      await editRating(product.id, myRatingId, token, rating);
      setMyRating(rating);
    } catch (error) {
      setErrorMessage("You have already rated this auction");
    }
  };

  return (
    <div>
      {product ? (
        <>
          <ProductDetail product={product} />

          <main className={styles.main}>

            {userId === product.auctioneer_id ? (
              <div className={styles.ownerActions}>
                <p>This is your listing</p>
                <button
                  onClick={() => router.push(`/edit_auction/${product.id}`)}
                  className={styles.button}
                >
                  Edit auction
                </button>
                <button
                  onClick={handleOnDelete}
                  className={`${styles.button} btn-danger`}
                >
                  Delete auction
                </button>
              </div>
            ) : (
              <div className={styles.bidderSection}>
                <p>Listed by <strong style={{ color: "var(--text)" }}>{product.auctioneer}</strong></p>
                <Bid auctionId={product.id} />
              </div>
            )}

            <div className={styles.ratingSection}>
              {myRatingId ? (
                <>
                  <p>Your rating: {myRating} / 5</p>
                  <form onSubmit={handleOnRatingEdit}>
                    <label>Edit rating (1–5)</label>
                    <input type="number" name="rating" min="1" max="5" step="1" required />
                    {errorMessage && <p style={{ color: "var(--red)", fontSize: "0.875rem" }}>{errorMessage}</p>}
                    <button type="submit">Update rating</button>
                  </form>
                  <button onClick={handleOnRatingDelete} className="btn-danger">Delete rating</button>
                </>
              ) : (
                <form onSubmit={handleOnSubmit}>
                  <label>Rate this auction (1–5)</label>
                  <input type="number" name="rating" min="1" max="5" step="1" required />
                  {errorMessage && <p style={{ color: "var(--red)", fontSize: "0.875rem" }}>{errorMessage}</p>}
                  <button type="submit">Submit rating</button>
                </form>
              )}
            </div>

          </main>
        </>
      ) : (
        <p style={{ padding: "3rem", textAlign: "center" }}>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
