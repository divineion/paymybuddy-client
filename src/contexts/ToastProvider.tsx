"use client";
import React, {createContext, useContext, useEffect, useRef, useState} from "react";

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

    const toastRef = useRef<HTMLDivElement>(null);


    // donne r le focu au toast dès son apparyition pour qu'il soit annoncé immédiatement par le lecteur d'écran
    useEffect(() => {
        if (visible && toast?.variant === "destructive" && toastRef.current) {
            toastRef.current?.focus();
        }
    }, [visible, toast]);

    const showToast = (options: ToastOptions) => {
        setToast(options);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 10000);
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
                    style={{ minWidth: "250px"
                }}
                    ref={toastRef} //accéder au DOM pour le focus
                    tabIndex={-1} //donner le focus au div sans qu’il soit accessible au tab normal
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