export const docreateAuction = async (auctionData, accessToken) => {
    const response = await fetch("http://127.0.0.1:8000/api/auctions/", {
      method: "POST",
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
  };


  // utils.js

export async function fetchCategories(name) {
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
