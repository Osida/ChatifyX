import {extendTheme} from "@chakra-ui/react";

export const colors = {
    // Ocean Breeze
    brand: {
        light: {
            bg: "#F5FAFC",  // Light Background
            txt: "#303030", // Light Text
            pri: "#0091EA", // Light Primary
            sec: "#64DD17", // Light Secondary
        },
        dark: {
            bg: "#1A2B36",  // Dark Background
            txt: "#DDE2E5", // Dark Text
            pri: "#005FA9", // Dark Primary
            sec: "#358610"  // Dark Secondary
        }
    },
};

export const styles = {
    global: (props: { colorMode: string; }) => ({
        body: {
            bg: "brand.dark.bg",
            color: "brand.dark.txt",
        }
    })
};

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

export const theme = extendTheme({config, colors, styles});
