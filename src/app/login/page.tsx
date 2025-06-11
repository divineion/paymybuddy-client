import AuthForm from "@/components/Forms/AuthForm";
import {LOGIN_PAGE_TITLE} from "@/constants/titleTags";

export const metadata = {
    title: LOGIN_PAGE_TITLE,
};

const LoginPage = () => {
    return (
        <main className={"main"}>
            <AuthForm mode={"login"}/>
        </main>
    )
}

export default LoginPage;