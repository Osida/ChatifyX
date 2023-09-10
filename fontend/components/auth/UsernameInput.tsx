"use client";
import React from "react";
import {useForm} from "react-hook-form";
import {Button, Input, Stack} from "@chakra-ui/react";


interface Props {
    onSubmit: (data: any) => void;
}

interface FormSchema {
    username: string;
}

const UsernameInput = ({onSubmit}: Props) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<FormSchema>();

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack align="center" spacing={8}>
                    <Input placeholder="Enter a username" {...register("username")} />
                    {/*{errors.username && <span>This field is required</span>}*/}
                    <Button type="submit" width="100%">Save</Button>
                </Stack>
            </form>
        </>
    );
};

export default UsernameInput;
