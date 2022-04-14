import {connectToDb} from '../infrastructure/driven-adapters/typeorm/config/db.config';
import {Express} from "express";
import {startApp} from '../infrastructure/entry-points/express/setup/server';

export async function start() {
    await connectToDb();
    const expressApp = startApp();
    return {
        express: expressApp
    }
}

start().then();