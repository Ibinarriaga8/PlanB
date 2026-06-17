
export async function createBid(auctionId, amount, token) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/bids/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Returns the error to be handled by the caller
        throw new Error(data?.detail || data?.non_field_errors?.[0] || "Error placing bid");
      }

      return data; // Success
    } catch (err) {
      throw new Error(err.message || "Network error sending bid.");
    }
  }
