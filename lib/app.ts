import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { MessageRoutes } from './routes/messageRoutes';
import { TagRoutes } from './routes/tagRoutes';

class App {

  app: express.Application;
  msgRoutes: MessageRoutes = new MessageRoutes();
  tagRoutes: TagRoutes = new TagRoutes();
  readonly mongoUrl: string = 'mongodb://localhost:27017/messageDb';

  constructor() {
    this.app = express();
    this.config();
    this.msgRoutes.routes(this.app);
    this.tagRoutes.routes(this.app);
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
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {
      useCreateIndex: true,
      useNewUrlParser: true
  });
  }
}

export default new App().app;
