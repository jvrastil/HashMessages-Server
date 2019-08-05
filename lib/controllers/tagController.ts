import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { TagSchema } from '../models/tagModel';

const Tag = mongoose.model('Tag', TagSchema);
export class TagController {

  public addNewTag(req: Request, res: Response) {
    let newTag = new Tag(req.body);

    newTag.save((err, msg) => {
      if (err) {
        res.send(err);
      }
      res.json(this.hidePrivateProperties(newTag));
    });
  }

  public getTags (req: Request, res: Response) {
    Tag.find({}, (err, tag) => {
      if(err){
        res.send(err);
      }
      res.json(this.hidePrivateProperties(tag));
    });
  }

  public getRelatedTags (req: Request, res: Response) {
    Tag.find(tag => tag.uuid === req.params.uuid, (err, tag) => {
      if(err){
        res.send(err);
      }
      res.json(tag.relatedTagsUuids);
    });
  }

  public getTagWithUuid (req: Request, res: Response) {
    Tag.find(tag => tag.uuid === req.params.uuid, (err, tag) => {
      if(err){
        res.send(err);
      }
      res.json(this.hidePrivateProperties(tag));
    });
  }

  private hidePrivateProperties(tag) {
    return {
      uuid: tag.uuid,
      name: tag.name
    };
  }
}
