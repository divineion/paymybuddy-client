import Link from "next/link";

const Navbar = () => {
    return (
        <>
            <nav className={"header-nav"}>
                <Link href={"/"}>Pay My Buddy</Link>
                <ul>
                    <li><Link href={"/transfer"}>Transférer</Link></li>
                    <li><Link href={"/profile"}>Profil</Link></li>
                    <li><Link href={"/add-relation"}>Ajouter relation</Link></li>
                    <li><Link href={"/logout"}>Se déconnecter</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;