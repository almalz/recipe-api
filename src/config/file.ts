import AWS from 'aws-sdk'
import fs from 'fs'
const path = require('path')

AWS.config.update({
  accessKeyId: process.env.CELLAR_KEY_ID,
  secretAccessKey: process.env.CELLAR_KEY_SECRET,
})

const s3 = new AWS.S3({ endpoint: process.env.CELLAR_HOST })

// upload

export const uploadFile = async (file: any) => {
  const uploadParams = {
    Bucket: process.env.CELLAR_BUCKET_NAME as string,
    Body: fs.createReadStream(file.path),
    Key: `${Date.now()}_${file.originalname}`,
  }

  console.log('uploadParams', uploadParams)

  try {
    const response = await s3.upload(uploadParams).promise()
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

// getlink

// delete

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
