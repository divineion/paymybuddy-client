"use client";
import styles from '../../styles/components/auth-form.module.scss';
import React, { useState } from "react";
import {useAuth} from "@/contexts/AuthContext";
import {CustomError} from "@/services/types";
import {useToast} from "@/contexts/ToastProvider";

type AuthFormProps = {
    mode: "login" | "register";
};

const AuthForm = ({mode}: AuthFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const {isLoggedIn, login} = useAuth();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Form submitted");
        e.preventDefault();

        try {
            const response = await login({
                username: email,
                password: password
            });

            if (response.isWellFormed()) {
                toast({title: "Bienvenue", message: "Connexion réussie. Ravi de vous revoir !", variant: "success"})
            }

        } catch (error:  unknown) {
            console.log(error)
           const err = error as CustomError;
           if (err.status == 401) {
               toast({title: "Oops", message: "Veuillez vérifier votre email et votre mot de passe.", variant: "destructive"})
           }

           if (err.status == undefined) {
               toast({title: "Erreur", message: "Une erreur est survenue. Merci de réessayer plus tard.", variant: "destructive"})
           }
        }
    }

    return (
        !isLoggedIn &&
        <>
            <form
                method={"post"}
                className={styles["form-container"]}
                onSubmit={handleSubmit} autoComplete={"on"}
            >
                <button className={"btn btn-app-name"}>Pay My Buddy</button>
                <div className={"input-wrapper"}>
                    {mode === "register" && (
                        <input
                            name={"username"}
                            autoComplete={"username"}
                            placeholder={"Username"}
                            className={"form-control"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    )}
                    <input
                        name={"email"}
                        placeholder={"Mail"}
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