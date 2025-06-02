// USER ROUTES
export const loginRoute = "http://localhost:8080/api/login_check";
export const registerRoute = "http://localhost:8080/api/register";
export const userRoute = (userId: number) => `http://localhost:8080/api/user/${userId}`;
export const transferPageRoute = (userId: number) => `http://localhost:8080/api/user/${userId}/transfers`;
export const addRelationRoute = (userId: number) => `http://localhost:8080/api/user/${userId}/add-relation`;
export const softDeleteRoute = (userId: number) => `http://localhost:8080/api/user/${userId}/delete-account`;
export const removeRelationRoute = (userId: number, beneficiaryId: number) => `http://localhost:8080/api/user/${userId}/remove-relation/${beneficiaryId}`;
export const changePasswordRoute = (userId: number) => `http://localhost:8080/api/user/${userId}/change-password`;
export const changeEmailRoute = (userId: number) => `http://localhost:8080/api/user/${userId}/change-email`;

// TRANSFER ROUTES
export const transferRoute = "http://localhost:8080/api/transfer";

// ADMIN ROUTES
export const deleteUserRoute = (userId: number) => `http://localhost:8080/api/admin/user/${userId}`;
export const updateUserPasswordRoute = (userId: number) => `http://localhost:8080/api/admin/user/${userId}/change-password`;
