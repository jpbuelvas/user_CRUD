import {Controller, ControllerAction} from "../../../application/ports/controllers/controller.port";
import {UserUseCase} from "../../../application/use-cases/user/user.use-case";
import {ResponseHandler, ResponseModel} from "../../../application/ports/responses/response.port";
import {User, UserCreateInput} from "../../../entities/models/user/users.entity";
import {RequestModel} from "../../../application/ports/requests/request.port";

export type UserCreateRequestInput = {
    firstName: string,
    secondName?:string,
    lastName: string,
    secondLast?: string,
    email: string,
    balance: number
};

export type UserUpdateRequestInput = {
    firstName?: string,
    secondName?:string,
    lastName?: string,
    secondLast?: string,
    email?: string,
    balance?: number
};
export type UserParamsRequestInput = {
    id: number;
}
export enum userErrorDescription {
    FIRST_NAME_FAILED_PARAM = "First name is mandatory, should not be empty",
    SECOND_NAME_FAILED_PARAM = "Second name is mandatory, should not be empty",
    LAST_NAME_FAILED_PARAM = "Last name is mandatory, should not be empty",
    SECOND_LAST_NAME_FAILED_PARAM = "Last name is mandatory, should not be empty",
    EMAIL_FAILED_PARAM = "Description is mandatory, should not be empty",
    BALANCE_FAILED_PARAM ="Balance must be mandatory and greater than 0 ",
    BODY_NOT_PROVIDED = "Body was not provided",
    USER_ALREADY_EXIST = "A user with the same title or code already exist",
    PARENT_USER_NOT_FOUND = "Parent user with given id does not exist",
    TOO_LONG = "too long, it should not have a length greater than 30 characters",
    ID_NOT_PROVIDED = "Cannot start this operation without an id",
    USER_NOT_FOUND = "The user you are looking for does not exist",
    PARAM_WRONG_TYPE = "Some param or params do not have the correct type"
}
export class UserController implements Controller{
    public static instance: UserController;
    [name: string]: ControllerAction | unknown;
    constructor(private readonly userUseCase: UserUseCase, private readonly responseHandler: ResponseHandler) {
        UserController.instance = this;
    }
    /**
     * Create un user
     */
    async create(request: RequestModel<UserCreateRequestInput>): Promise<ResponseModel<User>> {
        try {
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error(userErrorDescription.BODY_NOT_PROVIDED);
            }
            const user = await UserController.instance.userUseCase.create(request.body);
            return await UserController.instance.responseHandler.response('success', 201, user);
        } catch (error: any) {
            return await UserController.instance.errorHandler(error);
        }
    }

    /**
     * Update user by id
     * @param request
     *
     */
    async update(request: RequestModel<UserUpdateRequestInput, UserParamsRequestInput>): Promise<ResponseModel<User | undefined>> {
        try {
            if (!request.body || Object.keys(request.body).length === 0) {
                throw new Error(userErrorDescription.BODY_NOT_PROVIDED);
            }
            if (request.params?.id === undefined) {
                throw new Error(userErrorDescription.ID_NOT_PROVIDED);
            }
            const updatedUser = await UserController.instance.userUseCase.update(request.params?.id, request.body);
            return await UserController.instance.responseHandler.response('success', 200, updatedUser)
        } catch (error: any) {
            return await UserController.instance.errorHandler(error);
        }
    }
    /**
     * Delete user by id
     */
    async delete(request: RequestModel<UserParamsRequestInput>): Promise<ResponseModel<User | undefined>> {
        try {
            if (request.params?.id === undefined) {
                throw new Error(userErrorDescription.ID_NOT_PROVIDED);
            }
            const user = await UserController.instance.userUseCase.getById(request.params.id)
            if (user === undefined) {
                throw new Error(userErrorDescription.USER_NOT_FOUND);
            }
            await UserController.instance.userUseCase.delete(request.params.id)
            return await UserController.instance.responseHandler.response("success", 202, user)
        } catch (error: any) {
            return await UserController.instance.errorHandler(error);
        }
    }

    /**
     * Get all Users
     * @param request
     *
     */
    async getAll(request: RequestModel<any>): Promise<ResponseModel<User[]>> {
        try {
            const users = await UserController.instance.userUseCase.getAll()
            return await UserController.instance.responseHandler.response("success", 200, users)
        } catch (error: any) {
            return <any>await UserController.instance.errorHandler(error);
        }
    }
    async average(request: RequestModel<any>): Promise<ResponseModel<number>> {
        try {
            const users = await UserController.instance.userUseCase.average()
            return await UserController.instance.responseHandler.response("success", 200, users)
        } catch (error: any) {
            return <any>await UserController.instance.errorHandler(error);
        }
    }
    async highestBalance(request: RequestModel<any>): Promise<ResponseModel<User>> {
        try {
            const users = await UserController.instance.userUseCase.highestBalance()
            return await UserController.instance.responseHandler.response("success", 200, users)
        } catch (error: any) {
            return <any>await UserController.instance.errorHandler(error);
        }
    }
        async getById(request: RequestModel<UserParamsRequestInput>): Promise<ResponseModel<User>> {
        try {
            if (request.params?.id === undefined) {
                throw new Error(userErrorDescription.ID_NOT_PROVIDED)
            }
            const topic = await UserController.instance.userUseCase.getById(request.params?.id);
            if (topic !== undefined) {
                return await UserController.instance.responseHandler.response("success", 200, topic)
            } else {
                throw new Error(userErrorDescription.USER_NOT_FOUND)
            }
        } catch (error: any) {
            if (error.message.includes(userErrorDescription.USER_NOT_FOUND)) {
                return await UserController.instance.responseHandler.response('error', 404, error.message);
            }
            return await UserController.instance.errorHandler(error);
        }
    }

    private async errorHandler(error: any): Promise<ResponseModel<User>> {
        let code: number = 500;
        let errorMessage = error.message
        if (errorMessage === userErrorDescription.USER_NOT_FOUND || errorMessage === userErrorDescription.PARENT_USER_NOT_FOUND) {
            code = 404;
        } else if (Object.values(userErrorDescription).includes(errorMessage)) {
            code = 400;
        } else if (errorMessage.includes("input syntax is invalid for type")) {
            code = 400;
            errorMessage = userErrorDescription.PARAM_WRONG_TYPE
        } else if (error._status === 401) {
            code = 401;
            errorMessage = error._rawErrorMessage
        }
        return await UserController.instance.responseHandler.response('error', code, errorMessage);
    }

}