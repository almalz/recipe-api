import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.CELLAR_KEY_ID,
  secretAccessKey: process.env.CELLAR_KEY_SECRET,
})

const s3 = new AWS.S3({ endpoint: process.env.CELLAR_HOST })

// upload

export const uploadFile = (file: any) => {
  const uploadParams = {
    Body: file,
    Key: `${Date.now()}_${file.name}`,
  }
}

// getlink

// delete
