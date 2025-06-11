"use client";

import React, { useEffect, useState } from "react";
import { frontLoginRoute } from "@/constants/frontRoutes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { fetchTransferPageInfo } from "@/services/user";
import {Beneficiary, TransferHistoryItem} from "@/services/types";
import TransferForm from "@/components/Forms/TransferForm";
import TransfersHistory from "@/components/Transfer/TransferHistory";
import {useToast} from "@/contexts/ToastProvider";
import {GENERIC_ERROR_TITLE, GENERIC_ERROR_MESSAGE} from "@/constants/toastMessages";

export interface TransferPage {
    id: number;
    beneficiaries: Beneficiary[];
    balance: string;
    sentTransfers: TransferHistoryItem[];
    receivedTransfers: TransferHistoryItem[];
}

const TransferPageComponent = () => {
    const { isLoggedIn, authCheck, loading, user } = useAuth();
    const router = useRouter();
    const toast = useToast();

    const [transferPage, setTransferPage] = useState<TransferPage | null>(null);
    const [transfersHistory, setTransfersHistory] = useState<TransferHistoryItem[]>([]); //initizliser avec tableau vide

    const beneficiaries = transferPage?.beneficiaries;
    const balance = transferPage?.balance;

    const userId = user?.id;

    useEffect(() => {
        if (transferPage?.receivedTransfers && transferPage.sentTransfers) {
            setTransfersHistory([...transferPage.sentTransfers, ...transferPage.receivedTransfers]);
        }
    }, [transferPage]);

    useEffect(() => {
        authCheck();
    }, []);

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push(frontLoginRoute);
        }
    }, [loading, isLoggedIn]);

    const fetchTransferPage = async (userId: number) => {
        try {
            const response = await fetchTransferPageInfo(userId);
            setTransferPage(response);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
            toast({title: GENERIC_ERROR_TITLE, message: message, variant: "destructive"});
        }
    }

    useEffect(() => {
        if (!loading && isLoggedIn && userId) {
            fetchTransferPage(userId);
        }
    }, [loading, isLoggedIn, userId]);

    if (!beneficiaries || balance === undefined) {
        return;
    }

    return (
        <div className={"transfer-page-container"}>
            { loading &&
                <div>Chargement...</div>
            }
            <TransferForm
                beneficiaries={beneficiaries}
            />
            <TransfersHistory
                transfers={transfersHistory}
            />
        </div>
    );
};

export default TransferPageComponent;