import Header from "@/components/Header/Header";
import ProfileComponent from "@/components/Profile/ProfileComponent";

const ProfilePage = () => {
    return (
        <>
            <Header></Header>
            <main className={"main"}>
                <ProfileComponent/>
            </main>
        </>
    )
}

export default ProfilePage;