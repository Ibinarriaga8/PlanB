
export async function fetchComments(auctionId) {
    const res = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/comments/`);
    const data = await res.json();

    if (!res.ok) {
      console.error("Error loading comments:", data);
      return [];
    }
    return data?.results || [];
}

export async function createComment(auctionId, comment, token) {
    const res = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });

    if (!res.ok) {
        let errorMessage = "Could not create comment";

        try {
            const errorData = await res.json();
            errorMessage = JSON.stringify(errorData);
        } catch {
            errorMessage = `Error ${res.status}: ${res.statusText}`;
        }

        console.error("Error creating comment:", errorMessage);
        throw new Error(errorMessage);
    }

    return await res.json();
}


export async function updateComment(commentId, updatedData, token) {
    const res = await fetch(`http://127.0.0.1:8000/api/auctions/comments/${commentId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Error editing comment:", err);
      throw new Error("Could not update comment");
    }

    return await res.json();
}


export async function deleteComment(commentId, token) {
    const res = await fetch(`http://127.0.0.1:8000/api/auctions/comments/${commentId}/`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Error deleting comment");
}

export function getUserIdFromToken(token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = atob(payloadBase64);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
