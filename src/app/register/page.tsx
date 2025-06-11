import AuthForm from "@/components/Forms/AuthForm";
import {REGISTER_PAGE_TITLE} from "@/constants/titleTags";

export const metadata = {
    title: REGISTER_PAGE_TITLE,
};

const RegisterPage = () => {
    return (
        <main className={"main"}>
            <AuthForm mode={"register"}/>
        </main>
    )
}

export default RegisterPage;