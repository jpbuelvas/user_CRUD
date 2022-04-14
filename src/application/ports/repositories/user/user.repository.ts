import {IRepository} from "../../repository.port";
import {User, UserCreateInput, UserUpdateInput} from "../../../../entities/models/user/users.entity";

export type UserDataUpdateInput = {
    firstName?: string,
    secondName?:string,
    lastName?: string,
    secondLast?: string,
    email?: string,
    balance?: number
}
export type UserDataCreateInput = {
    firstName: string,
    secondName?:string,
    lastName: string,
    secondLast?: string,
    email: string,
    balance: number
}
export interface IUserRepository extends IRepository{
    create(input: UserDataCreateInput): Promise<User>;
    update(id: number, input: UserDataUpdateInput): Promise<User | undefined>;
    delete(id: number): Promise<User | undefined>;
    getById(id: number): Promise<User | undefined>;
    getAll(): Promise<Array<User>>;
    average():Promise<number>;
    highestBalance(): Promise<User>;
}