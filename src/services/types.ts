export interface User {
    id: number;
    username: string;
    email: string;
    balance: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserAccount {
    username: string;
    email: string;
    password: string;
}

export interface TransferRequest {
    receiverId: number;
    description: string;
    amount: string;
}

export interface Beneficiary {
    id: number;
    username: string;
}

export interface Transfer {
    id: number;
    sender: Beneficiary;
    receiver: Beneficiary;
    description: string;
    amount: string;
    date: string;
}

export interface TransferPage {
    id: number;
    beneficiaries: Beneficiary[];
    balance: string;
    sentTransfers: Transfer[];
    receivedTransfers: Transfer[];
}

export interface EmailRequest {
    email: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface ChangeEmail {
    oldEmail: string;
    newEmail: string;
}

export interface ApiResponse {
    message: string;
}

export interface CustomError {
    status?: number;
    message?: string;
}

export interface TransferFormProps {
    beneficiaries: Beneficiary[];
    onSubmit: (transferData: TransferRequest) => void;
}