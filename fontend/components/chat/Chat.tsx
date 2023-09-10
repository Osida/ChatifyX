import React from "react";
import {signOut} from "next-auth/react";

const Chat = () => {
    return (
        <div>
            <h1>Chat - Authenticated</h1>
            <button onClick={() => signOut()}>Sign In</button>
        </div>
    );
};

export default Chat;
