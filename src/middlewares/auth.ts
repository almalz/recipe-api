import { Request, Response, NextFunction } from 'express'
import { admin } from '../config/firebase'
import axios from 'axios'

import logger from '../config/logger'

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const idToken = req.headers.authorization
    try {
      const payload = await admin.auth().verifyIdToken(idToken)
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

export const createUser = async (
  email: string,
  password: string | undefined,
  emailVerified: boolean | undefined = undefined,
) => {
  const user = await admin.auth().createUser({
    email,
    password,
    emailVerified: false,
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

export const verifyCustomToken = async (customToken: string) => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${GOOGLE_API_KEY}`
    const tokenRes = await axios({
      method: 'post',
      url,
      data: {
        token: customToken,
        returnSecureToken: true,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const verifiedToken = await tokenRes.data.idToken
    return verifiedToken
  } catch (error) {
    console.error(error)
  }
}
