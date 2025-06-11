import {EmailRequest, TransferRequest, UpdateUserAccount, UserAccount, UserLogin} from './types';
import axios, {isAxiosError} from "axios";
import "../constants/apiRoutes";
import {
    loginRoute,
    logoutRoute,
    checkAuthenticationRoute,
    registerRoute,
    transferPageRoute,
    transferRoute,
    addRelationRoute,
    changeUserInfoRoute,
    userRoute
} from "@/constants/apiRoutes";
import {
    ADD_RELATION_GENERIC_FAILURE_ERROR_MESSAGE,
    EMAIL_ALREADY_EXISTS_MESSAGE,
    FETCH_PROFILE_MESSAGE, FORBIDDEN_RESOURCE_ACCESS, FORBIDDEN_RESOURCE_UPDATE,
    GENERIC_ERROR_MESSAGE,
    GENERIC_REGISTRATION_ERROR_MESSAGE,
    INSUFFICIENT_BALANCE_OR_AMOUNT_EXCEPTION,
    INVALID_CREDENTIALS_MESSAGE,
    LOGOUT_ERROR_MESSAGE,
    PASSWORD_MISMATCH_ERROR,
    RELATION_ALREADY_EXISTS_MESSAGE,
    SELF_RELATION_ERROR,
    UNKNOWN_EMAIL_ADDRESS,
    USER_NOT_FOUND_MESSAGE
} from "@/constants/toastMessages";

export const userLogin = async (userLogin: UserLogin) => {
    try {
        const response = await axios.post(
            loginRoute, userLogin, {
                withCredentials: true,
            });

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error.status === 401) {
                throw new Error(INVALID_CREDENTIALS_MESSAGE)
            }

            throw new Error(GENERIC_ERROR_MESSAGE);
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}

export const userLogout = async () => {
    try {
        await axios.post(logoutRoute, null, {
            withCredentials: true,
        });
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            throw new Error(LOGOUT_ERROR_MESSAGE)
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
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
            const status = error.response?.status;

            if (status === 401) {
                throw new Error(INVALID_CREDENTIALS_MESSAGE);
            }

            throw new Error(GENERIC_ERROR_MESSAGE);
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}

export const userRegister = async (userAccount: UserAccount) => {
    try {
        const response = await axios.post(registerRoute, userAccount, {
            withCredentials: true
        });

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status === 409) {
                throw new Error(EMAIL_ALREADY_EXISTS_MESSAGE);
            }
        }
        throw new Error(GENERIC_REGISTRATION_ERROR_MESSAGE);
    }
}

export const fetchTransferPageInfo = async (userId: number) => {
    try {
        const response = await axios.get(transferPageRoute(userId), {
            withCredentials: true,
        })

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            switch (error.response?.status) {
                case 404:
                    throw new Error(USER_NOT_FOUND_MESSAGE);
                case 403:
                    throw new Error(FORBIDDEN_RESOURCE_ACCESS);
                default:
                    throw new Error(GENERIC_REGISTRATION_ERROR_MESSAGE);
            }
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}

export const createTransfer = async (transferData: TransferRequest) => {
    try {
        const response = await axios.post(transferRoute, transferData, {
            withCredentials: true,
        })

        return response.data;
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            switch (error.response?.status) {
                case 404:
                    throw new Error(USER_NOT_FOUND_MESSAGE);

                case 403:
                    throw new Error(FORBIDDEN_RESOURCE_UPDATE);

                case 400:
                    throw new Error(INSUFFICIENT_BALANCE_OR_AMOUNT_EXCEPTION);

                default:
                    throw new Error(GENERIC_ERROR_MESSAGE);
            }
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}

export const addRelation = async (email: EmailRequest, userId: number) => {
    try {
        const response = await axios.post(addRelationRoute(userId), email, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            switch (status) {
                case 400:
                    throw new Error(SELF_RELATION_ERROR);

                case 403:
                    throw new Error(FORBIDDEN_RESOURCE_UPDATE);

                case 404:
                    throw new Error(UNKNOWN_EMAIL_ADDRESS);

                case 409:
                    throw new Error(RELATION_ALREADY_EXISTS_MESSAGE);

                default:
                    throw new Error(ADD_RELATION_GENERIC_FAILURE_ERROR_MESSAGE);
            }
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}

export const fetchProfile = async (userId: number) => {
    try {
        const response = await axios.get(userRoute(userId), {
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status;
            switch (status) {
                case 403:
                    throw new Error(FORBIDDEN_RESOURCE_ACCESS);

                case 404 :
                    throw new Error(USER_NOT_FOUND_MESSAGE);

                default:
                    throw new Error(FETCH_PROFILE_MESSAGE);
            }
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}

export const changeUserInfo = async (userId: number, emails: UpdateUserAccount) => {
    try {
        const response = await axios.patch(changeUserInfoRoute(userId), emails, {
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            switch (error.response?.status) {
                case 404:
                    throw new Error(USER_NOT_FOUND_MESSAGE);

                case 400:
                    throw new Error(PASSWORD_MISMATCH_ERROR);

                default:
                    throw new Error(GENERIC_ERROR_MESSAGE);
            }
        }
        throw new Error(GENERIC_ERROR_MESSAGE);
    }
}