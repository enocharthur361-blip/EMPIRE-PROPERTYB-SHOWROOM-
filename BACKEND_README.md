# EMPIRE Property Platform - Backend API

Node.js/Express backend API for the EMPIRE Property real estate platform.

## Installation

```bash
# Clone the repository
git clone https://github.com/enocharthur361-blip/EMPIRE-PROPERTYB-SHOWROOM-.git
cd EMPIRE-PROPERTYB-SHOWROOM-/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/empire
JWT_SECRET=your-secret-key
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_SECRET=your-paypal-secret
TWILIO_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
FIREBASE_API_KEY=your-firebase-api-key
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset

### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get listing details
- `POST /api/listings` - Create new listing
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing
- `GET /api/listings/search` - Search listings
- `GET /api/listings/:id/analytics` - Get listing analytics

### Subscriptions
- `GET /api/subscriptions/plans` - Get all plans
- `POST /api/subscriptions/upgrade` - Upgrade subscription
- `POST /api/subscriptions/downgrade` - Downgrade subscription
- `GET /api/subscriptions/current` - Get current subscription

### Payments
- `POST /api/payments/create` - Create payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history
- `POST /api/payments/webhook` - PayPal webhook

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/team` - Get team members
- `POST /api/users/team/invite` - Invite team member

### Teams
- `GET /api/teams/:id` - Get team details
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Analytics
- `GET /api/analytics/listings` - Listing analytics
- `GET /api/analytics/market/:location` - Market analysis
- `GET /api/analytics/user` - User analytics

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  password: String (hashed),
  role: String (owner, agent, broker),
  subscription: {
    plan: String,
    status: String,
    startDate: Date,
    renewalDate: Date,
    features: Object
  },
  profile: {
    avatar: String,
    bio: String,
    location: String
  },
  teamMembers: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Listing Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  type: String,
  category: String,
  price: Number,
  location: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  details: {
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,
    amenities: [String]
  },
  media: {
    photos: [String],
    videos: [String],
    virtualTour: String
  },
  description: String,
  status: String (active, inactive, sold),
  analytics: {
    views: Number,
    inquiries: Number,
    favorites: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Subscription Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  plan: String,
  status: String,
  startDate: Date,
  endDate: Date,
  amount: Number,
  paymentMethod: String,
  transactionId: String,
  features: Object,
  autoRenewal: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js
```

## Deployment

### Heroku
```bash
heroku create empire-property-api
git push heroku main
```

### Docker
```bash
docker build -t empire-api .
docker run -p 5000:5000 empire-api
```

### AWS EC2
```bash
npm run build
npm start
```

## API Documentation

Full API documentation available at `/api/docs` (Swagger UI)

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Submit a pull request

## License

MPL 2.0
