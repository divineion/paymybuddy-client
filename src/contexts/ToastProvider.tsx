"use client";
import React, {createContext, useContext, useState} from "react";

type ToastVariant = "default" | "destructive" | "success" | "info";

type ToastOptions = {
    title: string;
    message?: string;
    variant?: ToastVariant;
};

const ToastContext = createContext<(options: ToastOptions) => void>(() => {});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastOptions | null>(null);
    const [visible, setVisible] = useState(false);

    const showToast = (options: ToastOptions) => {
        setToast(options);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 5000);
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {toast && (
                <div
                    className={`toast position-fixed bottom-0 end-0 m-3 ${
                        visible ? "show" : ""
                    } ${toast.variant}`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ minWidth: "250px" }}
                >
                    <div className="toast-header">
                        <strong className="me-auto">{toast.title}</strong>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={() => setVisible(false)}
                        ></button>
                    </div>
                    {toast.message && <div className="toast-body">{toast.message}</div>}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);