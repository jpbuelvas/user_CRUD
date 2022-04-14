import supertest, {SuperAgentTest, SuperTest, Test} from "supertest";
import {App} from "../../../../src/infrastructure/entry-points/express/setup/app";
import {createServer, Server} from 'http'
import {connectToDb} from "../../../../src/infrastructure/driven-adapters/typeorm/config/db.config";

let app: SuperAgentTest
let server: Server
let expressApp: Express.Application

export async function initApp() {
    process.env.NODE_ENV = 'test'

    if (app == undefined) {
        console.log('Initializing app')
        expressApp = App()
        server = createServer(expressApp)
        app = supertest.agent(server)
    }
    return app;
}

export async function closeApp() {
    if (app !== undefined){
        console.log('Stopping App')
        server.close()
        app = undefined!
        server = undefined!
    }
}
export async function initDbConnection() {
    await connectToDb();
}
