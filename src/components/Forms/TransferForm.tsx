import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { TransferFormProps } from "@/services/types";

const TransferForm: React.FC<TransferFormProps> = ({ beneficiaries, onSubmit }) => {
    const { getUserId, user } = useAuth();

    const [selectedBeneficiary, setSelectedBeneficiary] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string | null>(null);


    const handleBeneficiarySelectOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedBeneficiary(value === "" ? "" : Number(value));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedBeneficiary) {
            setError("Veuillez sélectionner un bénéficiaire.");
            return;
        }

        if (!amount || Number(amount) <= 0) {
            setError("Veuillez saisir un montant valide.");
            return;
        }
        if (!description) {
            setError("Veuillez saisir une description valide.");
            return;
        }

        const sender = getUserId();
        if (!sender) {
            return;
        }

        onSubmit({
            receiverId: selectedBeneficiary,
            description,
            amount,
        });

        setSelectedBeneficiary("");
        setDescription("");
        setAmount("");
        setError("")
    };

    return (
        <form id="transferForm" className="transfer-form" onSubmit={handleSubmit}>
            {error &&
                <div
                    role="alert"
                    aria-live="polite"
                    className="error-message"
                >
                    {error}
                </div>}
            <label
                htmlFor="beneficiary-select"
                className="sr-only"
            >
                Sélectionner une relation
            </label>
            <select
                name="beneficiary"
                id="beneficiary-select"
                autoFocus
                value={selectedBeneficiary}
                onChange={handleBeneficiarySelectOptionChange}
            >
                <option value="">Sélectionner une relation</option>
                {beneficiaries.map((b) => (
                    <option key={b.id} value={b.id}>
                        {b.username}
                    </option>
                ))}
            </select>
            <label
                htmlFor={"transfer-description"}
                className={"sr-only"}
            >
                Description du transfert
            </label>
            <input
                type="text"
                id={"transfer-description"}
                name="description"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <label
                htmlFor={"transfer-amount"}
                className={"sr-only"}
            >
                Montant du transfert
            </label>
            <input
                type="number"
                id={"transfer-amount"}
                name="amount"
                placeholder="0€"
                min="0.01"
                max={user?.balance}
                step="0.01"
                value={amount}
                onChange={handleAmountChange}
            />
            <button type="submit">Payer</button>
        </form>
    );
};

export default TransferForm;
