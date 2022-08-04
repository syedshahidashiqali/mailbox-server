import User from "../models/user";
import { apiError, apiSuccessWithData } from "../utils/apiHelpers";

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json(apiSuccessWithData("User data", user))
    } catch (err) {
        res.status(500).json(apiError(err.message))
    }
}