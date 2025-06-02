"use client"; // useRouter fonctionne côté client
import Link from "next/link";
import {useAuth} from "@/contexts/AuthContext";

const Navbar = () => {

    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <nav className={"header-nav"} aria-label={"Menu principal"}>
                <Link href={"/"}>Pay My Buddy</Link>
                <ul>
                    <li><Link href={"/transfer"}>Transférer</Link></li>
                    <li><Link href={"/profile"}>Profil</Link></li>
                    <li><Link href={"/add-relation"}>Ajouter relation</Link></li>
                    <li>
                        <button className={"header-nav__logout-button"} onClick={handleLogout}>
                            Se déconnecter
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;