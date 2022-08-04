import Mail from "../models/mail";
import User from "../models/user";
import { apiError, apiSuccessWithData } from "../utils/apiHelpers";

export const sendMail = async (req, res) => {
    try{
        const toId = await User.findOne({ email: req.body.to }).lean();
        const newMail = await Mail.create({
            to: toId,
            from: req.user.id,
            subject: req.body.subject,
            message: req.body.message
        });
        const mail = await newMail.save();
        res.status(200).json(apiSuccessWithData("Mail has been sent", mail));
    } catch(err){
        res.status(500).json(apiError(err.message));
    }
}

export const inbox = async (req, res) => {
    try {
        const mails = await Mail.find({ to: req.user.id })
            .populate([{ path: "to", select: "email" }, { path: "from", select: "email" }]);
        res.status(200).json(apiSuccessWithData(`All mails in inbox for the user ${ req.user.id }`, mails))
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}

export const sent = async (req, res) => {
    try {
        const mails = await Mail.find({ from: req.user.id })
            .populate([{ path: "to", select: "email" }, { path: "from", select: "email" }]);;
        res.status(200).json(apiSuccessWithData(`All mails sent from the user ${ req.user.id }`, mails))
    } catch(err) {
        res.status(500).json(apiError(err.message));
    }
}