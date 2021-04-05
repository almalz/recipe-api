import { Request, Response } from 'express'
import * as FileManager from '../config/file'

export const uploadFile = async (req: Request, res: Response) => {
  console.log('req', req.file)
  if (req.file) {
    const imageUrl = await FileManager.uploadFile(req.file)
    res.status(201).json(imageUrl)
  } else {
    res.status(500).send('Could not upload file')
  }
  FileManager.clearTempFolder()
}
