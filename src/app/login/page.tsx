import AuthForm from "@/components/Forms/AuthForm";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Connexion',
}

const LoginPage = () => {
    return (
        <main className={"main"}>
            <AuthForm mode={"login"}/>
        </main>
    )
}

export default LoginPage;