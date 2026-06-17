export async function doLogout(setToken, setUserName, router) {

    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("refresh-token");

      // Call to invalidate (blacklist) the refresh token
      if (refreshToken) {
        try {
          await fetch("http://127.0.0.1:8000/api/users/log-out", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });
        } catch (error) {
          console.error("Error invalidating refresh token:", error);
        }
      }

      // Clear localStorage and state
      localStorage.removeItem("token-jwt");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("userName");

      setToken(null);
      setUserName(null);

      // Redirect to login
      router.push("/login");
    }
};
