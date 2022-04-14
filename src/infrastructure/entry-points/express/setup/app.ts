import express, {json} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {routes} from '../routes';
import swaggerUI from "swagger-ui-express";
import jsdoc from "swagger-jsdoc";
import {option} from "../../../../swaggerOption";
import swaggerJSDoc from "swagger-jsdoc";
const path = require('path')
const swaggerSpec = {
    definition:{
        openapi: "3.0.0",
        info :{
            title : 'Users API',
            version:'1.0',
            description : 'A simple express library API'
        },
        server:[
            {
                url : "http://localhost:2980/api/v1/user/users"
            }
        ]
    },
    apis:[`${path.join(__dirname,"./infrastructure/entry-points/express/routes/user.route.ts")}`]

}
const App = () => {
    const specs = jsdoc(option)
    const expressApp = express();
    expressApp.use(helmet());
    expressApp.use(cors());
    expressApp.use(json());
    expressApp.use('/api/v1/user', routes());
    expressApp.use( '/docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDoc(swaggerSpec)))
    return expressApp;
}

export {
    App
};



