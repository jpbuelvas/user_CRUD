import {Router} from "express";
import {routeAdapter} from "../adapters/route-adapter";
import {createUserControllerFactory} from "../../../../main/factories/controllers/user.controller.factory";
const userRoute = () => {
    const router = Router();
    /**
     * @swagger
     * components:
     *  schema:
     *      User:
     *       type: object
     *       properties:
     *          firstname:
     *              type:string
     *          lastname:
     *              type:string
     *          secondname:
     *              type:string
     *          balance:
     *              type:number
     *
     *
     *
     */
    const {userController} = createUserControllerFactory()
    router.route('/')
        .get(routeAdapter(userController.getAll))
        .post(routeAdapter(userController.create))
    router.route('/average')
        .get(routeAdapter(userController.average))
    router.route('/highest')
        .get(routeAdapter(userController.highestBalance))
    router.route('/:id')
        .patch(routeAdapter(userController.update))
        .delete(routeAdapter(userController.delete))
        .get(routeAdapter(userController.getById))
    return router;
}

export {
    userRoute
}
