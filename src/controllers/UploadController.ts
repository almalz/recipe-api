import { Request, Response } from 'express'
import * as FileManager from '../config/file'

export const uploadFile = async (req: Request, res: Response) => {
  if (req.file) {
    const response = await FileManager.uploadFile(req.file)
    const fileUrl = response?.Location
    res.status(201).json({ fileUrl })
  } else {
    res.status(500).send('Could not upload file')
  }
  FileManager.clearTempFolder()
}
