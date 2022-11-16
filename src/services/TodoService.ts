import { Request } from 'express';
const db = require('../db/models');

class TodoService {
  credential: {
    id: number,
    username: string
  };
  body: Request['body'];
  params: Request['params'];
  
  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
  }

  /** Get Semua Data Todo */
  getAll = async () => {
    const todos = await db.todo.findAll({
      where: {user_id: this.credential.id},
      attributes: ['id', 'description']
    });

    return todos;
  }

  /** Create Data Todo */
  store = async () => {
    const { description } = this.body;

    const todo = await db.todo.create({
      user_id: this.credential.id,
      description,
    });

    return todo;
  }

  /** Get Data Todo */
  getOne = async () => {
    const {id} = this.params;

    const todo = await db.todo.findOne({
      where: {
        id, 
        user_id: this.credential.id
      },
      attributes: ['id', 'description']
    });

    return todo;
  }

  /** Update Data Todo */
  update = async () => {
    const {id} = this.params;
    const {description} = this.body;

    const todo = await db.todo.update({
      description
    }, {
      where: {
        id, 
        user_id: this.credential.id
      }
    });

    return todo;
  }

  /** Hapus Data Todo*/
  delete = async () => {
    const {id} = this.params;

    const todo = await db.todo.destroy({
      where: {
        id, 
        user_id: this.credential.id
      },
    });

    return todo;
  }
}

export default TodoService;