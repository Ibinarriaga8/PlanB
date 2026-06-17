"use client";

import { useEffect, useState } from "react";
import {fetchComments, createComment, deleteComment, updateComment, getUserIdFromToken,} from "./utils";

const Comment = ({ productoId }) => {
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token-jwt");
    if (t) {
      setToken(t);
      setUserId(getUserIdFromToken(t));
    }
    fetchComments(productoId).then(setComments).catch((err) => setError(err.message));
  }, [productoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(productoId, { title: title, content: text }, token);
      setTitle("");
      setText("");
      const data = await fetchComments(productoId);
      setComments(data);
      setMessage("Comment sent successfully");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id, token);
      const data = await fetchComments(productoId);
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (comment) => {
    setEditing(comment.id);
    setNewTitle(comment.title);
    setNewText(comment.content);
  };

  const handleUpdate = async () => {
    try {
      await updateComment(editing, { title: newTitle, content: newText }, token);
      const data = await fetchComments(productoId);
      setComments(data);
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ marginBottom: "1rem" }}>Comments</h3>

      {token && (
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px", marginBottom: "2rem" }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <button type="submit">Send</button>
        </form>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}
      {Array.isArray(comments) && comments.length === 0 && <p>No comments yet.</p>}

      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: "600px" }}>
        {Array.isArray(comments) &&
          comments.map((c) => (
            <li
              key={c.id}
              style={{backgroundColor: "#111",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "0.5rem",
                color: "#fff",
              }}
            >
              {editing === c.id ? (
                <>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ width: "100%", marginBottom: "0.5rem" }}
                  />
                  <textarea
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginBottom: "0.5rem" }}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditing(null)} style={{ marginLeft: "0.5rem" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong style={{ fontSize: "1rem" }}>{c.title}</strong> by <em>{c.user}</em>
                  <p style={{ marginTop: "0.5rem" }}>{c.content}</p>
                  {userId && userId === c.user_id && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <button onClick={() => handleDelete(c.id)}>Delete</button>
                      <button onClick={() => startEdit(c)} style={{ marginLeft: "0.5rem" }}>
                        Edit
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Comment;
