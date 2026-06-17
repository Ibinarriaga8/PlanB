export const doLogin = async (username, password) => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/token/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({username, password}),
        },
      );

    const data = await response.json();

    if (!response.ok) {
        return { error: data.detail };
    }

    return data;
};