const errorBuilder = require('../../utils/errorBuilder');
const userDetailData = require('../../data/json/CreateUserDetailsResponseData.json')

class CreateUserDetailsResponse {
  constructor(resource) {
    if (!resource) {
      throw errorBuilder.ConstructorParams()
    }
    this.resource = resource;
  }


  createUserDetails = () => {
    return {
      "title": userDetailData.title, 
      "body": userDetailData.body, 
      "userId": userDetailData.userId, 
      "id": expect.any(Number)
    }
  }

}

module.exports = CreateUserDetailsResponse
