import {dbTables} from "../../db";
import {RouteConfig} from "../../db/types";

export const usersConfig: Record<string, RouteConfig> = {
    getAllUsersHandler: {
        table: dbTables.users,
        successMessage: "Successfully retrieved users",
        notFoundMessage: "No users were found",
    },
    getUserByIdHandler: {
        table: dbTables.users,
        successMessage: "Successfully retrieved the user",
        notFoundMessage: "No user was found",
    },
    createUserHandler: {
        table: dbTables.users,
        successMessage: "Successfully created a user",
        notFoundMessage: "No user was created",
    },
    updateUserHandler: {
        table: dbTables.users,
        successMessage: "Successfully updated the user",
        notFoundMessage: "No user was updated",
    },
    deleteUserHandler: {
        table: dbTables.users,
        successMessage: "Successfully deleted the user",
        notFoundMessage: "No user was deleted",
    },
    getUserByUsernameHandler: {
        table: dbTables.users,
        successMessage: "Successfully retrieved the user by username",
        notFoundMessage: "No user was found by username",
    },
};