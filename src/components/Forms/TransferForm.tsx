import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {Beneficiary} from "@/services/types";
import {createTransfer} from "@/services/user";
import {useToast} from "@/contexts/ToastProvider";
import {
    GENERIC_ERROR_MESSAGE,
    GENERIC_ERROR_TITLE,
    TRANSFER_SUCCESS_MESSAGE,
    TRANSFER_SUCCESS_TITLE
} from "@/constants/toastMessages";

export interface TransferFormProps {
    beneficiaries: Beneficiary[];
}
const TransferForm: React.FC<TransferFormProps> = ({ beneficiaries }) => {
    const { getUserId, user } = useAuth();
    const toast = useToast();

    const [selectedBeneficiary, setSelectedBeneficiary] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string | null>(null);

    const balance = typeof user?.balance === "string" ? parseFloat(user.balance) : user?.balance ?? 0;
    const maxSentTransfer = balance / 1.05;

    const handleBeneficiarySelectOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedBeneficiary(value === "" ? "" : Number(value));
        if (value != "") setError(null);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDescription(value);
        if (value != "") setError(null);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleBeneficiarySelectBlur = () => {
        if (!selectedBeneficiary) {
            setError("Veuillez sélectionner un bénéficiaire.");
            return;
        } else {
            setError(null);
        }
    }

    const handleDescriptionInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length < 10 || value.length > 555) {
            setError("La description doit être comprise entre 10 et 255 caractères");
            setDescription(value);
            return;
        } else {
            setDescription(value);
        }
    }

    const handleAmountInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const inputAmount = parseFloat(value);
        if(isNaN(inputAmount)) {
            setAmount(value);
            setError(null);
            return;
        }

        if (inputAmount > maxSentTransfer) {
            setError(`Solde insuffisant : le montant maximum pour un transfert est de ${maxSentTransfer.toFixed(2)}`);
        } else {
            setError(null);
        }
        setAmount(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sender = getUserId();
        if (!sender) {
            return;
        }

        try {
            await createTransfer({
                id: sender,
                receiverId: Number(selectedBeneficiary),
                description,
                amount
            })

            const beneficiary = beneficiaries.find(b => b.id === selectedBeneficiary);
            const username = beneficiary ? beneficiary.username : "";

            toast({title: TRANSFER_SUCCESS_TITLE, message: TRANSFER_SUCCESS_MESSAGE(username), variant: "success"})

            setTimeout( () => {
                window.location.reload();
            }, 5000);

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
            toast({title: GENERIC_ERROR_TITLE, message: message, variant: "destructive"})
        }
    };

    return (
        <>
        <form id="transferForm" className="transfer-form" onSubmit={handleSubmit}>
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
                    onBlur={handleBeneficiarySelectBlur}
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
                    className={"transfer-form__transfer-description"}
                    name="description"
                    maxLength={255}
                    minLength={10}
                    placeholder="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    onBlur={handleDescriptionInputBlur}
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
                    className={"transfer-form__transfer-amount"}
                    name="amount"
                    placeholder="0€"
                    min="1"
                    max={maxSentTransfer.toFixed(2)}
                    step="0.01"
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountInputBlur}
                />
                <button
                    type="submit"
                    className={"transfer-form__submit-button"}
                >
                    Payer
                </button>
            </form>
                <div
                    role={"alert"}
                    aria-live={"polite"}
                    className={`error-message ${error ? "is-shown" : ""}`}
                >
                    {error || "\u00A0"}
                </div>

        </>
    );
};

export default TransferForm;
