export const getUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

export const fetchAuctionDetail = async (auctionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/`);
      if (!response.ok) {
        throw new Error("Could not fetch the auction");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching auction:", error);
      throw error;
    }
  };

export const deleteAuction = async (auctionId, token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Could not delete the auction");
      }

      return true; // Successful deletion
    } catch (error) {
      console.error("Error deleting auction:", error);
      throw error;
    }
  };

export const createRating = async (auctionId, rating, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/ratings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error details:", data);
      throw new Error(data?.detail || "Error creating rating");
    }
    return data;
  } catch (error) {
    console.error("Error creating rating:", error);
    throw error;
  }
};

export const getMyRating = async (auctionId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/my-rating/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching rating:", error);
    throw error;
  }
}

export const deleteRating = async(auctionId, ratingId, token) => {
  try {
    console.log(auctionId, ratingId);
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/ratings/${ratingId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Could not delete the rating");
    }

  } catch (error) {
    console.error("Error deleting rating:", error);
    throw error;
  }
}

export const editRating = async(auctionId, ratingId, token, rating) => {
  try {
    console.log(auctionId, ratingId);
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/ratings/${ratingId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error("Could not edit the rating");
    }


  } catch (error) {
    console.error("Error editing rating:", error);
    throw error;
  }
}
