import {Request, Response, NextFunction} from "express"
import jwt, { JwtPayload } from "jsonwebtoken"


interface authRequest extends Request {
    token: string | JwtPayload
}


export function auth(req: Request, res: Response, next: NextFunction) {
const token = req.header("x-auth-token")
if (!token) return res.status(401).send("Access denied. No token provided")

try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    (req as authRequest).token = decoded;
    next();

} catch (error) {
    res.status(400).send("Invalid token.")
}
}