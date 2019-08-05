import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
  title: {
    type: String,
    required: 'Enter a Message Title'
  },
  message: {
    type: String,
    required: 'Enter a Message'
  },
  uuid: {
    type: String,
  },
  hashed: {
    type: Boolean,
    default: false,
  },
  tags: [
    {
      type: String,
      required: 'Message must have tag(s)'
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
