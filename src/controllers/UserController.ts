import { Request, Response } from "express";
import IController from "./ControllerInterface";

let data: any[] = [
  {id: 1, name: "Syrll"},
  {id: 2, name: "Yiksn"},
  {id: 3, name: "Azmi"},
  {id: 4, name: "Teuku"},
];

class UserController implements IController {
  public index(req: Request, res: Response): Response {
    return res.send(data);
  }

  public create(req: Request, res: Response): Response {
    const {id, name} = req.body;
    data.push({id,name});
    return res.send("create success");
  }

  public update(req: Request, res: Response): Response {
    const {id} = req.params;
    const {name} = req.body;
    let person = data.find(item => item.id == id);
    person.name = name;

    return res.send("updated success");
  }

  public delete(req: Request, res: Response): Response {
    const {id} = req.params;
    let people = data.filter(item => item.id != id);
    return res.send(people);
  }

  public show(req: Request, res: Response): Response {
    const id = req.params.id;
    let person = data.find(item => item.id == id);
    return res.json(person);
  }
}

export default new UserController();