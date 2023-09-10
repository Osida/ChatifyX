import React from "react";
import {signIn} from "next-auth/react";
import {Session} from "next-auth";
import {Button, Center, Stack, Text} from "@chakra-ui/react";
import Image from "next/image";
import {googleLogo} from "@/public/images";
import UsernameInput from "@/components/auth/UsernameInput";

interface AuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const SignIn = () => {
    return (
        <>
            <Text fontSize="3xl">ChatifyX</Text>
            <Button
                onClick={() => signIn("google")}
                leftIcon={<Image src={googleLogo} alt="Google" width={20} height={20} className="rounded-full"/>}
            >
                Sign In with Google
            </Button>
        </>
    );
};

const CreateAccount = () => {
    const onSubmit = (data: any) => console.log("data -> ", data);

    return (
        <Stack align="center" spacing={8}>
            <Text fontSize="3xl">Create a username</Text>
            <UsernameInput onSubmit={onSubmit}/>
        </Stack>
    );
};

const Auth = ({session, reloadSession}: AuthProps) => {
    return (
        <>
            <Center h="100dvh">
                <Stack align="center" spacing={8}>
                    {session ? <CreateAccount/> : <SignIn/>}
                </Stack>
            </Center>
        </>
    );
};

export default Auth;
