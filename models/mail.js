import mongoose, { Schema } from "mongoose";

const mailBoxSchema = new Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requied: true
    },
    subject: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    // toJSON : { virtuals : true },
    // toObject : { virtuals : true }
});

// mailBoxSchema.virtual("toEmail", {
//     ref: "User",
//     localField: "to",
//     foreignField: "email",
//     justOne : true,
// })

// mailBoxSchema.virtual("fromEmail", {
//     ref: "User",
//     localField: "from",
//     foreignField: "email",
//     justOne : true,
// })

export default mongoose.model("Mail", mailBoxSchema)