import { Request, Response } from 'express';
import { TagController } from '../controllers/tag/tagController';


export class TagRoutes {

  tagController: TagController = new TagController();

  routes(app): void {

    // Create a new contact
    app.route('/add-new-tag')
      .post(this.tagController.addNewTag);

    // Get all contacts
    app.route('/tags')
      .get(this.tagController.getTags);

    // get a specific contact
    app.route('/tags/:id')
      .get(this.tagController.getTagWithUuid);
  }
}
