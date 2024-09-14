import { CreatedResponse, NoContent } from "../response/success.response";
import userService from "../module/service/user.service";
import { UpdateUserDto } from "../module/dto";

class userController {
    static updateUser = async(req, res, next) => {
        try{
        const userId = req.params.id;
        new CreatedResponse({
            data: await userService.updateUser(UpdateUserDto(req.body), userId)
        }).send(res);
        } catch(error){
           next(error)
        }
    }
    static deleteUser = async(req, res, next) => {
        try{
        const userId = req.params.id;
        new NoContent({
            data: await userService.deleteUser(userId)
        }).send(res);
        } catch(error){
           next(error)
        }
    }

}

export default userController