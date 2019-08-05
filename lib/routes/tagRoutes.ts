import { Request, Response } from 'express';
import { TagController } from '../controllers/tagController';


export class TagRoutes {

  public tagController: TagController = new TagController();

  public routes(app): void {

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
