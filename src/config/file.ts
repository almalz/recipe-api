import AWS from 'aws-sdk'
import fs from 'fs'
const path = require('path')

AWS.config.update({
  accessKeyId: process.env.CELLAR_KEY_ID,
  secretAccessKey: process.env.CELLAR_KEY_SECRET,
})

const s3 = new AWS.S3({ endpoint: process.env.CELLAR_HOST })

// upload File

export const uploadFile = async (file: any) => {
  const uploadParams = {
    Bucket: process.env.CELLAR_BUCKET_NAME as string,
    Body: fs.createReadStream(file.path),
    Key: `${Date.now()}_${file.originalname}`,
  }

  try {
    const response = await s3.upload(uploadParams).promise()
    return response
  } catch (error) {
    console.error(error)
  }
}

// delete File

export const deleteFile = async (file: any) => {
  const params = {
    Bucket: process.env.CELLAR_BUCKET_NAME as string,
    Key: file.key,
  }

  try {
    const response = await s3.deleteObject(params).promise()
    return true
  } catch (error) {
    console.error(error)
  }
}

export const clearTempFolder = () => {
  const directory = 'temp'
  fs.readdir(directory, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err
      })
    }
  })
}
