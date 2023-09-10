"use client";
import {ReactNode} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {theme} from "@/lib/chakraUI/theme";

const Provider = ({children}: { children: ReactNode }) => {
    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    );
};

export default Provider;
