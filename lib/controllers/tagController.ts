import { Request, Response } from 'express';
import TagModel  from '../models/tagModel';

const uuidv1 = require('uuid/v1');

export class TagController {
  addNewTag(req: Request, res: Response) {
    let newTag = new TagModel({
      name: req.body.name,
      uuid: uuidv1()
    });

    TagModel.findOne({name: newTag.name}, (err, tag) => {
      // no tag with same name was found
      if (!err) {
        newTag.save((err) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          }
          res.json(TagController.hidePrivateProperties(tag));
        });
      } else {
        res.statusCode = 202;
        res.json(TagController.hidePrivateProperties(tag));
      }
    });
  }

  getTags (req: Request, res: Response) {
    TagModel.find({}, (err, tag) => {
      if(err){
        res.send(err);
      }
      res.json(TagController.hidePrivateProperties(tag));
    });
  }

  getRelatedTags (req: Request, res: Response) {
    TagModel.findOne(tag => tag.uuid === req.params.uuid, (err, tag) => {
      if(err){
        res.send(err);
      }
      res.json(tag.relatedTagsUuids);
    });
  }

  getTagWithUuid (req: Request, res: Response) {
    TagModel.find(tag => tag.uuid === req.params.uuid, (err, tag) => {
      if(err){
        res.send(err);
      }
      res.json(TagController.hidePrivateProperties(tag));
    });
  }

  private static hidePrivateProperties(tag) {
    console.log(58, tag);
    return {
      uuid: tag.uuid? tag.uuid : null,
      name: tag.name
    };
  }
}
