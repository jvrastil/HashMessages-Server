import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { MessageRoutes } from './routes/messageRoutes';
import { TagRoutes } from './routes/tagRoutes';

class App {

  public app: express.Application;
  public msgRoutes: MessageRoutes = new MessageRoutes();
  public tagRoutes: TagRoutes = new TagRoutes();
  public readonly mongoUrl: string = 'mongodb://localhost/messageDb';

  constructor() {
    this.app = express();
    this.config();
    this.msgRoutes.routes(this.app);
    // this.tagRoutes.routes(this.app);
    this.mongoSetup();
  }

  private config(): void{
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // support Cross-origin resource sharing
    this.app.use(cors());
  }

  private mongoSetup(): void{
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true
  });
  }
}

export default new App().app;
