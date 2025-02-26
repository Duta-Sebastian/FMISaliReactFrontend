import { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import {User} from "@/types/user";

export function useGraphUser(setUser: (user: User) => void, setLoading: (loading: boolean) => void) {
    const { instance, accounts } = useMsal();

    return useCallback(async () => {
        setLoading(true);
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                scopes: ["User.Read", "api://9287dbf2-77fd-4688-bf1b-8ff9706bbca3/User.Acces"],
                account: accounts[0],
            });
            const accessToken = tokenResponse.accessToken;

            const response = await fetch("https://graph.microsoft.com/v1.0/me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) throw new Error("Failed to fetch user info");

            const data = await response.json();
            const user = { displayName: data.displayName, email: data.mail || data.userPrincipalName };
            setUser(user);
            const accessTokenResponse = await instance.acquireTokenSilent({
                scopes: ["api://9287dbf2-77fd-4688-bf1b-8ff9706bbca3/User.Acces"],
                account: accounts[0],
            });
            const accessTokenResponse1 = accessTokenResponse.accessToken;

            return { user, accessTokenResponse1 };
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [setLoading, instance, accounts, setUser]);
}
