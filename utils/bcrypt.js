import bcrypt from "bcrypt";

export const generateHash = async (value) => {
    const salt = await bcrypt.genSalt(10)
    const hashedValue = await bcrypt.hash(value, salt)
    return hashedValue   
}