export async function fetchCategories() {
    try {
      const res = await fetch("http://localhost:8000/api/auctions/categories/");
      const data = await res.json();

      // Ensure data is an array or contains one
      return Array.isArray(data) ? data : data.results || data.categories || [];
    } catch (err) {
      console.error("Error loading categories:", err);
      return [];
    }
  }

export async function doEditAuction(auctionId, auctionData, accessToken) {
    const response = await fetch(`http://localhost:8000/api/auctions/${auctionId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: auctionData,
    });

    let data = {};
    try {
      data = await response.json();
    } catch (err) {
      console.warn("Empty or malformed response");
    }

    if (!response.ok) {
      console.error("❌ Backend error:", data);
      return { error: data };
    }
    return data;

    }


export async function createCategories(name, accessToken) {
  const res = await fetch("http://localhost:8000/api/auctions/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: name }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Error creating category');
  }

  return await res.json(); // ← Returns the created category
}
