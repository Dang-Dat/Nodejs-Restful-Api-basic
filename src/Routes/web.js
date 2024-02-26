import express from "express";
import HomeController, { handleHelloWord } from '../Controller/HomeController';
import apiController from '../controller/apiController';
const router = express.Router();

/**
 * 
 * @param{*} app - express app
 */

const initWebRoutes = (app) =>{
    router.get("/", HomeController.handleHelloWord);
    router.get("/user", HomeController.handleUserPage);
    router.get("/update-user/:id",HomeController.getUpdateUser);

    router.post("/users/create-user", HomeController.handleCreateNewUser);
    router.post("/delete-user/:id",HomeController.handleDeleteUser);
    router.post("/users/update-user", HomeController.postUpdateUser)
    
    // rest api
    //GET - R,POST - C, PUT - U, DELETE - D
    router.get("/api/test-api",apiController.testApi);
    return app.use("/", router);
}

export default initWebRoutes;