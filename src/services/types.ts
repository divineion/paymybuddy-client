import bigDecimal from 'js-big-decimal';

export interface User {
    id: number;
    username: string;
    email: string;
    balance: bigDecimal;
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
    id: number;
    receiverId: number;
    description: string;
    amount: bigDecimal;
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
    amount: bigDecimal;
    date: string;
}

export interface TransferPage {
    id: number;
    beneficiaries: Beneficiary[];
    balance: bigDecimal;
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
