import {UserRepositoryMock} from "../../mocks/repositories/user.repository.mocks";
import {UserUseCase} from "../../../src/application/use-cases/user/user.use-case";
import {
    mockUserBalanceNoValid,
    mockUserEmptyEmail, mockUserEmptyfirstName, mockUserEmptysecondName, mockUserFirstnameTooLong,
    mockUserInValid,
    mockUserNoFirstname, mockUserUdpdateValid
} from "../../mocks/data/user-ms/user.mock";
import {userErrorDescription} from "../../../src/presentation/controllers/user/user.controller";


const userRepository = new UserRepositoryMock()
export const userUseCaseMock = new UserUseCase(userRepository)
describe("USER USE-CASE", function () {
    let createdUser: number = -1
    beforeAll(() => {
        jest.resetAllMocks()
        jest.restoreAllMocks()
    })
    describe("create", function () {
        it('should create', async function () {
            const user = await userUseCaseMock.create(mockUserInValid)
            expect(user).toBeDefined()
            createdUser = user.id
        });

        it('should not create if email is empty', function () {
            expect(userUseCaseMock.create(mockUserEmptyEmail)).rejects.toHaveProperty("message", userErrorDescription.EMAIL_FAILED_PARAM)
        });
        it('should not create if firstName is empty', function () {
            expect(userUseCaseMock.create(mockUserEmptyfirstName)).rejects.toHaveProperty('message', userErrorDescription.FIRST_NAME_FAILED_PARAM);
        });
        it('should not create if secondName is empty', function () {
            expect(userUseCaseMock.create(mockUserEmptysecondName)).rejects.toHaveProperty('message', userErrorDescription.SECOND_NAME_FAILED_PARAM);
        });
        it('should return error when balance length is greater than 1', function () {
            expect(userUseCaseMock.create(mockUserBalanceNoValid)).rejects.toHaveProperty('message', userErrorDescription.BALANCE_FAILED_PARAM);
        });
    })
    describe("get by id", function () {
        it('should get by id', function () {
            const user = userUseCaseMock.getById(1)
            expect(user).toBeDefined()
        });
        it('should not get by id', async function () {
            const user = await userUseCaseMock.getById(0)
            expect(user).not.toBeDefined()
        });
    })
    describe("get all", function () {
        it('should get all users', async function () {
            const users = await userUseCaseMock.getAll()
            expect(users).toBeDefined()
            expect(users).toHaveProperty("length")
        });
    })

    describe("delete", function () {
        it('should delete', async function () {
            const user = await userUseCaseMock.delete(1)
            expect(user).toBeDefined()
        });
        it('should not delete if user does not exist', async function () {
            const user = await userUseCaseMock.delete(0)
            expect(user).not.toBeDefined();
        });
    })
    describe("update", function () {
        it('should update', async function () {
            const user = await userUseCaseMock.update(1, mockUserUdpdateValid)
            expect(user).toBeDefined()
        })
        it('should not update when id already exist', function () {
            expect(userUseCaseMock.update(1, mockUserUdpdateValid)).rejects.toHaveProperty("message", userErrorDescription.USER_NOT_FOUND)
        });
        it('should not update when first name is too long', async function () {
            await expect(userUseCaseMock.update(1, mockUserFirstnameTooLong)).rejects.toHaveProperty('message', userErrorDescription.TOO_LONG);
        });
    })
})