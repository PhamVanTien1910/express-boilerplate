import express from "express";
import validateUserInput from "../middlewares/validateUserInput.js";
import {authenticateAndAuthorize} from "../middlewares/authoraization.js"
import authController from "../controller/auth.controller.js";
import { ROLES } from "../constant/role.constant.js";

let router = express.Router();
const initAuthRouter = async(app) => {
    router.post("/register", validateUserInput, authController.register)
    router.post("/login", authController.login)
    router.post("/refresh-token", authenticateAndAuthorize(ROLES.USER, ROLES.ADMIN), authController.refreshToken)
    return app.use("/api/v1", router);
}

export default initAuthRouter;