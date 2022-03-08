const { test } = require('./Test');
const status = require('http-status');

describe('Create user details Testcases', () => {

  it('[POST] create user details successfully > response 201', test(async (service, model, resource) => {
    const req = model.CreateUserDetailsRequest.createUserDetails()
    const actualResponse = await service.UserService.createUserDetails(req)
    const expectedResponse = model.CreateUserDetailsResponse.createUserDetails()
    
    expect(actualResponse.status).toBe(status.CREATED);
    expect(actualResponse.body).toStrictEqual(expectedResponse)
    expect(actualResponse.body.title).toStrictEqual(req.title)
    expect(actualResponse.body.body).toStrictEqual(req.body)
    expect(actualResponse.body.userId).toStrictEqual(req.userId)
    expect(actualResponse.body.id).toStrictEqual(expect.any(Number))
  }));

});