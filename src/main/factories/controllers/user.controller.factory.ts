import {getDbConnection} from '../../../infrastructure/driven-adapters/typeorm/config/db.config';
import {UserRepository} from "../../../infrastructure/driven-adapters/typeorm/repositories/user.repository";
import {UserController} from "../../../presentation/controllers/user/user.controller";
import {UserUseCase} from "../../../application/use-cases/user/user.use-case";
import {GeneralResponseHandler} from "../../../presentation/responses/general-response-handler.adapter";



export function createUserControllerFactory() {

        const dbConnection = getDbConnection();
        const userRepository = new UserRepository(dbConnection);
    const userUseCase = new UserUseCase(userRepository);

    const userController = new UserController(userUseCase, new GeneralResponseHandler());

    return {
        userController
    }
}