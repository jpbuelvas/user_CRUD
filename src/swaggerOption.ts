import {userRoute} from "./infrastructure/entry-points/express/routes/user.route";

userRoute
export const option ={
    definition:{
        openapi: "3.0.0",
            info :{
            title : 'Tasks API',
                version:'1.0',
                description : 'A simple express library API'
        },
        server:[
            {
                url : "http://localhost:2980/api/v1/user/users"
            }
        ]
    },
    apis:["./src/infrastructure/entry-points/express/routes/user.route.ts"]
}