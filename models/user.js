import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    token: {
        type: String,
        default: ""
    }
},{
    timestamps: true,
});

export default mongoose.model("User", userSchema);