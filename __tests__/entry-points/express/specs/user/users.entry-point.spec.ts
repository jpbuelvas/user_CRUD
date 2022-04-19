import {SuperAgentTest} from "supertest";
import {closeApp, initApp, initDbConnection} from "../../helpers/global.helper";
import {userErrorDescription} from "../../../../../src/presentation/controllers/user/user.controller";
import {UserCreateInput} from "../../../../../src/entities/models/user/users.entity";
import {
    mockUserBalanceNoValid, mockUserEmptyEmail, mockUserEmptyfirstName, mockUserEmptysecondName,
    mockUserFirstnameTooLong, mockUserGmailTooLong, mockUserLastnameTooLong, mockUserNoEmail,
    mockUserNoFirstname, mockUserNolastName,
    mockUserValid
} from "../../../../mocks/data/user-ms/user.mock";

export let createdUserId: number = -1

describe("#INTEGRATION USER", () => {
    let runtimeConfig: {
        app: SuperAgentTest
    } = {app: <SuperAgentTest><unknown>null}
    beforeAll(async () => {
        await initDbConnection()
        runtimeConfig.app = await initApp()},1000);
    afterAll(async () => {
        await runtimeConfig.app.delete("/api/v1/user/users/" + createdUserId)
        await closeApp()
    })
    describe("POST user/users/", () => {
        it("should create a user", async () => {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserValid)
            expect(response.body.data).not.toBe(userErrorDescription.USER_ALREADY_EXIST)
            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty("status", "success")
            expect(response.body).toHaveProperty("data")
            createdUserId = response.body.data.id
        })
        it('should return error if first name is undefined', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserNoFirstname)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.FIRST_NAME_EMPTY)
        });
        it('should return error if last name is undefined', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserNolastName)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.LAST_NAME_EMPTY)
        });

        it('should return error if email is undefined', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserNoEmail)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.EMAIL_EMPTY)
        });
        it('should return error when first name length is greater than 30 characters', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserFirstnameTooLong)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.TOO_LONG)
        });
        it('should return error when last name length is greater than 30 characters', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserLastnameTooLong)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.TOO_LONG)
        });
        it('should return error when email length is greater than 30 characters', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserGmailTooLong)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.TOO_LONG)
        });
        it('should return error when balance length is greater than 1', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserBalanceNoValid)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.BALANCE_FAILED_PARAM)
        });
        it('should return error when first name is empty', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserEmptyfirstName)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.FIRST_NAME_FAILED_PARAM)
        });
        it('should return error when email is empty', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users/").send(mockUserEmptyEmail)
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.EMAIL_FAILED_PARAM)
        });
        it('should return error when body is empty', async function () {
            const response = await runtimeConfig.app.post("/api/v1/user/users").send()
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty("status", "error")
            expect(response.body).toHaveProperty("data", userErrorDescription.BODY_NOT_PROVIDED)
        });
    })

});