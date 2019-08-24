import TagModel from '../../models/tagModel';

export class TagService {
  static setRelatedTags(tagUuid: string, relatedUuids: string[]): void {
    const incStr = relatedUuids.map(uuid => `relatedTags.${uuid}`);

    let update = { $inc: {}, $set: { lastUsed: new Date() } };
    incStr.forEach(
      (str, index) => (update.$inc[str] = TagService.getCoeficient(index))
    );

    TagModel.findOneAndUpdate({ uuid: tagUuid }, update, (err, tag) => {
      if (err) {
        console.log('An error occured during setRelatedTags');
      } else {
        console.log('setRelatedTags succesfull', tag.uuid);
      }
    });
  }

  private static getCoeficient(index: number): number {
    let result;
    switch (index) {
      case 0:
        result = 3;
        break;
      case 1:
      case 2:
        result = 2;
        break;
      default:
        result = 1;
    }

    return result;
  }
}
