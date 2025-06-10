"use client";

import {useAuth} from "@/contexts/AuthContext";
import React, {useEffect, useRef, useState} from "react";
import {changeUserInfo, fetchProfile} from "@/services/user";
import {useToast} from "@/contexts/ToastProvider";

const ProfileForm = () => {
    const {user, authCheck, isLoggedIn, logout} = useAuth();
    const toast = useToast();

    const [error, setError] = useState("");

    const [username, setUsername] = useState('');
    const [initialEmail, setInitialEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [initialPassword, setInitialPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [onUsernameEdit, setOnUsernameEdit] = useState(false);
    const [onEmailEdit, setOnEmailEdit] = useState(false);
    const [onPasswordEdit, setOnPasswordEdit] = useState(false);
    const [onNewPasswordEdit, setOnNewPasswordEdit] = useState(false);

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const newPasswordInputRef = useRef<HTMLInputElement>(null);

    const userId = user?.id;

    useEffect(() => {
        authCheck();
    }, [isLoggedIn]);

    useEffect(() => {
        const loadProfile = async () => {
            if (!userId) {
                return;
            }
            try {
                if (userId && !onUsernameEdit && !onPasswordEdit && !onEmailEdit) {
                    const response = await fetchProfile(userId)
                    // setstate même si la réponse est undefined
                    setInitialEmail(response.email || '');
                    setUsername(response.username || '');
                }
            } catch (error: unknown) {
                console.error(error);
                setError("Echec lors du chargement du profil");
            }
        }

        loadProfile()
    }, [userId]);

    const toggleOnUsernameEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onUsernameEdit) {
            setError("")
            setOnUsernameEdit(false);
        } else {
            //ou activation du mode édition
            setError("Pour modifier le nom d'utilisateur, veuillez consulter l'administrateur");
            setOnUsernameEdit(true)
        }
    }

    const toggleOnEmailEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        // quitter le mode edition
        if (onEmailEdit && userId && newEmail) {
            // //récup newEmail si saisie utilisateur,  sinon garder la valeur initiale
            if (newEmail) {
                setInitialEmail(newEmail.trim());
            }

            setOnEmailEdit(false);
        } else {
            //ou activation du mode édition
            if (!newEmail || newEmail.trim() === '') {
                setNewEmail(initialEmail);
            }

            setOnPasswordEdit(false);
            setOnUsernameEdit(false);
            setOnEmailEdit(true);

            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 0);
        }
    }

    const toggleOnPasswordEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onPasswordEdit) {
            setOnPasswordEdit(false);
        } else {
            setOnEmailEdit(false);
            setOnUsernameEdit(false);
            setOnNewPasswordEdit(true);
            setOnPasswordEdit(true);

            setTimeout(() => {
                passwordInputRef.current?.focus();
            }, 0);
        }
    }

    const toggleOnNewPasswordEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (onNewPasswordEdit) {
            setOnNewPasswordEdit(false);
        } else {
//            if (!newPassword  || newPassword.trim() === '') {
                //setNewPassword(initialPassword);
  //          }
            setOnEmailEdit(false);
            setOnUsernameEdit(false);
            setOnPasswordEdit(true);
            setOnNewPasswordEdit(true);

            setTimeout(() => {
                newPasswordInputRef.current?.focus();
            }, 0);
        }
    }

    const toggleShowPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setShowPassword(!showPassword);
        passwordInputRef.current?.focus();
    }

    const toggleShowNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowNewPassword(!showNewPassword);
        newPasswordInputRef.current?.focus();
    }

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
        setInitialEmail(e.target.value);
    };

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInitialPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userId)
            try {
                const response = await changeUserInfo(userId, {
                    email: newEmail || initialEmail,
                    currentPassword: initialPassword,
                    newPassword: newPassword || initialPassword,
                });

                toast({
                    title: "Identifiants modifiés avec succès",
                    message: "Veuillez vous reconnecter",
                    variant: "success"
                });

                setTimeout(() => {
                    logout();
                }, 5000)
            } catch (error: unknown) {
                console.error(error)
            }
    }

    return (
        <>
            <form className={"update-profile"} onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <div className={"username-form-group-field"}>
                        <label
                            htmlFor="profile-username-input"
                            className="profile-username-label">
                            Username
                        </label>
                        <div className={"update-profile__input-wrapper"}>
                            <input
                                type="text"
                                id="profile-username-input"
                                className="profile-username-input"
                                value={username}
                                ref={usernameInputRef}
                                disabled={!onUsernameEdit}
                                autoComplete={"off"}
                            />
                            <button
                                aria-label="En savoir plus sur le changement de nom d'utilisateur"
                                role={"button"}
                                onClick={toggleOnUsernameEdit}
                                title={
                                    onUsernameEdit ?
                                        "Masquer les informations sur le nom d'utilisateur"
                                        : "Afficher les informations sur le nom d'utilisateur"
                                }
                            >
                                <svg className={"edit-button-svg"} width="20" height="20" viewBox="0 0 20 20"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5" clipPath="url(#clip0_38_652)">
                                        <path
                                            d="M14 14.385L14.7184 15.1034L20.0009 10.0309L14.7184 4.95787L14 5.67628L18.5662 10.0309L14 14.385Z"
                                            fillOpacity="1"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_38_652">
                                            <rect width="20" height="20"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p className={
                        onUsernameEdit ?
                            "username-input-error visible"
                            : "username-input-error invisible"
                    }>
                        Pour changer de nom d'utilisateur, veuillez contacter l'administrateur
                    </p>
                </div>


                <div className={"form-group"}>
                    <div className={"email-form-group-field"}>
                        <label
                            htmlFor="profile-email-input"
                            className="profile-email-label">
                            Mail
                        </label>
                        <div className={"update-profile__input-wrapper"}>
                            <input
                                type="email"
                                id="profile-email-input"
                                className="profile-email-input"
                                value={onEmailEdit ? newEmail : initialEmail}
                                ref={emailInputRef}
                                disabled={!onEmailEdit}
                                onChange={handleEmailInputChange}
                                required
                            />
                            <button
                                role={"button"}
                                aria-label={"Modifier votre adresse email"}
                                onClick={toggleOnEmailEdit}
                                title={
                                    onEmailEdit ?
                                        "Valider votre adresse e-mail"
                                        : "Editer votre adresse email"
                                }
                            >
                                <svg className={"edit-button-svg"} width="20" height="20" viewBox="0 0 20 20"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5" clipPath="url(#clip0_38_652)">
                                        <path
                                            d="M14 14.385L14.7184 15.1034L20.0009 10.0309L14.7184 4.95787L14 5.67628L18.5662 10.0309L14 14.385Z"
                                            fillOpacity="1"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_38_652">
                                            <rect width="20" height="20"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p className={"email-input-error"}>Email input error text</p>
                </div>

                <div className={"form-group"}>
                    <div className={"password-form-group-field"}>
                        <label
                            htmlFor="profile-password-input"
                            className="profile-password-label">
                            Mot de passe
                        </label>
                        <div className={"update-profile__input-wrapper"}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="profile-password-input"
                                className="profile-password-input"
                                autoComplete={"off"}
                                ref={passwordInputRef}
                                value={initialPassword}
                                disabled={!onPasswordEdit}
                                onChange={handlePasswordInputChange}
                                required
                            />
                            <button
                                aria-label={"Modifier votre mot de passe"}
                                role={"button"}
                                onClick={toggleShowPassword}
                                className={"show-password-toggle-button"}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                            <button
                                onClick={toggleOnPasswordEdit}
                                title={
                                    onPasswordEdit ?
                                        "Valider votre mot de passe actuel"
                                        : "Editer votre mot de passe"
                                }
                            >
                                <svg className={"edit-button-svg"} width="20" height="20" viewBox="0 0 20 20"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5" clipPath="url(#clip0_38_652)">
                                        <path
                                            d="M14 14.385L14.7184 15.1034L20.0009 10.0309L14.7184 4.95787L14 5.67628L18.5662 10.0309L14 14.385Z"
                                            fillOpacity="1"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_38_652">
                                            <rect width="20" height="20"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p className={"password-input-error"}>Password input error text</p>
                </div>

                { onPasswordEdit &&
                <div className={"form-group"}>
                    <div className={"new-password-form-group-field"}>
                        <label
                            htmlFor="profile-new-password-input"
                            className="profile-new-password-label"
                            role="textbox"
                        >
                            Nouveau mot de passe
                        </label>
                        <div className={"update-profile__input-wrapper"}>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="profile-new-password-input"
                                className="profile-new-password-input"
                                autoComplete={"off"}
                                value={newPassword}
                                ref={newPasswordInputRef}
                                disabled={!onNewPasswordEdit}
                                onChange={e => setNewPassword(e.target.value)}
                                aria-required="true"
                            />
                            <button
                                aria-label={"Saisir votre nouveau mot de passe"}
                                role={"button"}
                                onClick={toggleShowNewPassword}
                                className={"show-password-toggle-button"}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            </button>
                            <button
                                onClick={toggleOnNewPasswordEdit}
                                title={
                                    onNewPasswordEdit ?
                                        "Valider votre nouveau mot de passe actuel"
                                        : "Saisir votre mot de passe"
                                }
                            >
                                <svg className={"edit-button-svg"} width="20" height="20" viewBox="0 0 20 20"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5" clipPath="url(#clip0_38_652)">
                                        <path
                                            d="M14 14.385L14.7184 15.1034L20.0009 10.0309L14.7184 4.95787L14 5.67628L18.5662 10.0309L14 14.385Z"
                                            fillOpacity="1"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_38_652">
                                            <rect width="20" height="20"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                }

                <div className={"button-wrapper"}>
                    <button type={"submit"}>Modifier</button>
                </div>
            </form>
        </>
    )
}


export default ProfileForm;