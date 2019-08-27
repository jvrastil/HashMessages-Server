import MessageModel from '../models/messageModel';
import { Request, Response } from 'express';
import { TagService } from './tag/tag.service';

const uuidv1 = require('uuid/v1');

export class MessageController {
  addNewMessage(req: Request, res: Response) {
    const newMsg = new MessageModel({
      title: req.body.title,
      message: req.body.message,
      uuid: uuidv1(),
      encrypted: req.body.encrypted,
      hashedTitle: req.body.hashedTitle,
      tags: req.body.tags,
      date: new Date()
    });

    newMsg.save(err => {
      if (err) {
        res.statusCode = 500;
        res.end('Cannot ' + req.method + ' ' + req.url + ' newMsg =' + newMsg);
      } else {
        res.json(newMsg);
        newMsg.tags.forEach(tag => TagService.setRelatedTags(tag, newMsg.tags));
      }
    });
  }

  getMessages(req: Request, res: Response) {
    MessageModel.find({}, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  getMessageWithId(req: Request, res: Response) {
    MessageModel.findById(req.params.id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
}
