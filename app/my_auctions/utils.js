// Function to fetch user auctions
export async function getUserAuctions() {
  const token = localStorage.getItem("token-jwt");

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  const response = await fetch("http://127.0.0.1:8000/api/auctions/users/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching auctions.");
  }

  const data = await response.json();
  return data;
}
