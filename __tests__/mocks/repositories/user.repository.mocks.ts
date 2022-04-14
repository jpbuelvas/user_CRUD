import {RepositoryMock} from "./repository.mock";
import {
    IUserRepository,
    UserDataCreateInput,
    UserDataUpdateInput
} from "../../../src/application/ports/repositories/user/user.repository";
import {User} from "../../../src/entities/models/user/users.entity";
import {userErrorDescription} from "../../../src/presentation/controllers/user/user.controller";
import {mocksUser} from "../data/user-ms/user.mock";


export class UserRepositoryMock extends RepositoryMock implements IUserRepository {
    private static users: Array<User> = mocksUser

    async average(): Promise<number> {
        const users = UserRepositoryMock.users
        let average = 0;
        for (const user of users) {
            average+=user.balance;
        }
        return average/users.length;
    }

    create(input: UserDataCreateInput): Promise<User> {
        if (input.firstName === "" || input.firstName === undefined) {
            return Promise.reject(new Error(userErrorDescription.FIRST_NAME_FAILED_PARAM))
        }
        if (input.secondName === "" || input.secondName === undefined) {
            return Promise.reject(new Error(userErrorDescription.SECOND_NAME_FAILED_PARAM))
        }
        if (input.email === "" || input.email === undefined) {
            return Promise.reject(new Error(userErrorDescription.EMAIL_FAILED_PARAM))
        }
        if (input.balance < 1 || input.balance === undefined) {
            return Promise.reject(new Error(userErrorDescription.BALANCE_FAILED_PARAM))
        }
        const createdUser: User = {
            email: input.email,
            firstName: input.firstName,
            secondName: input.secondName,
            secondLast:input.secondName,
            lastName: input.lastName,
            balance: input.balance,
            createDate: new Date(),
            deleteDate: null,
            id: UserRepositoryMock.users.length + 1,
            updateDate: new Date(),
        }
        UserRepositoryMock.users.push(createdUser)
        return Promise.resolve(createdUser)
    }

    delete(id: number): Promise<User | undefined> {
        const user = UserRepositoryMock.users.find(user => user.id === id);
        if (user === undefined) {
            return Promise.reject(new Error((userErrorDescription.USER_NOT_FOUND)))
        }
        UserRepositoryMock.users = UserRepositoryMock.users.filter(user => user.id !== id)
        return Promise.resolve(user);
    }

    getAll(): Promise<Array<User>> {
        const users = UserRepositoryMock.users
        if (users.length === 0) {
            return Promise.resolve([])
        }
        return Promise.resolve(users)
    }

    async getById(id: number): Promise<User | undefined> {
        const user = await UserRepositoryMock.users.find(user => user.id === id)
        if (user === undefined) {
            return await Promise.resolve(undefined)
        }
        return await Promise.resolve(user)
    }

    async highestBalance(): Promise<User> {
        const users = UserRepositoryMock.users
        const organized = users.sort((a ,b) =>b.balance - a.balance)
        return organized[0];
    }

    update(id: number, input: UserDataUpdateInput): Promise<User | undefined> {
        const user = UserRepositoryMock.users.find(user => user.id === id);
        if (user === undefined) {
            return Promise.reject(new Error((userErrorDescription.USER_NOT_FOUND)))
        }
        if (input.firstName !== undefined) {
            user.firstName = input.firstName;
        }
        if (input.secondName !== undefined) {
            user.secondName = input.secondName;
        }
        if (input.lastName !== undefined) {
            user.lastName = input.lastName;
        }
        if (input.secondLast !== undefined) {
            user.secondLast = input.secondLast;
        }
        if (input.email !== undefined) {
            user.email = input.email;
        }
        if (input.balance !== undefined) {
            user.balance = input.balance;
        }
        UserRepositoryMock.users[user.id - 1] = user;
        return Promise.resolve(user);
    }

}