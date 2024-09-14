import  { UNAUTHORIZED } from "http-status";
import { ErrorResponse } from "../../../response/error.response.js";
import { errorCodes, errorMessages } from "../../../response/httpResponse/index.js";
import userRepository from "../repository/user.repository.js";

const loginUser = async(rawData) => {
    const user = await userRepository.findUserByUsername(rawData.username);
    if (!user) {
        throw new ErrorResponse(errorMessages.USER_NOT_EXISTS, UNAUTHORIZED, errorCodes.USER_NOT_EXISTS);
    }
    
    let isCorrectPassword = await userRepository.validateUserPassword(rawData.password, user.password);
    if (!isCorrectPassword) {
        throw new ErrorResponse(errorMessages.INCORRECT_PASSWORD, UNAUTHORIZED, errorCodes.INCORRECT_PASSWORD);
    }

    return {
        id: user.id,
        username: user.username,
    };
}

export default {loginUser}