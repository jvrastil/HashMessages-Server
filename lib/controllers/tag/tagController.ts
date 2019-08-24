import { Request, Response } from 'express';
import TagModel, { ITag } from '../../models/tagModel';

const uuidv1 = require('uuid/v1');
const maxNumberOfDispalyedTags = 10;

export class TagController {
  addNewTag(req: Request, res: Response) {
    let newTag = new TagModel({
      name: req.body.name,
      uuid: uuidv1(),
      lastUsed: new Date(),
      relatedTags: {}
    });

    TagModel.findOne({ name: newTag.name }, (err, tag) => {
      // no tag with same name was found
      if (!tag) {
        newTag.save(err => {
          if (err) {
            res.statusCode = 500;
            res.end(
              'Cannot ' + req.method + ' ' + req.url + ' newTag =' + newTag
            );
          }
          res.json(TagController.hidePrivateProperties(newTag));
        });
      } else {
        res.statusCode = 202;
        res.json(TagController.hidePrivateProperties(tag));
      }
    });
  }

  getRelatedTags(req: Request, res: Response) {
    TagModel.findOne(
      tag => tag.uuid === req.params.uuid,
      (err, tag) => {
        if (err) {
          res.send(err);
        }
        res.json(tag.relatedTags);
      }
    );
  }

  getTagWithUuid(req: Request, res: Response) {
    TagModel.findOne({ uuid: req.body.uuid }, (err, tag) => {
      if (err) {
        res.send(err);
      }
      res.json(TagController.hidePrivateProperties(tag));
    });
  }

  getTags(req: Request, res: Response) {
    TagModel.find({})
      .sort({ lastUsed: -1 })
      .limit(maxNumberOfDispalyedTags)
      .exec((err, tag) => {
        if (err) {
          res.send(err);
        }
        res.json(TagController.hidePrivateProperties(tag));
      });
  }

  private static hidePrivateProperties(tag: ITag | ITag[]) {
    function hideProperties(tag?: ITag) {
      if (tag) {
        return {
          uuid: tag.uuid ? tag.uuid : null,
          name: tag.name
        };
      }
      return null;
    }

    if (!Array.isArray(tag)) {
      return hideProperties(tag);
    } else {
      return tag.map(a => hideProperties(a));
    }
  }
}
