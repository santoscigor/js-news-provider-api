import User from "../models/user";
import { v4 as uuid } from "uuid";
import { encryptPassword } from "../helpers/auth";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import Token from "../models/token";

export async function login(req, res) {
    const { username, password } = req.body;
  
    if (!(username && password)) {
        return res.status(400).send({ error: "Invalid User/Password." });
    }
  
    try {
        const user = await User.query().findOne({ username });

        if (!user) {
            res.status(404).send({ error: "User not found." });
        }

        const existingPassword = await bcrypt.compare(password, user.password);

        if(!existingPassword){
            res.status(400).send({ error: "Wrong password." });
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin, sessionId: uuid() }, process.env.JWT_SECRET);

        await Token.query().insert({ token, userId: user.id });

        return res.send({
            id: user.id,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Ops! Something were wrong when trying to login!" });
    }
}

export async function signUp(req, res) {
    const { username, password, isAdmin } = req.body;

    if (!(username && password)) {
        return res.status(400).send({ error: "Invalid name / password" });
    }
  
    try {
        const existingAccount = await User.query().findOne({ username });

        if (existingAccount) {
            res.status(400).send({ error: "User already exists." });
        }

        const encryptedPassword = await encryptPassword(password);

        await User.query().insert({
            id: uuid(),
            isAdmin: isAdmin?? false,
            username,
            password: encryptedPassword,
        });
        
        return res.status(204).send({});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Ops! There were an error when trying to create account!" });
    }
}