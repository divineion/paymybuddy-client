"use client";
import styles from '../../styles/components/auth-form.module.scss';
import React, {useEffect, useState} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {useToast} from "@/contexts/ToastProvider";
import {useRouter} from "next/navigation";
import {frontLoginRoute, frontRegisterRoute, frontTransferRoute} from "@/constants/frontRoutes";
import {userRegister} from "@/services/user";
import {
    GENERIC_ERROR_TITLE,
    GENERIC_LOGIN_ERROR_MESSAGE, GENERIC_REGISTRATION_ERROR_MESSAGE,
    LOGIN_SUCCESS_MESSAGE,
    LOGIN_SUCCESS_TITLE, REGISTRATION_SUCCESS_MESSAGE, REGISTRATION_SUCCESS_TITLE
} from "@/constants/toastMessages";

type AuthFormProps = {
    mode: "login" | "register";
};

const AuthForm = ({mode}: AuthFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const {isLoggedIn, login, authCheck} = useAuth();

    const router = useRouter();

    const toast = useToast();

    const buttonTitle = mode === "login"
        ? "Accéder à la page d'inscription"
        : "Accéder à la page de connexion";

    const ariaLabel = mode === "login"
        ? "Aller au formulaire d'inscription"
        : "Aller au formulaire de connexion";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "login") {
            try {
                const response = await login({
                    username: email,
                    password: password
                });

                toast({title: LOGIN_SUCCESS_TITLE, message: LOGIN_SUCCESS_MESSAGE, variant: "success"})

                router.push(frontTransferRoute)
            } catch (error: unknown) {
                const message = error instanceof Error ?
                    error.message
                    : GENERIC_LOGIN_ERROR_MESSAGE;

                toast({title: GENERIC_ERROR_TITLE, message: `${message}`, variant: "destructive"})
            }
        }

        if (mode === "register") {
            try {
                const response = await userRegister({
                    username: username,
                    email: email,
                    password: password
                })

                if (response) {
                    toast({
                        title: REGISTRATION_SUCCESS_TITLE,
                        message: REGISTRATION_SUCCESS_MESSAGE,
                        variant: "success"
                    })
                    await login({
                        username: email,
                        password: password
                    })
                }
            } catch (error: unknown) {
                const message = error instanceof Error ?
                    error.message
                    : GENERIC_REGISTRATION_ERROR_MESSAGE

                    toast({
                        title: "Erreur",
                        message: message,
                        variant: "destructive"
                    })

            }
        }
    }

    function handleAuthToggleButtonClick() {
        if (mode == "login") {
            router.push(frontRegisterRoute);
        } else {
            router.push(frontLoginRoute)
        }
    }

    useEffect(() => {
        authCheck();
        if (isLoggedIn) {
            router.push(frontTransferRoute);
        }
    }, [isLoggedIn])

    return (
        !isLoggedIn &&
        <>
            <form
                method={"post"}
                className={styles["form-container"]}
                onSubmit={handleSubmit} autoComplete={"on"}
            >
                <button
                    className={"btn btn-app-name"}
                    type={"button"}
                    onClick={() => handleAuthToggleButtonClick()}
                    title={buttonTitle}
                    aria-label={ariaLabel}
                >
                    PayMyBuddy
                </button>
                <div className={"input-wrapper"}>
                    {mode === "register" && (
                        <input
                            name={"Pseudo"}
                            autoComplete={"nickname"}
                            placeholder={"Pseudo"}
                            className={"form-control"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    )}
                    <input
                        name={"email"}
                        placeholder={"Adresse email"}
                        autoComplete={"email"}
                        type={"email"}
                        className={"form-control"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name={"password"}
                        autoComplete={"current-password"}
                        type={"password"}
                        placeholder={"Mot de passe"}
                        className={"form-control"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type={"submit"} className="btn btn-primary">
                    {mode === "login" ? "Se connecter" : "S'inscrire"}
                </button>
            </form>
        </>
    )
}

export default AuthForm;