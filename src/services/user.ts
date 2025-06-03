import { UserLogin} from './types';
import axios, { isAxiosError } from "axios";
import "../constants/apiRoutes";
import {loginRoute, logoutRoute, checkAuthenticationRoute} from "@/constants/apiRoutes";

export const userLogin = async (userLogin: UserLogin) => {
    try {
        const response = await axios.post(
            loginRoute, userLogin, {
                withCredentials: true, //pour récup le cookie
            });

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw {
                status: error.response?.status,
                message: error.response?.data?.message,
            }
        }
        throw  {
            status: 500,
            message: "Une erreur inattendue s'est produite."
        }
    }
}

export const userLogout = async () => {
    try {
        await axios.post(logoutRoute, null, {
            withCredentials: true,
        });
    } catch (error) {
        if (isAxiosError(error)) {
            throw {
                status: error.response?.status,
                message: error.response?.data?.message,
            }
        }
        throw {
            status: 500,
            message: "Une erreur inattendue s'est produite."
        }
    }
}

export const isUserAuthenticated = async () => {
    try {
        const response = await axios.get(checkAuthenticationRoute, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw {
                status: error.status,
                message: error.message,
            }
        }
    }
}
