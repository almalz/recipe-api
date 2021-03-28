import { Request, Response, NextFunction } from 'express'
import { admin } from '../config/firebase'

import logger from '../config/logger'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.debug('Auth header :', req.headers)

  if (req.headers.idtoken) {
    try {
      console.log('token', req.headers.idtoken as string)
      const payload = await admin
        .auth()
        .verifyIdToken(req.headers.idtoken as string)
      req.userId = payload.uid
      next()
    } catch (error) {
      return res.status(500).json({
        error,
      })
    }
  } else {
    res.status(403).send('Unauthorized')
  }
}

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.userId) {
    next()
  } else {
    return res.status(401).json({
      error: {
        message:
          'You are not authorised to perform this action. SignUp/Login to continue',
      },
    })
  }
}

export const getUserByUid = async (uid: string) => {
  return await admin.auth().getUser(uid)
}

export const createUser = async (email: string, password: string) => {
  const user = await admin.auth().createUser({
    email,
    password,
  })

  if (user) {
    return user
  } else {
    return {
      error: {
        message:
          'You are not authorised to perform this action. SignUp/Login to continue',
      },
    }
  }
}

export const deleteUser = async (uid: string) => {
  return await admin
    .auth()
    .deleteUser(uid)
    .then(() => true)
    .catch((error) => error)
}

export const createCustomToken = async (uid: string) => {
  return admin
    .auth()
    .createCustomToken(uid)
    .then((createdToken) => createdToken)
    .catch((error) => error)
}
