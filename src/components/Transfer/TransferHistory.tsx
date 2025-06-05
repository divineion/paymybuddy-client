// affiche une liste d'objets Transfer
import {TransferHistoryItem} from "@/services/types";
import React from "react";

interface TransfersHistoryProps {
    transfers: TransferHistoryItem[];
}

const TransfersHistory: React.FC<TransfersHistoryProps> = ({transfers}) => {
    return (
        <>
            <ul>
                {transfers.map((transfer) => (
                    <li key={transfer.id}>
                        {transfer.receiver.username} {transfer.amount} {transfer.description} {transfer.date}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TransfersHistory;