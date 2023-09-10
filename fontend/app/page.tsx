"use client";
import {useSession} from "next-auth/react";
import {Box} from "@chakra-ui/react";
import {Auth, Chat} from "@/components";

export default function Home() {
    const {data: session, status} = useSession();

    if (status === "loading") {
        return <h1>Loading...</h1>;
    }

    const reloadSession = () => {
    };

    return (
        <main>
            <Box>
                {(status === "authenticated" && session?.user?.username) ? <Chat/> :
                    <Auth session={session} reloadSession={reloadSession}/>}
            </Box>
        </main>
    );
}
