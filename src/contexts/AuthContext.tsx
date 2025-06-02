"use client"; // pour le contexte côté client
import React, { useState, createContext, useContext } from "react";
import {userLogin, userLogout} from "@/services/user";
import {useRouter} from "next/navigation";
import { UserLogin} from "@/services/types";
import {frontLoginRoute, frontTransferRoute} from "@/constants/frontRoutes";
import {useToast} from "@/contexts/ToastProvider";

type AuthContextType = {
    isLoggedIn: boolean;
    login: (credentials: UserLogin) => Promise<string>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const toast = useToast();

    const login = async (credentials: UserLogin):Promise<string> => {
        try {
            const response = await userLogin(credentials);
            if (response) {
                setIsLoggedIn(true);
                router.push(frontTransferRoute);
            }
            return response;

        } catch (error) {
            throw error;
        }
    };
    const logout = async () => {
        try {
            await userLogout(); // attendre la promesse pour ne pas risquer une redirection avant que le token soit bien désactivé
            setIsLoggedIn(false);
            router.push(frontLoginRoute);
            toast({title: "Déconnexion", message: "Vous êtes déconnecté·e", variant:"success"})
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast({title: "Erreur lors de la déconnexion", message: "Impossible de vous déconnecter. Veuillez réessayer " +
                    "dans quelques instants.", variant: "destructive"})
        }
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error ("useAuth must be used within AuthProvider")
    return context;
}