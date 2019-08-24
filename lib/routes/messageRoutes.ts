import { MessageController } from '../controllers/messageController';
import { Request, Response } from 'express';


export class MessageRoutes {

  messageController: MessageController = new MessageController();

  routes(app): void {

    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200)
          .send({
            message: 'GET request successfulll!!!!',
          });
      });

    // Create a new contact
    app.route('/add-new-message')
      .post(this.messageController.addNewMessage);

    // Get all contacts
    app.route('/messages')
      .get(this.messageController.getMessages);

    // get a specific contact
    app.route('/messages/:id')
      .get(this.messageController.getMessageWithId);
  }
}
