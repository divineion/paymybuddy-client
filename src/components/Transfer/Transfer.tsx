"use client";

import React, { useEffect, useState } from "react";
import { frontLoginRoute } from "@/constants/frontRoutes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { fetchTransferPageInfo } from "@/services/user";
import { TransferPage, TransferRequest } from "@/services/types";
import TransferForm from "@/components/Forms/TransferForm";

const Transfer = () => {
    const { isLoggedIn, authCheck, loading, getUserId } = useAuth();
    const router = useRouter();
    const [transferPage, setTransferPage] = useState<TransferPage | null>(null);

    const userId = getUserId();
    const beneficiaries = transferPage?.beneficiaries;
    const balance = transferPage?.balance;

    useEffect(() => {
        authCheck();
    }, []);

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push(frontLoginRoute);
        }
    }, [loading, isLoggedIn]);

    useEffect(() => {
        if (!loading && isLoggedIn && userId) {
            fetchTransferPageInfo(userId).then(setTransferPage);
        }
    }, [loading, isLoggedIn, userId]);

    if (!beneficiaries || balance === undefined) {
        return;
    }

    const handleSubmit = (transferData: TransferRequest) => {
        console.log("Form submitted with data:", transferData);
    };

    return (
        <>
            { loading &&
                <div>Chargement...</div>
            }
            <TransferForm beneficiaries={beneficiaries} onSubmit={handleSubmit} />
        </>
    );
};

export default Transfer;
