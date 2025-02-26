import { createContext, useContext, useState } from "react";
import { useUserAuthentication } from "@/hooks/useUserAuthentication";
import {postUserAuth} from "@/hooks/usePostUserAuth";
import {useGraphUser} from "@/hooks/useFetchGraphUser";

interface User {
    displayName: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    login: () => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchGraphUser = useGraphUser(setUser, setLoading);
    const { login, logout } = useUserAuthentication(async () => {
        const result = await fetchGraphUser();
        if (result) {
            await postUserAuth(result.user, result.accessTokenResponse1);
        }
    });

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}
