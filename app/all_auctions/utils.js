export const fetchAllAuctions = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/auctions");

    if (!response.ok) {
        throw new Error("Could not fetch auctions.");
    }

    const data = await response.json();
    return data.results;
}
