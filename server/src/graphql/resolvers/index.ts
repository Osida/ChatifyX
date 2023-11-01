import {
    APIResponseData,
    ConversationDataSchema,
    MessageDataSchema,
    ParticipantDataSchema,
    UserDataSchema
} from "../../db/types";
import {
    getAllConversationsHandler,
    getAllMessagesByConversationHandler,
    getAllParticipantsByConversationHandler,
    getAllUsersHandler,
    getConversationByIdHandler,
    getUserByIdHandler
} from "../../api";

export const resolvers = {
    Query: {
        getUsers: async () => {
            const payload: {
                code: number,
                success: boolean,
                message: string,
                data: UserDataSchema | undefined
            } = {
                code: 500,
                success: false,
                message: "Internal server error",
                data: [],
            };

            try {
                const response = await getAllUsersHandler();
                const {message, data}: APIResponseData<UserDataSchema> = await response.json();

                payload.code = response.status;
                payload.success = response.status === 200;
                payload.message = message;
                payload.data = data;

                return payload;
            } catch (error) {
                console.error(`Error in resolver getUsers: `, error);
                return payload;
            }
        },
        getUserById: async (_: unknown, {id}: { id: string }) => {
            const payload: {
                code: number,
                success: boolean,
                message: string,
                data: UserDataSchema | undefined
            } = {
                code: 500,
                success: false,
                message: "Internal server error",
                data: [],
            };

            try {
                const response = await getUserByIdHandler({params: {id}});
                const {message, data}: APIResponseData<UserDataSchema> = await response.json();

                payload.code = response.status;
                payload.success = response.status === 200;
                payload.message = message;
                payload.data = data;

                return payload;
            } catch (error) {
                console.error(`Error in resolver getUserById: `, error);
                return payload;
            }
        },
        getParticipantsByConversationId: async (_: unknown, {id}: { id: string }) => {
            const payload: {
                code: number,
                success: boolean,
                message: string,
                data: ParticipantDataSchema | undefined
            } = {
                code: 500,
                success: false,
                message: "Internal server error",
                data: [],
            };

            try {
                const response = await getAllParticipantsByConversationHandler({params: {id}});
                const {message, data}: APIResponseData<ParticipantDataSchema> = await response.json();

                payload.code = response.status;
                payload.success = response.status === 200;
                payload.message = message;
                payload.data = data;

                return payload;
            } catch (error) {
                console.error(`Error in resolver getUserById: `, error);
                return payload;
            }
        },
        getConversations: async () => {
            const payload: {
                code: number,
                success: boolean,
                message: string,
                data: ConversationDataSchema | undefined
            } = {
                code: 500,
                success: false,
                message: "Internal server error",
                data: [],
            };

            try {
                const response = await getAllConversationsHandler();
                const {message, data}: APIResponseData<ConversationDataSchema> = await response.json();

                payload.code = response.status;
                payload.success = response.status === 200;
                payload.message = message;
                payload.data = data;

                return payload;
            } catch (error) {
                console.error(`Error in resolver getConversations: `, error);
                return payload;
            }
        },
        getConversationById: async (_: unknown, {id}: { id: string }) => {
            const payload: {
                code: number,
                success: boolean,
                message: string,
                data: ConversationDataSchema | undefined
            } = {
                code: 500,
                success: false,
                message: "Internal server error",
                data: [],
            };

            try {
                const response = await getConversationByIdHandler({params: {id}});
                const {message, data}: APIResponseData<ConversationDataSchema> = await response.json();

                payload.code = response.status;
                payload.success = response.status === 200;
                payload.message = message;
                payload.data = data;

                return payload;
            } catch (error) {
                console.error(`Error in resolver getConversationById: `, error);
                return payload;
            }
        },
        getMessageById: async (_: unknown, {id}: { id: string }) => {
            const payload: {
                code: number,
                success: boolean,
                message: string,
                data: MessageDataSchema | undefined
            } = {
                code: 500,
                success: false,
                message: "Internal server error",
                data: [],
            };

            try {
                const response = await getAllMessagesByConversationHandler({params: {id}});
                const {message, data}: APIResponseData<MessageDataSchema> = await response.json();

                payload.code = response.status;
                payload.success = response.status === 200;
                payload.message = message;
                payload.data = data;

                return payload;
            } catch (error) {
                console.error(`Error in resolver getAllMessagesByConversationHandler: `, error);
                return payload;
            }
        },
    }
};