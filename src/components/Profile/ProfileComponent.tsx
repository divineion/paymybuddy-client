"use client";
import ProfileForm from "../Forms/ProfileForm"
import {useEffect} from "react";
import {frontLoginRoute} from "@/constants/frontRoutes";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";

const ProfileComponent = () => {
    const {loading, isLoggedIn, authCheck} = useAuth();
    const router = useRouter();
    useEffect(() => {
        authCheck();
    }, []);

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push(frontLoginRoute);
        }
    }, [loading, isLoggedIn]);
    return (
        <>
        <ProfileForm></ProfileForm>
        </>

    )

}

export default ProfileComponent