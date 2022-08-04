import { apiError, apiSuccess, apiSuccessWithData } from "../utils/apiHelpers";
import { generateHash } from "../utils/bcrypt";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const oldUser = await User.findOne({ email: req.body.email });

        if(oldUser) {
            return res.status(403).json(apiError(`This email: "${ oldUser.email }" is already registered, please login!`));
        }

        // generate hash for the password
        const hashedPassword = await generateHash(req.body.password);

        // create new user
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            token: req.body.token
        });

        await newUser.save()
        res.status(201).json(apiSuccess(`New user is created with the ID: ${ newUser._id }.`))
    } catch(err) {
        res.status(500).json(apiError(err.message))
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(404).json(apiError("User is not registered"));
        }

        const validPassword = await bcrypt.compare(password, user.password);
        
        if(!validPassword){
            return res.status(400).json(apiError("wrong password!"))
        }

        if(user && validPassword) {
            const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.TOKEN_KEY)
            user.token = token;
            await user.save()

            res.status(200).json(apiSuccessWithData("User is successfully logged in and the token has also been generated", token))
        }
    } catch (err) {
        res.status(500).json(apiError(err.message));
    }
}