import jwt from "jsonwebtoken";
import Token from "../models/token";

export async function auth(req, res, next) {
    const token = req.headers["x-access-token"];

    try {
        const validToken = token;

        if(!validToken){
            req.user = null;
        } else {
            const tokenInDb = await Token.query().findOne({ token: validToken });
      
            if(tokenInDb){
                const decoded = jwt.verify(validToken, process.env.JWT_SECRET);
                req.user = decoded;
            }
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "errorMessages.Fatal.auth.login" });
    }
}

export default auth;
