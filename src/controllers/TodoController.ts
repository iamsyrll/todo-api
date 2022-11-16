import { Request, Response } from "express";
import IController from "./ControllerInterface";
import TodoService from "../services/TodoService";

class TodoController implements IController {
  public index = async (req: Request, res: Response): Promise<Response> => {
    const service : TodoService = new TodoService(req);
    const todos = await service.getAll();

    return res.send({
      data: todos,
    });
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const service : TodoService = new TodoService(req);
    const todo = await service.store();

    return res.send({
      data: todo,
      message: "todo created!"
    });
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    const service : TodoService = new TodoService(req);
    const todo = await service.update();

    return res.send({
      data: todo,
      message: "todo updated!"
    });
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const service : TodoService = new TodoService(req);
    const todo = await service.delete();

    return res.send({
      data: todo,
      message: "todo deleted!"
    })
  }

  public show = async (req: Request, res: Response): Promise<Response> => {
    const service : TodoService = new TodoService(req);
    const todo = await service.getOne();

    return res.send({
      data: todo
    });
  }
}

export default new TodoController();