import async from 'async'

const formatGeneratedFile = async (file: any) => {
  let tagArr = await async.map(
    file.generatedFileTag,
    (tag: any, callback: any) => {
      callback(null, tag.tag)
    }
  )

  let fieldArr = await async.map(
    file.generatedFileField,
    (field: any, callback: any) => {
      callback(null, {
        ...field.field,
        userField: undefined,
        userValue: field.field.userField[0] ?? '',
        isRequired: field.isRequired,
      })
    }
  )

  let result = {
    id: file.id,
    name: file.name,
    officialName: file.officialName,
    description: file.description,
    dayLifeSpan: file.dayLifeSpan,
    URI: file.URI,
    tags: tagArr,
    fields: fieldArr,
  }

  return result
}

export default formatGeneratedFile
