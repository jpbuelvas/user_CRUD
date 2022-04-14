import {Router} from 'express';
import {userRoute} from "./user.route";


const routes = () => {
    const router = Router();
    router.use('/users', userRoute());

    return router;
};

export {
    routes
};
