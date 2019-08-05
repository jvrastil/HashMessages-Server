import * as mongoose from 'mongoose';
import { MessageSchema } from '../models/messageModel';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
// const bodyParser = require('body-parser')


const Message = mongoose.model('Message', MessageSchema);
export class MessageController {
  private jsonParser = bodyParser.json();

  public addNewMessage(req: Request, res: Response) {
    console.log(9, req.body, req.query);

    let newMsg = new Message({
      message: req.body.message,
      title: req.body.title,
      tags: req.body.tags
    });

    newMsg.save((err) => {
      if (err) {
        res.statusCode = 500;
        // res.setHeader('Content-Type', 'text/plain');
        // res.end('Cannot ' + req.method + ' ' + req.url + ' newMsg =' + newMsg);
      }
      res.json(newMsg);
    });
  }

  public getMessages (req: Request, res: Response) {
    Message.find({}, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getMessageWithId (req: Request, res: Response) {
    Message.findById(req.params.id, (err, contact) => {
      if(err){
        res.send(err);
      }
      res.json(contact);
    });
  }
}
