# Petstore API Tests

Sample API test project for the [Swagger Petstore API](https://petstore.swagger.io).

## Stack

- [Jest](https://jestjs.io) — test runner
- [Axios](https://axios-http.com) — HTTP client

## Setup

```bash
npm install
npm test
```

# API Testing Report — Swagger Petstore API

## Objective

The objective of this assignment was to learn about API testing concepts and tools, and to implement automated tests for the Swagger Petstore API. The test suite covers functional, negative, and edge case scenarios. It also demonstrates the usage of different HTTP methods, path parameters, and query parameters.

## Tools Used

- JavaScript
- Node.js
- Jest - test runner
- Axios - HTTP client
- Swagger Petstore API - system under test

## Manual API Exploration

Before writing automated tests, some endpoints were checked manually using the Swagger Petstore API documentation / Swagger UI and Thunder Client. This helped verify available endpoints, required parameters, request body examples, and expected response formats.

The manual checks were then used as a basis for creating automated Jest + Axios test scenarios.

## Endpoints Tested

| Area | Method | Endpoint | Test Purpose |
|---|---:|---|---|
| Pet | POST | `/pet` | Create a new pet |
| Pet | GET | `/pet/{petId}` | Retrieve pet by ID |
| Pet | GET | `/pet/findByStatus` | Retrieve pets by status query parameter |
| Pet | PUT | `/pet` | Update existing pet |
| Pet | DELETE | `/pet/{petId}` | Delete pet by ID |
| Store | POST | `/store/order` | Place a new order |
| Store | GET | `/store/order/{orderId}` | Retrieve order by ID |
| Store | DELETE | `/store/order/{orderId}` | Delete order by ID |
| User | POST | `/user` | Create a user |
| User | GET | `/user/{username}` | Retrieve user by username |
| User | GET | `/user/login` | Login using query parameters |
| User | PUT | `/user/{username}` | Update user |
| User | DELETE | `/user/{username}` | Delete user |

## Test Scenarios

Petstore tests are separated into 3 test files - pet, store and user areas.

### Functional Testing

Functional tests verify that valid requests return successful status codes and expected response data.

Examples:

- Creating a pet using `POST /pet`
- Getting a pet using `GET /pet/{petId}`
- Updating a pet using `PUT /pet`
- Creating an order using `POST /store/order`
- Creating and updating a user using `POST /user` and `PUT /user/{username}`

### Negative Testing

Negative tests verify that invalid or missing resources return error responses.

Examples:

- Getting a non-existing pet returns `404`
- Getting a non-existing user returns `404`
- Getting an invalid store order ID returns a client error response
- Getting a deleted pet, order, or user returns `404`

### Edge Case Testing

Edge case tests cover unusual or boundary input values.

Examples:

- Creating a pet with unicode and special characters in the name
- Requesting store order ID `11`, which is outside the documented valid range of `1-10`
- Testing deleted resources after DELETE requests

## Parameters Covered

### Path Parameters

- `/pet/{petId}`
- `/store/order/{orderId}`
- `/user/{username}`

### Query Parameters

- `/pet/findByStatus?status=available`
- `/user/login?username=value&password=value`

## HTTP Methods Covered

- GET
- POST
- PUT
- DELETE

## Observations and Issues

The Swagger Petstore API is a public demo API. Because of this, data may sometimes be modified by other users and some responses may be inconsistent. To reduce this risk, the tests generate unique pet IDs and usernames where possible.

For store orders, the API documentation recommends using order IDs from `1` to `10`, so the test uses a fixed valid order ID 9.

Some negative tests allow either `400` or `404` because the public API may return different client error responses depending on the invalid input.

## Conclusion

The implemented automated test suites (3 suites - 23 tests) cover more than five API endpoints and include functional, negative, and edge case scenarios. It validates status codes, response body data, path parameters, query parameters, and different HTTP methods.

