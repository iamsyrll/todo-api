import { Request, Response } from "express";
const db = require("../db/models");
import Authentication from "../utils/Authentication";

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    /** Hash Password User */
    const hashedPassword: string = await Authentication.passwordHash(password);
    /** Membuat User Baru */
    const createdUser = await db.user.create({username, password: hashedPassword});
    return res.send("Registrasi Sukses");
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    let {username, password} = req.body;
    /** Cek user */
    const user = await db.user.findOne({
      where: {username}
    });
    if(!user) return res.send("User Not Found!");

    /** Cek Password User */
    let compare = await Authentication.passwordCompare(password, user.password);

    if(compare) {
      /**  Generate Token */
      let token = Authentication.generateToken(user.id, username, user.password);

      return res.send({token});
    }

    return res.send('Auth Failed!')
  }

  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential);
  }

}

export default new AuthController();