import {IRepository} from "../../../src/application/ports/repositories/repository.port";

export class RepositoryMock implements IRepository {
    async transaction(transaction: <T>(manager: T) => Promise<void>): Promise<void> {
        const manager: any = {};
        await transaction(manager);
    }

}
