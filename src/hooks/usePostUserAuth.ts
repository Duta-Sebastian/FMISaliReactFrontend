export async function postUserAuth(user: { displayName: string; email: string }, accessToken: string) {
    try {
        await fetch("https://localhost:7057/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                email: user.email,
                displayName: user.displayName
            }),
        });
    } catch (error) {
        console.error("Error sending user to backend:", error);
    }
}
