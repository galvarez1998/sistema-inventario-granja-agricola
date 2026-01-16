# Testing Guide

This document explains how to run tests for the backend of the Granja Inventario application.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

Install all dependencies including test dependencies:

```bash
cd backend
npm install
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

This is useful during development as it will re-run tests when files change:

```bash
npm run test:watch
```

## Test Structure

Tests are located in the `backend/tests/` directory and are organized by endpoint:

- `auth.test.ts` - Authentication endpoints (register, login)
- `animals.test.ts` - Animals CRUD operations
- `products.test.ts` - Products CRUD operations
- `movements.test.ts` - Animal movements (birth, death, purchase, sale)
- `sales.test.ts` - Sales operations with inventory updates

## Test Database

Tests use an in-memory SQLite database, so they don't require any database setup or configuration. The database is created fresh for each test suite and destroyed after tests complete.

## Test Coverage

The test suite covers:

- DTO validation with class-validator
- Authentication and authorization
- CRUD operations for all entities
- Transactional inventory updates
- Error handling (404, 400, 401, 403, etc.)
- UUID parameter validation
- Business logic validation (e.g., preventing overselling)

## Writing New Tests

When adding new tests:

1. Import `createTestApp` from `./appFactory` to set up the test environment
2. Use `beforeAll` to initialize the app and database
3. Use `afterAll` to destroy the database connection
4. Use `supertest` to make HTTP requests to the API
5. Assert expected status codes and response bodies

Example:

```typescript
import request from "supertest";
import { createTestApp } from "./appFactory";

describe("My New Endpoint", () => {
  let app: Application;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    dataSource = testApp.dataSource;
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("should do something", async () => {
    const response = await request(app)
      .get("/api/my-endpoint")
      .expect(200);
    
    expect(response.body).toHaveProperty("data");
  });
});
```

## Continuous Integration

Tests are automatically run on every push and pull request via GitHub Actions. See `.github/workflows/test.yml` for the CI configuration.

## Troubleshooting

### Tests failing with "Cannot find module"

Make sure all dependencies are installed:

```bash
npm install
```

### Tests timing out

Increase the Jest timeout in `jest.config.js` if needed:

```javascript
module.exports = {
  // ...
  testTimeout: 10000, // 10 seconds
};
```

### SQLite errors

The `sqlite3` package is a native module and may need to be rebuilt:

```bash
npm rebuild sqlite3
```
