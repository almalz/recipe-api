import request from 'supertest'
import * as firebase from 'firebase-admin'

import app from '../../src/app'
import { admin } from '../../src/config/firebase'
import * as auth from '../../src/middlewares/auth'
import { Recipe, Ingredient, File } from '../../src/types'
import * as FileManager from '../../src/config/file'

const recipe = {
  name: `test pasta ${Math.round(Math.random() * 10000)}`,
  prepTime: Math.round(Math.random() * 100),
  cookingTime: Math.round(Math.random() * 100),
  ingredients: [
    {
      name: 'Tomato sauce',
    },
    {
      name: 'Ground beef',
    },
    {
      name: 'Pasta',
    },
  ],
  imagePath: './test/assets/pancakes.jpg',
  imageURL: '',
}

describe('Authenticated recipies routes', () => {
  let user = {
    email: `testemail${Math.round(Math.random() * 100000)}@test.com`,
    password: 'testpassword123',
    uid: '',
    token: '',
  }

  beforeAll(async () => {
    const response = await auth.createUser(user.email, undefined, false)
    const userResponse = response as admin.auth.UserRecord
    user.uid = userResponse.uid
    const createdToken = await auth.createCustomToken(user.uid)
    const verifiedToken = await auth.verifyCustomToken(createdToken)
    user.token = verifiedToken
  })

  afterAll(async () => {
    auth.deleteUser(user.uid)
    // if(recipe.imageURL !== '' ){
    //   try{
    //     FileManager.deleteFileByUrl()
    //   }
    // }
  })

  describe('POST /upload', () => {
    it('should return 201 and the URL of the uploaded file', async (done) => {
      const response = await request(app)
        .post('/upload')
        .set('Authorization', user.token)
        .attach('recipeImage', recipe.imagePath)

      console.log('body', response.body)

      const fileName = recipe.imagePath.split('/')[
        recipe.imagePath.split('/').length - 1
      ]

      expect(response.status).toBe(201)
      expect(response.body.locationURL).toContain(fileName)

      recipe.imageURL = response.body.locationURL

      done()
    })
  })

  // .field('name', recipe.name)
  // .field('cookingTime', recipe.cookingTime)
  // .field('prepTime', recipe.prepTime)
  // .field('ingredients', recipe.ingredients)
  // .field('name', recipe.name)
  // .field('name', recipe.name)
})
