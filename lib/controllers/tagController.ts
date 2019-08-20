import { Request, Response } from 'express';
import TagModel, { ITag } from '../models/tagModel';

const uuidv1 = require('uuid/v1');

export class TagController {
	addNewTag(req: Request, res: Response) {
		let newTag = new TagModel({
			name: req.body.name,
			uuid: uuidv1(),
      lastUsed: new Date(),
      relatedTagsUuids: [],
		});

		TagModel.findOne({name: newTag.name}, (err, tag) => {
			// no tag with same name was found
			if (!tag) {
				newTag.save((err) => {
					if (err) {
						res.statusCode = 500;
						res.end('Cannot ' + req.method + ' ' + req.url + ' newTag =' + newTag);
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
		TagModel.findOne(tag => tag.uuid === req.params.uuid, (err, tag) => {
			if (err) {
				res.send(err);
			}
			res.json(tag.relatedTagsUuids);
		});
	}

	getTagWithUuid(req: Request, res: Response) {
		TagModel.findOne({uuid: req.body.uuid}, (err, tag) => {
			if (err) {
				res.send(err);
			}
			res.json(TagController.hidePrivateProperties(tag));
		});
	}

	getTags(req: Request, res: Response) {
		TagModel.find({}, (err, tag) => {
			if (err) {
				res.send(err);
			}
			res.json(TagController.hidePrivateProperties(tag));
		});
	}

	setRelatedTags(tagUuid: string, relatedUuids: string[]) {
	  TagModel.findByIdAndUpdate({uuid: tagUuid}, {$set: {relatedTagsUuids: relatedUuids}}, (err, tag) => {
      if (err) {
        console.log('An error occured during setRelatedTags');
      } else {
        console.log('setRelatedTags succesfull');
        console.log(tag);
      }
    })
  }

	private static hidePrivateProperties(tag: ITag | ITag[]) {
		function hideProperties(tag?: ITag) {
			if (tag) {
				return {
					uuid: tag.uuid ? tag.uuid : null,
					name: tag.name,
				};
			}
			return null;
		};

		if (!Array.isArray(tag)) {
			return hideProperties(tag);
		} else {
      return tag.map(a => hideProperties(a));
		}
	}
}
