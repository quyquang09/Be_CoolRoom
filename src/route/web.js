import express from "express";
import userController from "../controllers/userController"
let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get("/api/user/:id/verify/:token/",userController.handleVerifyEmail);
    router.get("/api/valuesensor/:type/sensor/:value",userController.handleGetValueSensor);
    return app.use("/", router);
}

module.exports = initWebRoutes;