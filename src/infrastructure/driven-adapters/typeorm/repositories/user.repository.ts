import {Connection, Repository, createQueryBuilder} from "typeorm";
import {GeneralRepository} from "./general.repository";
import {
    IUserRepository,
    UserDataCreateInput,
    UserDataUpdateInput
} from "../../../../application/ports/repositories/user/user.repository";
import {UserEntity} from "../entities/user.entity";
import {User} from "../../../../entities/models/user/users.entity";
import {userEntityToDomainUser} from "./common/helpers/tranform-data-to-domian";
import {userErrorDescription} from "../../../../presentation/controllers/user/user.controller";

export class UserRepository extends GeneralRepository implements IUserRepository {
    private repository: Repository<UserEntity>;

    constructor(connection: Connection) {
        super(connection)
        this.repository = connection.getRepository(UserEntity);
    }

    async create(input: UserDataCreateInput): Promise<User> {
        let userData: UserEntity = new UserEntity("firstName", "LastName", "email");
        userData.firstName = input.firstName;
        if (input.secondName !== undefined) {
            userData.secondName = input.secondName;
        }
        userData.lastName = input.lastName;
        if (input.secondLast !== undefined) {
            userData.secondLast = input.secondLast;
        }
        userData.email = input.email;
        userData.balance = input.balance;
        await this.repository.save(userData)
        return userEntityToDomainUser(userData);
    }

    async delete(id: number): Promise<User | undefined> {
        const user = await this.repository.findOne(id);
        if (user !== undefined) {
            await this.repository.softDelete(id);
        } else {
            throw new Error(userErrorDescription.USER_NOT_FOUND)

        }
        return userEntityToDomainUser(user);
    }

    async getAll(): Promise<Array<User>> {
        const users = await this.repository.find();
        return users.map(user => userEntityToDomainUser(user))
    }

    async getById(id: number): Promise<User | undefined> {
        try {
            const user = await this.repository.findOne({id: id})
            if (user === undefined) {
                throw new Error(userErrorDescription.USER_NOT_FOUND)
            }
            return userEntityToDomainUser(user);
        } catch (error: any) {
            return error;
        }
    }

    async update(id: number, input: UserDataUpdateInput): Promise<User | undefined> {
        let user = await this.repository.findOne(id);

        if (user === undefined) {
            return undefined;
        }

        if (input.firstName !== undefined) {
            user.firstName = input.firstName;
        }
        if (input.secondName !== undefined) {
            if (typeof input.secondName !== "string") {
                throw new Error(userErrorDescription.SECOND_LAST_NAME_FAILED_PARAM)
            }
            user.secondName = input.secondName;
        }
        if (input.lastName !== undefined) {
            if (typeof input.lastName !== "string") {
                throw new Error(userErrorDescription.LAST_NAME_FAILED_PARAM)
            }
            user.lastName = input.lastName;
        }

        if (input.secondLast !== undefined) {
            if (typeof input.secondLast !== "string") {
                throw new Error(userErrorDescription.SECOND_LAST_NAME_FAILED_PARAM)
            }
            user.secondLast = input.secondLast;
        }
        if (input.email !== undefined) {
            if (typeof input.email !== "string") {
                throw new Error(userErrorDescription.EMAIL_FAILED_PARAM)
            }
            user.email = input.email;
        }
        if (input.balance !== undefined) {
            if (typeof input.email !== "string") {
                throw new Error(userErrorDescription.BALANCE_FAILED_PARAM)
            }
            user.balance = input.balance;
        }
        await this.repository.save(user);
        return userEntityToDomainUser(user);
    }

    async average(): Promise<number> {
        const users = await this.repository.find();
        let average = 0;
        for (const user of users) {
            let user_domain = userEntityToDomainUser(user);
            average+=user_domain.balance;
        }
        return average/users.length;
    }

    async highestBalance(): Promise<User> {
        const user = await this.repository.createQueryBuilder("user")
            .orderBy("user.balance","DESC")
            .getOne();
        if(user){
            return userEntityToDomainUser(user);
        }else{
            throw new Error(userErrorDescription.USER_NOT_FOUND);
        }

    }

}