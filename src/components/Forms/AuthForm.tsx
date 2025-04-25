import styles from '../../styles/components/auth-form.module.scss';

type AuthFormProps = {
    mode: "login" | "register";
};

const AuthForm = ({mode}: AuthFormProps) => {
    return (
        <>
            <form method={"post"} className={styles["form-container"]}>
                <button className={"btn btn-warning"}>Pay My Buddy</button>
                <div className={"input-wrapper"}>
                    {mode === "register" && (
                        <input
                            name={"username"}
                            autoComplete={"off"}
                            placeholder={"Username"}
                            className={"form-control"}
                        />
                    )}
                    <input
                        name={"email"}
                        placeholder={"Mail"}
                        autoComplete={"off"}
                        className={"form-control"}
                    />
                    <input
                        name={"password"}
                        placeholder={"Mot de passe"}
                        className={"form-control"}
                    />
                </div>
                <button type={"submit"} className="btn btn-primary">
                    {mode === "login" ? "Se connecter" : "S'inscrire"}
                </button>
            </form>
        </>
    )
}

export default AuthForm;