import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/auth/authConfig";
import { ReactNode, useEffect, useState, useMemo } from "react";
import { AuthenticationResult } from "@azure/msal-common";
import { MsalProvider } from "@azure/msal-react";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isMsalInitialized, setIsMsalInitialized] = useState(false);

    // Use useMemo to prevent recreating the msalInstance on every render
    const msalInstance = useMemo(() => new PublicClientApplication(msalConfig), []);

    useEffect(() => {
        const initializeMsal = async () => {
            try {
                // Initialize MSAL
                await msalInstance.initialize();
                setIsMsalInitialized(true);

                // Default to using the first account if no account is active on page load
                if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
                    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
                }

                // Listen for sign-in event and set active account
                msalInstance.addEventCallback((event) => {
                    const authenticationResult = event.payload as AuthenticationResult;
                    const account = authenticationResult?.account;
                    if (event.eventType === EventType.LOGIN_SUCCESS && account) {
                        msalInstance.setActiveAccount(account);
                    }
                });
            } catch (error) {
                console.error("MSAL initialization failed", error);
            }
        };

        initializeMsal();
    }, [msalInstance]); // msalInstance is now stable because of useMemo

    if (!isMsalInitialized) {
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
};

export function userAuthProvider() {
    return { AuthProvider };
}
