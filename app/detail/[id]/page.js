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
        console.log(data.bids)
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    const loadMyRating = async () => {
      try {
        const ratingData = await getMyRating(id, token);
        const rating = ratingData.rating; // Ensure ratingData has the expected structure
        const ratingId = ratingData.id; // Ensure ratingData has the expected structure

        setMyRating(rating);
        setMyRatingId(ratingId); // Ensure ratingData has the expected structure


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

  }

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

  }

  const handleOnRatingDelete = async () => {
    try {
      await deleteRating(product.id, myRatingId, token);
      setMyRating(null);
      setMyRatingId(null);


    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  }

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

  }


  return (
    <div>
      {product ? (
        <>
          <ProductDetail product={product} />

          <main className={styles.main}>

            {userId === product.auctioneer_id ? (
              <div>
                <p>This product is yours</p>
                <button onClick={handleOnDelete} className={styles.button}>
                Delete auction
                </button>

                <button onClick={() => router.push(`/edit_auction/${product.id}`)} className={styles.button}>
                Edit auction
                </button>

              </div>
              ) : (
                <div>
                  <p>Posted by {product.auctioneer}</p>
                  <Bid auctionId={product.id} />
                </div>
              )}

            {myRatingId ? (
              <>
                <p>Your rating: {myRating}</p>

                <form onSubmit={handleOnRatingEdit}>
                  Edit rating:
                  <input type="number" name="rating" min="1" max="5" step="1" required />
                  {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  <button type="submit">Rate</button>
                </form>

                <button onClick={handleOnRatingDelete} className={styles.button}>Delete rating</button>
              </>
            ) : (
              <form onSubmit={handleOnSubmit}>
                Rate auction:
                <input type="number" name="rating" min="1" max="5" step="1" required />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Rate</button>
              </form>
            )}

            </main>

        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
