import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/auth/authConfig";

export function useUserAuthentication(fetchUser: () => Promise<void>) {
    const { instance } = useMsal();

    const login = async () => {
        try {
            const response = await instance.loginPopup({ ...loginRequest, prompt: "create" });
            if (response) {
                await fetchUser();
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        instance.logoutPopup({ postLogoutRedirectUri: "/" }).then(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
    };

    return { login, logout };
}
