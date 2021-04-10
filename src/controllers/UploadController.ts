import { Request, Response } from 'express'
import * as FileManager from '../config/file'
import { FileService } from '../services'
import { File, FileResult } from '../types'

export const uploadFile = async (req: Request, res: Response) => {
  if (req.file) {
    const response = await FileManager.uploadFile(req.file)
    if (response) {
      const fileResponse: Partial<File> = {
        locationURL: response.Location,
        key: response.Key,
      }
      const file: FileResult = await FileService.createFile(fileResponse)
      res.status(201).json(file)
    } else {
      res.status(500).send('Could not upload file')
    }
  } else {
    res.status(500).send('Could not upload file')
  }
  FileManager.clearTempFolder()
}
