const errorBuilder = require('../../utils/errorBuilder');
const userDetailsData = require('../../data/json/CreateUserDetailsRequestData')

class CreateUserDetailsRequest {
  constructor(resource) {
    if (!resource) {
      throw errorBuilder.ConstructorParams()
    }
    this.resource = resource;
  }

  createUserDetails = () => {
    return {
      "title" : userDetailsData.title,
      "body" : userDetailsData.body,
      "userId" : userDetailsData.userId
    }
  }
}

module.exports = CreateUserDetailsRequest