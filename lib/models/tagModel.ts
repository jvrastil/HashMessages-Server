import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ITag extends mongoose.Document {
  name: string;
  uuid: string;
  relatedTagsUuids: string[];
  lastUsed: Date;
}

const TagSchema = new Schema({
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

export default mongoose.model<ITag>('Tag', TagSchema);
