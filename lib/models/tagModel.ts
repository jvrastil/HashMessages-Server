import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const TagSchema = new Schema({
  name: {
    type: String,
    required: 'Tag must have a name'
  },
  uuid: {
    type: String,
    required: 'Tag must have uuid'
  },

  // Backend only
  relatedTagsUuids: [
    {
      type: String,
    },
  ],
  lastUsed: {
    type: Date,
  },
});
