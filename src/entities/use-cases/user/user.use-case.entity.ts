import {User, UserCreateInput, UserUpdateInput} from '../../models/user/users.entity';
export interface IUserUseCase {
    /**
     *
     * @param input
     */
    create(input: UserCreateInput): Promise<User>;
    delete(id: number): Promise<User | undefined>;
    getById(id: number): Promise<User | undefined>;
    getAll(): Promise<Array<User>>;
    update(id: number, input: UserUpdateInput): Promise<User | undefined>;
    average():Promise<number>;
    highestBalance(): Promise<User>;
}