import * as bcrypt from "bcryptjs";

export async function encryptPassword(password) {
    return bcrypt.hash(password, 10);
}