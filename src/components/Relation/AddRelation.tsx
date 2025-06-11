"use client";

import React, {useEffect, useState} from "react";
import {addRelation} from "@/services/user";
import {useAuth} from "@/contexts/AuthContext";
import {useToast} from "@/contexts/ToastProvider";
import {
    ADD_RELATION_GENERIC_FAILURE_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE, GENERIC_ERROR_TITLE,
    RELATION_SUCCESSFULLY_ADDED_MESSAGE,
    RELATION_SUCCESSFULLY_ADDED_TITLE,
} from "@/constants/toastMessages";
import {useRouter} from "next/navigation";
import {frontLoginRoute} from "@/constants/frontRoutes";

const AddRelation = () => {
    const {getUserId, authCheck, isLoggedIn, loading} = useAuth();
    const toast = useToast();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const userId = getUserId();

    useEffect(() => {
        authCheck();
    }, []);

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push(frontLoginRoute);
        }
    }, [loading, isLoggedIn]);

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            toast({
                title: GENERIC_ERROR_TITLE,
                message: GENERIC_ERROR_MESSAGE,
                variant: "destructive"
            });

            return;
        }

        try {
            await addRelation(
                {email},
                userId
            );

            toast({
                title: RELATION_SUCCESSFULLY_ADDED_TITLE,
                message: `${RELATION_SUCCESSFULLY_ADDED_MESSAGE(email)} `,
                variant: "success"
            });

            setEmail("");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : ADD_RELATION_GENERIC_FAILURE_ERROR_MESSAGE;

            toast({title: GENERIC_ERROR_TITLE, message: `${email} : ${message}`, variant: "destructive"});
        }
    };

    return (
        <form
            className={"add-relation-form"}
            onSubmit={handleSubmit}
        >
            <div className={"add-relation-form-input-container"}>
            <label htmlFor="add-relation-email-input" className="add-relation-email-label">
                Chercher une relation
            </label>
            <input
                type="email"
                id="add-relation-email-input"
                className="add-relation-email-input"
                value={email}
                onChange={handleEmailInputChange}
                autoFocus
                required
            />
            </div>
            <button type={"submit"}>Ajouter</button>
        </form>
    );
};

export default AddRelation;
