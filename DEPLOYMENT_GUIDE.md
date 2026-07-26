# Deployment Guide

## Environment Setup

### Production Environment Variables

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://prod-user:password@prod-cluster.mongodb.net/empire-prod
JWT_SECRET=production-secret-key-min-32-chars
PAYPAL_MODE=live
PAYPAL_CLIENT_ID=production-client-id
PAYPAL_SECRET=production-secret
FRONTEND_URL=https://empireproperty.ae
```

## Backend Deployment

### Option 1: Heroku

```bash
# Create Heroku app
heroku create empire-property-api

# Add environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=<production-mongodb-uri>

# Deploy
git push heroku main
```

### Option 2: AWS EC2

```bash
# SSH into instance
ssh -i key.pem ec2-user@ec2-instance-ip

# Clone repository
git clone <repo-url>
cd EMPIRE-PROPERTYB-SHOWROOM-

# Install dependencies
npm install --production

# Start server with PM2
pm2 start src/index.js --name "empire-api"
```

### Option 3: Docker

```bash
# Build Docker image
docker build -t empire-api:latest .

# Push to Docker Hub
docker push your-username/empire-api:latest

# Deploy to Docker Hub or container service
```

## Frontend Deployment

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Mobile App Deployment

### iOS (App Store)

```bash
eas build --platform ios --auto-submit
```

### Android (Google Play)

```bash
eas build --platform android
```

## Monitoring

- New Relic for performance monitoring
- Sentry for error tracking
- CloudFlare for CDN/caching
