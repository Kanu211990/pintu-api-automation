const errorBuilder = require('../../utils/errorBuilder');

class GetUserDetailsResponse {
  constructor(resource) {
    if (!resource) {
      throw errorBuilder.ConstructorParams()
    }
    this.resource = resource;
  }


  getUserDetails = (totalCount) => {
    const arr = []
    for (let i = 0; i < totalCount; i++) {
      const temp =
      {
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String)
      }
      arr.push(temp)
    }
    return arr
    }

}

module.exports = GetUserDetailsResponse
