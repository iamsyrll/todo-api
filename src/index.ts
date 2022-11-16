import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import {config as dotenv} from "dotenv";

/// Routers
import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";
import TodoRoutes from "./routers/TodoRoutes";

class App {
  public app : Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins() : void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
  }

  protected routes() : void {
    this.app.route("/").get((req : Request, res : Response) => {
      res.send("Welcome to API Testing v1");
    });

    this.app.use('/api/v1/users', UserRoutes);
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/todos', TodoRoutes);
  } 
}

const port : number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});