import request from 'supertest'
import app from '../src/app'

describe('GET /random-url', () => {
  it('should return 404', async (done) => {
    const response = await request(app).get('/random-url')
    expect(response.status).toBe(404)
    done()
  })
})
