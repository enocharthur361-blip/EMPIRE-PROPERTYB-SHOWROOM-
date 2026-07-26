# Testing Documentation

## Unit Tests

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Backend Tests

```bash
# Auth tests
npm test -- src/tests/auth.test.js

# Listing tests
npm test -- src/tests/listings.test.js

# Payment tests
npm test -- src/tests/payments.test.js
```

## Integration Tests

### API Workflow Tests

1. User Registration
2. User Login
3. Listing Creation
4. Payment Processing
5. Subscription Upgrade

## E2E Tests

Using Detox for React Native:

```bash
npm install --save-dev detox-cli detox

# Build test configuration
detox build-framework-cache
detox build-app

# Run E2E tests
detox test
```

## Test Coverage Goals

- Backend: 80%+ coverage
- Frontend: 75%+ coverage
- Mobile: 70%+ coverage

## Continuous Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Release builds
