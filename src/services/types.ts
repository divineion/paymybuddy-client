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

/**
 * Represents a transfer from API.
 * @property id - Unique identifier of the transfer
 * @property sender - Sender user info ({@link Beneficiary})
 * @property receiver - Receiver user info ({@link Beneficiary})
 * @property description - Transfer description
 * @property amount - Amount transferred (as string)
 * @property date - date string of the transfer (YYYY-MM-DD HH:mm:ss)
 */
export interface TransferHistoryItem {
    id: number;
    sender: Beneficiary;
    receiver: Beneficiary;
    description: string;
    amount: string;
    date: string;
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