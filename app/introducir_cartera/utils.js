export default async function createWallet(token, cardNumber) {
  const response = await fetch("http://127.0.0.1:8000/api/users/create-wallet/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ card_number: "4242424242424242" }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error:", response);
    throw new Error(data.detail || "Error al crear la wallet");
  }

  return data;
}
