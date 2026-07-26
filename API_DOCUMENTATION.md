# API Documentation

## Base URL

```
https://api.empireproperty.ae
```

## Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Register
```
POST /api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971503333333",
  "password": "securepassword",
  "role": "owner"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {...}
}
```

#### Login
```
POST /api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {...}
}
```

### Listings

#### Get All Listings
```
GET /api/listings?type=apartment&category=buy&page=1&limit=10

Response:
{
  "total": 100,
  "page": 1,
  "pages": 10,
  "listings": [...]
}
```

#### Create Listing
```
POST /api/listings
Authorization: Bearer <token>

Body:
{
  "title": "Luxury Apartment",
  "type": "apartment",
  "category": "buy",
  "price": 850000,
  "location": {
    "address": "Downtown Dubai",
    "coordinates": [25.1972, 55.2744]
  },
  "details": {
    "bedrooms": 2,
    "bathrooms": 2,
    "sqft": 1200
  },
  "description": "Stunning apartment..."
}
```

### Payments

#### Create PayPal Payment
```
POST /api/payments/create-paypal-payment
Authorization: Bearer <token>

Body:
{
  "plan": "premium",
  "amount": 99
}

Response:
{
  "paymentId": "paypal_payment_id",
  "approvalUrl": "https://www.sandbox.paypal.com/cgi-bin/webscr?..."
}
```

## Error Handling

All errors return JSON:

```javascript
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

## Rate Limiting

- 100 requests per minute for unauthenticated endpoints
- 1000 requests per minute for authenticated endpoints
- 5000 requests per minute for enterprise tier
