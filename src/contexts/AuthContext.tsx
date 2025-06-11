"use client"; // pour le contexte côté client
import React, { useState, createContext, useContext } from "react";
import {isUserAuthenticated, userLogin, userLogout} from "@/services/user";
import {useRouter} from "next/navigation";
import {User, UserLogin} from "@/services/types";
import {frontLoginRoute, frontTransferRoute} from "@/constants/frontRoutes";
import {useToast} from "@/contexts/ToastProvider";
import {isUser} from "@/helpers/typeGuards";
import {
    GENERIC_ERROR_MESSAGE,
    GENERIC_ERROR_TITLE, LOGOUT_SUCCESS_MESSAGE,
    LOGOUT_SUCCESS_TITLE
} from "@/constants/toastMessages";

type AuthContextType = {
    user: User | null,
    getUserId: () => number | null,
    isLoggedIn: boolean;
    login: (credentials: UserLogin) => Promise<string>;
    logout: () => void;
    authCheck: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useToast();

    const getUserId = () => user?.id ?? null;

    const login = async (credentials: UserLogin):Promise<string> => {
        try {
            const response = await userLogin(credentials);
            if (response) {
                setIsLoggedIn(true);
                await authCheck();
                router.push(frontTransferRoute);
            }
            return response;

        } catch (error) {
            throw error;
        }
    };

    const authCheck = async () => {
        try {
            const userData = await isUserAuthenticated();

            if (isUser(userData)) {
                setLoading(true);
                setIsLoggedIn(true);
                setUser(userData)
            }
        } catch (error: unknown) {
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await userLogout(); // attendre la promesse pour ne pas risquer une redirection avant que le token soit bien désactivé
            setIsLoggedIn(false);
            router.push(frontLoginRoute);
            toast({title: LOGOUT_SUCCESS_TITLE, message: LOGOUT_SUCCESS_MESSAGE, variant:"success"})
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
            toast({title: GENERIC_ERROR_TITLE, message: message, variant: "destructive"})
        }
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, authCheck, user, loading, getUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error ("useAuth must be used within AuthProvider")
    return context;
}