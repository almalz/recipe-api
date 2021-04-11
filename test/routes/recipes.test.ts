import request from 'supertest'
import * as firebase from 'firebase-admin'

import app from '../../src/app'
import { admin } from '../../src/config/firebase'
import * as auth from '../../src/middlewares/auth'
import { Recipe, Ingredient, File } from '../../src/types'
import * as FileManager from '../../src/config/file'
import { LexRuntimeV2 } from 'aws-sdk'

let recipe: any = {
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
  userId: '',
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
    recipe.userId = user.uid
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
    it('should return 201 and the data of the uploaded file', async (done) => {
      const response = await request(app)
        .post('/upload')
        .set('Authorization', user.token)
        .attach('recipeImage', recipe.imagePath)

      const fileName = recipe.imagePath.split('/')[
        recipe.imagePath.split('/').length - 1
      ]

      expect(response.status).toBe(201)
      expect(response.body.locationURL).toContain(fileName)

      recipe.imageURL = response.body.locationURL

      done()
    })
  })

  describe('POST /recipe', () => {
    it('should return 201 and the created recipe', async (done) => {
      const response = await request(app)
        .post('/recipe')
        .set('Authorization', user.token)
        .send(recipe)

      expect(response.status).toBe(201)

      const recipeResult = await response.body

      expect(recipeResult.name).toEqual(recipe.name)
      expect(recipeResult.cookingTime).toEqual(recipe.cookingTime)
      expect(recipeResult.prepTime).toEqual(recipe.prepTime)
      recipeResult.ingredients.forEach((ingredient: any) => {
        delete ingredient.id
        delete ingredient.alternativeingredientId
      })
      expect(recipeResult.ingredients).toEqual(recipe.ingredients)

      recipe = recipeResult

      done()
    })
  })
})

describe('GET /recipe/:id', () => {
  it('should return 200 OK and fetched recipe', async (done) => {
    const response = await request(app).get(`/recipe/${recipe.id}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toEqual(recipe.name)
    done()
  })
})

describe('DELETE /recipe/:id', () => {
  it('should return 200 OK and deleted recipe', async (done) => {
    const response = await request(app).delete(`/recipe/${recipe.id}`)
    const recipeResult = await response.body
    expect(response.status).toBe(200)
    expect(response.body.name).toEqual(recipe.name)
    expect(response.body.file).toEqual(response.body.deletedFile)
    done()
  })
})
