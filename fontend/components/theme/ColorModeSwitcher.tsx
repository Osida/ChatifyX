"use client";
import React from "react";
import {IconButton, useColorMode} from "@chakra-ui/react";
import {HiMoon, HiSun} from "react-icons/hi2";

const ColorModeSwitcher = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <>
            <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "dark" ? <HiSun/> : <HiMoon/>}
                onClick={toggleColorMode}
            />
        </>
    );
};

export default ColorModeSwitcher;
