export async function fetchCategories() {
    // Fetch categories
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

export const fetchProducts = async (category, searchTerm, open, order) => {
  try {
    let url = "http://127.0.0.1:8000/api/auctions";

    const queryParams = new URLSearchParams();
    if (category) {
      queryParams.append("category", category);
    }

    if (searchTerm) {
      queryParams.append("search", searchTerm);
    }

    if (open){
      queryParams.append("open", open)
    }

    if (order){
      queryParams.append("order", order)
    }


    const response = await fetch(`${url}?${queryParams.toString()}`);

    if (!response.ok)
      return [];

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
