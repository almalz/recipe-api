import request from 'supertest'
import app from '../../src/app'
import { Ingredient } from '../../src/types'

let ingredient: Partial<Ingredient> = {
  name: `test tomato ${Math.round(Math.random() * 10000)}`,
}

describe('POST /ingredient', () => {
  it('should return 201 Created and the created ingredient', async (done) => {
    const response = await request(app).post('/ingredient').send({ ingredient })

    expect(response.status).toBe(201)
    expect(response.body.name).toEqual(ingredient.name)

    if (response.body.id) {
      ingredient = response.body
    }

    done()
  })
})

describe('GET /ingredient/:id', () => {
  it('should return 200 OK and fetched ingredient', async (done) => {
    const response = await request(app).get(`/ingredient/${ingredient.id}`)

    expect(response.status).toBe(200)
    expect(response.body.name).toEqual(ingredient.name)

    done()
  })
})

describe('GET /ingredient', () => {
  it('should return 200 OK and fetched ingredients', async (done) => {
    const response = await request(app).get(`/ingredient`)
    expect(response.status).toBe(200)
    done()
  })
})

describe('DELETE /ingredient/:id', () => {
  it('should return 200 OK and deleted ingredient', async (done) => {
    const response = await request(app).delete(`/ingredient/${ingredient.id}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(ingredient)
    done()
  })
})
