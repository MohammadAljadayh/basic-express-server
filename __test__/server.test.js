'use strict';

const { server } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('middleware servert', () => {
  test('/Root', async () => {

    const response = await mockRequest.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello this is home root')

  });


  test('should check the Person works SUCCESS', async () => {

    const response = await mockRequest.get('/person?name=mohammad');
    expect(response.status).toBe(200);

  });

  // Check if 404 is handled 

  test('Should respond with 404 status on an invalid method', async () => {

    const response = await mockRequest.get('/notfound');
    expect(response.status).toBe(404);

  });


  // Check if general error handling is working

  test('should respond with 500 on an error', async () => {

    const response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
  });

});