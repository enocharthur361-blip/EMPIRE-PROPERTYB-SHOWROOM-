# EMPIRE Property Platform - Subscription & Listing System

## Features Implemented

### 1. **User Authentication & Roles**
- Property Owner
- Real Estate Agent
- Broker/Agency
- Admin (for future)

### 2. **Subscription Plans**

#### FREE PLAN
- 5 listings per month
- Basic property details (title, price, location, specs)
- No photo/video support
- No property analysis
- No priority support
- Basic listings management

#### PREMIUM PLAN (AED 99/month)
- Unlimited listings
- Photo & video support
- Property analysis tools
- Priority email support
- Advanced analytics dashboard
- Team management (for brokers)
- Bulk listing uploads

### 3. **Property Listing Features**

**Basic Information:**
- Property title
- Property type (Apartment, Villa, Townhouse, Studio)
- Category (Buy, Rent, Off-Plan, Sell)
- Price in AED
- Location
- Bedrooms & Bathrooms
- Square footage
- Description

**Premium Features:**
- Photo uploads (with preview)
- Video uploads (with preview)
- Property analysis tools
- Advanced search filters
- Analytics (views, inquiries, conversion rates)

**Amenities:**
- Pool
- Gym
- Parking
- Security
- Balcony
- Garden
- (Customizable)

### 4. **Search & Filter Capabilities**
- Search by location or property name
- Filter by property type
- Filter by category (Buy/Rent/Off-Plan)
- Price range filtering (future)
- Multiple amenity filters

### 5. **PayPal Integration**

**Payment Flow:**
1. User clicks "Upgrade to Premium"
2. Redirect to PayPal checkout
3. User completes payment
4. PayPal returns to success page
5. Subscription activated in system
6. Full premium features unlocked

**PayPal Sandbox Setup:**
```
Replace in subscription-config.js:
- businessEmail: Your PayPal Business Email
- returnUrl: Your domain + /payment-success.html
- cancelUrl: Your dashboard URL
```

### 6. **Broker Team Management**

**Broker Features:**
- Add team members (agents)
- Manage agent permissions
- View team performance
- Assign properties to agents
- Priority support

**Agent Features (Premium):**
- Create listings for broker
- Access client database
- View analytics
- Priority support

### 7. **Dashboard Components**

**Overview Section:**
- Total listings count
- Total views across listings
- Total inquiries
- Current subscription status
- Recent listings preview

**My Listings Section:**
- View all user listings
- Edit listings
- Delete listings
- View individual listing stats

**Create Listing Section:**
- Complete listing form
- Multi-file upload (photos/videos)
- Amenity selection
- Real-time validation
- Listing counter (Free: 5/month, Premium: unlimited)

**Subscription Section:**
- Side-by-side plan comparison
- Feature highlights
- PayPal payment button
- Current plan indicator

**Team Management (Broker Only):**
- Add team members
- View team roster
- Manage permissions
- Track team performance

**Analytics (Premium Only):**
- Views per listing
- Conversion rates
- Inquiry response times
- Performance trends

## Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Storage:** LocalStorage (for demo)
- **Payment Gateway:** PayPal (Sandbox)
- **Architecture:** Client-side application

## File Structure

```
├── index.html                    # Main homepage
├── auth.html                     # Login/Register page
├── auth.js                       # Authentication logic
├── auth-styles.css               # Auth styling
├── dashboard.html                # Main dashboard
├── dashboard.js                  # Dashboard logic
├── dashboard-styles.css          # Dashboard styling
├── subscription-config.js        # Subscription & PayPal config
├── payment-success.html          # Payment success page
└── README-SUBSCRIPTION.md        # This file
```

## Usage Instructions

### 1. **Creating an Account**
```
1. Go to auth.html
2. Click "Register Here"
3. Fill in details:
   - Full Name
   - Email
   - Phone
   - Account Type (Owner/Agent/Broker)
   - Password
4. Click "Create Account"
```

### 2. **Creating a Property Listing**

**Free Users:**
```
1. Go to Dashboard
2. Click "Create Listing"
3. Fill in basic info (up to 5/month)
4. Click "Create Listing"
```

**Premium Users:**
```
1. All free features
2. Plus: Upload photos/videos
3. Unlimited listings
4. Property analysis tools
```

### 3. **Upgrading to Premium**
```
1. Go to Subscription section
2. Click "Upgrade Now"
3. Complete PayPal payment
4. Return to dashboard
5. Full premium access activated
```

### 4. **Managing Team (Brokers Only)**
```
1. Go to Team Management
2. Click "Add Team Member"
3. Enter agent email
4. Send invitation
5. Agent receives access
```

## Payment Integration Details

### PayPal Configuration

**Sandbox Testing:**
```javascript
// In subscription-config.js
const PAYPAL_CONFIG = {
    sandboxMode: true,
    businessEmail: 'your-paypal-business-email@example.com',
    returnUrl: 'https://yourdomain.com/payment-success.html',
    cancelUrl: 'https://yourdomain.com/dashboard.html'
};
```

**Test Credentials (Sandbox):**
- Buyer Email: sb-xxxxxx@personal.example.com
- Password: Available in PayPal Sandbox Dashboard

**For Production:**
1. Change `sandboxMode: false`
2. Use live PayPal URLs
3. Use production business email
4. Set up webhook for payment verification

## Data Structure

### User Object
```javascript
{
    id: 123456,
    name: "John Doe",
    email: "john@example.com",
    phone: "+971503333333",
    role: "owner",  // owner, agent, broker
    password: "hashed_password",
    subscription: {
        plan: "free",  // free or premium
        status: "active",
        listingsUsed: 2,
        maxListings: 5,
        features: {
            analysis: false,
            prioritySupport: false,
            videoUpload: false
        }
    },
    teamMembers: [],  // For brokers
    createdAt: "2026-07-26T10:00:00Z"
}
```

### Listing Object
```javascript
{
    id: 987654,
    userId: 123456,
    title: "Luxury Marina Apartment",
    type: "apartment",  // apartment, villa, townhouse, studio
    category: "buy",   // buy, rent, offplan
    price: 850000,
    location: "Dubai Marina",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    description: "Stunning apartment...",
    amenities: ["pool", "gym", "parking"],
    media: ["photo1.jpg", "video1.mp4"],
    views: 450,
    inquiries: 12,
    createdAt: "2026-07-26T10:00:00Z"
}
```

## Future Enhancements

1. **Backend Integration**
   - Move to Node.js/Express backend
   - Database: MongoDB or PostgreSQL
   - Secure payment processing

2. **Advanced Features**
   - Property financing calculator
   - Mortgage calculator
   - Virtual property tours (3D)
   - AI-powered property recommendations
   - SMS notifications

3. **Enhanced Analytics**
   - Market trends
   - Price prediction
   - Buyer demographics
   - Comparative market analysis

4. **Additional Integrations**
   - Email marketing (MailChimp)
   - CRM system
   - Document management
   - Escrow services

5. **Mobile App**
   - React Native or Flutter
   - Push notifications
   - Offline mode

## Support & Contact

**Email:** info@empireproperty.ae
**Phone:** +971 54 322 5393
**Hours:** Mon-Fri 9AM-6PM, Sat 10AM-4PM

## License

Mozilla Public License 2.0
