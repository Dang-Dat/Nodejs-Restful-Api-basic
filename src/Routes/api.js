import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController'
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/jwtAction'
import roleController from '../controller/roleController'
const router = express.Router();

/**
 * 
 * @param{*} app - express app
 */
const testMiddleware = (req, res, next) => {
    console.log("calling a middleware")
    if (true) {
        return res.send("reject middleware")
    }
    next();
}


function checkUser(req, res, next) {
    const nonSecurePaths = ['/', '/register', 'login', '/account'];
    if (nonSecurePaths.includes(req.path)) return next();

    next();
}
const initApiRoutes = (app) => {

    // rest api
    //GET - R,POST - C, PUT - U, DELETE - D
    router.all('*', checkUserJWT, checkUserPermission);

    router.post("/register", apiController.hadleRegister);
    router.post("/login", apiController.hadleLogin);
    router.get("/account", userController.getUserAccount);
    router.post("/logout", apiController.hadleLogout);

    //user routes
    router.get("/user/read", userController.read);
    router.post("/user/create", userController.create);
    router.put("/user/update", userController.update);
    router.delete("/user/delete", userController.deleteUser)

    //Roles routes
    router.get("/role/read", roleController.read);
    router.post("/role/create", roleController.create);
    router.put("/role/update", roleController.update);
    router.delete("/role/delete", roleController.deleteUser)
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup)
    router.post("/role/assign-to-group", roleController.assignRoleToGroup)

    //Group routes
    router.get("/group/read", groupController.read);

    return app.use("/api/v1/", router);
}

export default initApiRoutes;