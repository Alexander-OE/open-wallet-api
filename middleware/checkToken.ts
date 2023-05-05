import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface decodedType {
  _id: string;
}

interface tokenRequest extends Request {
  userData: { _id: string };
}

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    if (authorization) {
      const token = authorization.split(" ")[1];
      const decodedValue = jwt.verify(token, "jwtPrivateKey");

      (req as tokenRequest).userData = decodedValue as decodedType;

      next();
    } else {
      return res
        .status(401)
        .send("Unauthorized. Provide a valid authorization");
    }
  } catch (error) {
    return res.status(403).send("Forbidden");
  }
}
