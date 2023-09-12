import React from "react";
import {signIn} from "next-auth/react";
import {Button, Center, Stack, Text} from "@chakra-ui/react";
import Image from "next/image";
import {googleLogo} from "@/public/images";
import InputName from "@/components/auth/InputName";
import UserOperations from "@/lib/graphql/operations/users";
import {useMutation} from "@apollo/client";
import {AuthProps, CreateUsernameData, CreateUsernameVars} from "@/utils/types";

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
    const [createUsername, {
        data,
        loading,
        error
    }] = useMutation<CreateUsernameData, CreateUsernameVars>(UserOperations.Mutations.createUserName);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{`Submission error! ${error.message}`}</p>;

    console.log("useMutation -> ", data, loading, error);

    const onSubmit = async ({username}: { username: string }) => {
        if (!username) {
            console.log("username is empty");
            return;
        }

        try {
            await createUsername({
                variables: {
                    username: username,
                },
            });
        } catch (e) {
            console.log("error -> ", e);
        }
    };

    return (
        <Stack align="center" spacing={8}>
            <Text fontSize="3xl">Create a username</Text>
            <InputName onSubmit={onSubmit}/>
        </Stack>
    );
};

export default function Auth({session, reloadSession}: AuthProps) {
    console.log("Auth -> ", session);

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
