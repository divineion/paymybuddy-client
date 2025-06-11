export const GENERIC_ERROR_TITLE = 'Erreur';
export const GENERIC_ERROR_MESSAGE  = 'Une erreur est survenue';

export const USER_NOT_FOUND_MESSAGE = "L'utilisateur n'a pas été trouvé";
export const EMAIL_ALREADY_EXISTS_MESSAGE = "Cette adresse e-mail est déjà associée à un compte existant.";
export const UNKNOWN_EMAIL_ADDRESS = "Cette adresse email est inconnue.";
export const FORBIDDEN_RESOURCE_ACCESS = "Accès refusé : vous ne pouvez pas consulter les informations d’un autre utilisateur."
export const FORBIDDEN_RESOURCE_UPDATE = "Accès refusé : vous ne pouvez pas modifier cette ressource."

export const CREDENTIALS_UPDATE_SUCCESS_TITLE = "Identifiants modifiés.";
export const CREDENTIALS_UPDATE_SUCCESS_MESSAGE = "Veuillez vous reconnecter.";
export const INVALID_CREDENTIALS_MESSAGE = "Veuillez vérifier votre email et votre mot de passe.";

export const LOGIN_SUCCESS_TITLE = 'Connexion réussie.';
export const LOGIN_SUCCESS_MESSAGE = 'Bienvenue !';
export const GENERIC_LOGIN_ERROR_MESSAGE = 'Erreur lors de la connexion';

export const LOGOUT_SUCCESS_TITLE = "Déconnexion";
export const LOGOUT_SUCCESS_MESSAGE = "Vous êtes déconnecté·e"
export const LOGOUT_ERROR_MESSAGE = "Erreur lors de la déconnexion";

export const REGISTRATION_SUCCESS_TITLE = 'Inscription réussie.';
export const REGISTRATION_SUCCESS_MESSAGE = 'Bienvenue !';
export const GENERIC_REGISTRATION_ERROR_MESSAGE = "Erreur lors de l'inscription.";

export const TRANSFER_SUCCESS_TITLE = "Transfert effectué";
export const TRANSFER_SUCCESS_MESSAGE = (username: string) => `La transaction à destination de ${username} a bien été réalisée`;
export const INSUFFICIENT_BALANCE_OR_AMOUNT_EXCEPTION = "Veuillez vérifier votre solde et le montant à transférer";

export const RELATION_SUCCESSFULLY_ADDED_TITLE = "Relation ajoutée.";
export const RELATION_SUCCESSFULLY_ADDED_MESSAGE = (username: string) => `La relation avec ${username} bien été enregistrée.`;
export const ADD_RELATION_GENERIC_FAILURE_ERROR_MESSAGE = 'Erreur lors de l’ajout de la relation.';
export const RELATION_ALREADY_EXISTS_MESSAGE = "Cet utilisateur fait déjà partie de vos relations."
export const SELF_RELATION_ERROR = "vous ne pouvez pas ajouter votre propre compte en bénéficiaire."

export const FETCH_PROFILE_MESSAGE = "Echec lors du chargement du profil.";
export const PASSWORD_MISMATCH_ERROR = "Les mots de passe ne correspondent pas."
