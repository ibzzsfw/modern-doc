import SystemFile from '@view-models/SystemFile'

class UploadedFile extends SystemFile {
  isShare: boolean = false

  constructor(
    id: string,
    lastModified: Date,
    name: string,
    dayLifeSpan: number,
    officialName: string,
    isShare: boolean
  ) {
    super(id, lastModified, lastViewed, name, dayLifeSpan, officialName)
    this.isShare = isShare
  }
}

export default UploadedFile
