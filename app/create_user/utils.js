export const registerUser = async (userData) => {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/users/register/",
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
        return null; // Returns null on error
    }
};
