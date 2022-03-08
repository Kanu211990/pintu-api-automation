const supertest = require('supertest');
const errorBuilder = require('../utils/errorBuilder');

class UserService {
  constructor(resource, model) {
    if (!resource || !model) {
      throw errorBuilder.ConstructorParams()
    }
    this.resource = resource;
    this.model = model;
    this.request = supertest(this.resource.Config.baseUrl)
    this.path = '/posts'
  }

  getUserDetails = async () => {
    return this.request.get(this.path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send()
  }

  createUserDetails = async (req) => {
    return this.request.post(this.path)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(req)
  }
}

module.exports = UserService