"use client";

import React, {useEffect, useState} from "react";
import { addRelation } from "@/services/user";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastProvider";

const AddRelation = () => {
    const { getUserId, authCheck } = useAuth();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const userId = getUserId();


    useEffect(() => {
        authCheck();
    }, []);

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userId) {
            toast({title: "Erreur inconnue", message: "Une erreur inconnue est survenue.", variant: "destructive"});
            return;
        }

        try {
            await addRelation({ email }, userId);

            toast({title: "Relation ajoutée", message: `${email} : relation ajoutée avec succès.`, variant: "success"});
            setEmail("");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erreur lors de l’ajout de la relation.";
            toast({title: "Erreur", message: `${email} : ${message}`, variant: "destructive"});
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type={"submit"}>Ajouter</button>
        </form>
    );
};

export default AddRelation;
