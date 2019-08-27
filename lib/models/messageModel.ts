import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IMessage extends mongoose.Document {
  title: string;
  message: string;
  uuid: string;
  encrypted: boolean;
  hashedTitle: string;
  tags: string[];
  date: Date;
}

const MessageSchema = new Schema({
  title: {
    type: String,
    required: 'Message must have a Title'
  },
  message: {
    type: String,
    required: 'Enter a Message'
  },
  uuid: {
    type: String,
    unique: true
  },
  encrypted: {
    type: Boolean,
    default: false
  },
  hashedTitle: {
    type: String
  },
  tags: [
    {
      type: String,
      required: 'Message must have tag(s)'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IMessage>('Message', MessageSchema);
