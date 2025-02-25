"use client";
import { useMsal } from "@azure/msal-react";
import { useState } from "react";

export default function Home() {
    const { instance, accounts } = useMsal();
    const [userData, ] = useState(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [, setTru] = useState<string>();

    const getUserData = async () => {
        if (accounts.length === 0) return;

            const accessTokenResponse = await instance.acquireTokenSilent({
                scopes: ["api://9287dbf2-77fd-4688-bf1b-8ff9706bbca3/User.Acces"],
                account: accounts[0],
            });

            setAccessToken(accessTokenResponse.accessToken); // Store the token in state

            const response = await fetch("https://localhost:7057/api/rooms/getAllRooms", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessTokenResponse.accessToken}`,
                },
            });

            const data = await response.json();
            console.log("Rooms Data:", data);
            setTru(data);
    };

    return (
        <div>
            <button onClick={getUserData}>Get User Info</button>
            {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
            <p>Roles: {JSON.stringify(accounts[0]?.idTokenClaims?.roles || ["None"])}</p>
            {accessToken && (
                <>
                    <h3>Access Token:</h3>
                    <pre style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                        {accessToken}
                    </pre>
                </>
            )}
        </div>
    );
}
