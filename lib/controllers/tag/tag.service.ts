import TagModel from '../../models/tagModel';

export class TagService {
	static setRelatedTags(tagUuid: string, relatedUuids: string[]): void {
		TagModel.findByIdAndUpdate({uuid: tagUuid}, {$set: {relatedTags: relatedUuids}}, (err, tag) => {
			if (err) {
				console.log('An error occured during setRelatedTags');
			} else {
				console.log('setRelatedTags succesfull');
				console.log(tag);
			}
		})
	}
}
