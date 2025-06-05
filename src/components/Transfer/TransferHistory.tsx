// affiche une liste d'objets Transfer
import {TransferHistoryItem} from "@/services/types";
import React from "react";
import {useAuth} from "@/contexts/AuthContext";
import {Card, Container, Table} from "react-bootstrap";

interface TransfersHistoryProps {
    transfers: TransferHistoryItem[];
}

const TransfersHistory: React.FC<TransfersHistoryProps> = ({transfers}) => {
    const {getUserId} = useAuth();
    const userId = getUserId();

    const columns = [
        { key: "relation", label: "Relation" },
        { key: "description", label: "Description" },
        { key: "amount", label: "Montant" }
    ];


    return (
        <>
            <Container className="transfers-container">
                <Card className="transfers-card">
                    <Card.Header className="transfers-header">
                        Mes transactions
                    </Card.Header>

                    <Card.Body className="transfers-body">
                        <Table
                            responsive
                            hover
                            className="transfers-table"
                        >
                            <caption
                                className={"sr-only"}
                            >
                                Mes Transactions
                            </caption>
                            <thead className="transfers-header-row">
                            <tr>
                                {
                                    columns.map(column => {
                                        return <th key={column.key}
                                                   className={`transfers-col transfers-col--${column}`}>{column.label}</th>
                                    })
                                }
                            </tr>
                            </thead>

                            <tbody>
                            {transfers.map((transfer, index) => {
                                const isReceived = transfer.receiver.id === userId;
                                return (
                                    <tr key={index} className="transfers-row">
                                        <td className="transfers-col transfers-col--relation">
                                            {isReceived ? transfer.sender.username : transfer.receiver.username}
                                        </td>
                                        <td className="transfers-col transfers-col--description">
                                            {transfer.description}
                                        </td>
                                        <td className="transfers-col transfers-col--amount">
                                            {isReceived ? `${transfer.amount}€` : `- ${transfer.amount}€`}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default TransfersHistory;