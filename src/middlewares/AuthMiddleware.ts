import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) : any => {
  let credential:string | object = '';
  if(!req.headers.authorization) return res.status(401).send('Token Not Found!');
  let secretKey = process.env.JWT_SECRET_KEY || 'secret';
  /** Ambil Token Dari Header Menggunakan Bearer */
  const token: string = req.headers.authorization.split(" ")[1];

  try {
    /** cek token valid atau tidak */
    credential = jwt.verify(token, secretKey);
    if(credential) {
      req.app.locals.credential = credential;
      return next();
    }
  } catch (error) {
    let fail: any = error;
    res.status(401).send(fail.message);
  }
}