import registerService from "../module/service/auth/register.service.js";
import { RegisterDto } from "../module/dto/register.dto.js";
import {LoginDto} from "../module/dto/login.dto.js";
import loginService from "../module/service/auth/login.service.js";
import userService from "../module/service/user.service.js";
import tokenService from "../module/service/jwt/token.service.js"
import refreshService from "../module/service/jwt/refresh.service.js";
import { CreatedResponse, SuccessResponse } from "../response/success.response.js";

class authController {

    static register = async(req, res, next) => {
        try{
        new CreatedResponse({
            data:  await registerService.createUser(RegisterDto(req.body))
        }).send(res);
        } catch(error){
           next(error)
        }
    }

    static login = async (req, res, next) => {
        try {
            const data = await loginService.loginUser(LoginDto(req.body));
            const dataRole = await userService.getUserWithRole(data.id);
            const token = await tokenService.generateToken(dataRole);
            await tokenService.saveToken(data.username, token, "access");
            new SuccessResponse({ data: token }).send(res);
        } catch (error) {
            next(error); 
        }
    }

    static refreshToken = async (req, res, next) => {
        try {
            const tokens = await refreshService.refreshAuth(req.body.token);
            new SuccessResponse({ data: tokens }).send(res);
        } catch (error) {
            next(error); 
        }
    }
}

export default authController
