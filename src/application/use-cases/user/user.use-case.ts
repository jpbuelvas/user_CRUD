import {IUserUseCase} from "../../../entities/use-cases/user/user.use-case.entity";
import {User, UserCreateInput, UserUpdateInput} from "../../../entities/models/user/users.entity";
import {userErrorDescription} from "../../../presentation/controllers/user/user.controller";
import {IUserRepository, UserDataCreateInput} from "../../ports/repositories/user/user.repository";

export class UserUseCase implements IUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {
    }

    async create(input: UserCreateInput): Promise<User> {
        const user: UserCreateInput = this.validateCreateInput(input);
        const data: UserDataCreateInput = {
            email: input.email,
            firstName: input.firstName,
            secondName: input.secondName,
            secondLast: input.secondLast,
            lastName: input.lastName,
            balance: input.balance
        }
        return this.userRepository.create(data);
    }

    async delete(id: number): Promise<User | undefined> {
        const userIdFound = await this.userRepository.getById(id);
        if (userIdFound === undefined) {
            throw Error(userErrorDescription.USER_NOT_FOUND)
        }
        return this.userRepository.delete(id);
    }



    async getById(id: number): Promise<User | undefined> {
        const userIdFound = await this.userRepository.getById(id);
        if (userIdFound === undefined) {
            throw Error(userErrorDescription.PARENT_USER_NOT_FOUND)
        }
        return userIdFound;
    }

    async update(id: number, input: UserUpdateInput): Promise<User | undefined> {
        const userIdFound = await this.userRepository.getById(id);
        if (userIdFound === undefined) {
            throw Error(userErrorDescription.USER_ALREADY_EXIST)
        }
        const user: UserUpdateInput = this.validateUpdateInput(input);
        return this.userRepository.update(id, user);


    }

    private validateUpdateInput(input: UserUpdateInput): UserUpdateInput {
        let outputUser: UserUpdateInput = {
            email: input.email,
            firstName: input.firstName,
            secondName: input.secondName,
            secondLast: input.secondLast,
            lastName: input.lastName,
            balance: input.balance
        };
        return outputUser;
    }

    private validateCreateInput(input: UserCreateInput): UserCreateInput {
        const {firstName, secondName, lastName, secondLast, email, balance} = input
        if (firstName !== undefined) {
            if (firstName.length < 1) {
                throw new Error(userErrorDescription.FIRST_NAME_FAILED_PARAM)
            }
            if (firstName.length > 30) {
                throw new Error(userErrorDescription.TOO_LONG)
            }
        }

        if (lastName !== undefined) {
            if (lastName.length < 1) {
                throw new Error(userErrorDescription.LAST_NAME_FAILED_PARAM)
            }
            if (lastName.length > 30) {
                throw new Error(userErrorDescription.TOO_LONG)
            }
        }
        if (lastName !== undefined) {
            if (lastName.length < 1) {
                throw new Error(userErrorDescription.SECOND_LAST_NAME_FAILED_PARAM)
            }
        }
        if (email !== undefined) {
            if (email.length < 1) {
                throw new Error(userErrorDescription.EMAIL_FAILED_PARAM)
            }
            if (email.length > 30) {
                throw new Error(userErrorDescription.TOO_LONG)
            }
        }
        if (balance !== undefined) {
            if (balance < 1) {
                throw new Error(userErrorDescription.BALANCE_FAILED_PARAM)
            }
        }
        let outputUser: UserCreateInput = {
            email: input.email,
            firstName: input.firstName,
            secondName: input.secondName,
            secondLast: input.secondLast,
            lastName: input.lastName,
            balance: input.balance
        };
        return outputUser
    }

    async average(): Promise<number> {
        return await this.userRepository.average();
    }

    async highestBalance(): Promise<User> {
       return await this.userRepository.highestBalance();
    }
    getAll(): Promise<Array<User>> {
        return this.userRepository.getAll();
    }
}