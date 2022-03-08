const { test } = require('./Test');
const status = require('http-status');

describe('Get user details Testcases', () => {

  it('[GET] user details > response 200', test(async (service, model, resource) => {
    const actualResponse = await service.UserService.getUserDetails()
    const totalCount = actualResponse.body.length
    const expectedResponse = model.GetUserDetailsResponse.getUserDetails(totalCount)
        
    expect(actualResponse.status).toBe(status.OK);
    expect(actualResponse.body).toStrictEqual(expectedResponse)
  }));

});