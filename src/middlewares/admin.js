import jwt from "jsonwebtoken";

export function admin(req, res, next) {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(401).send({ error: "You must provide a token." });
    }

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);

        if (typeof decoded !== "string") {
            req.user = decoded;
        }

        if (req.user?.isAdmin !== true) {
            return res.status(401).send({ error: "You do not have permission." });
        }

        return next();
    } catch (error) {
        console.error(error);
        return res.status(400).send({ error: "Ops! There were an error trying to validate your permission." });
    }
}

export default admin;