# DataAware - Backend API

> RESTful API providing educational content and data management for the DataAware privacy education platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1-green)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748)](https://www.prisma.io/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Security](#security)
- [License](#license)

## Overview

The DataAware backend is a TypeScript-based Express.js API that serves educational content about mobile app privacy, data collection practices, and economic valuations. It provides RESTful endpoints for:

- App category information with permissions, trackers, and sensors
- Comprehensive permission database with risk scores
- Tracking SDK information and protection tips
- Device sensor capabilities and privacy implications
- Economic valuation data for different data types
- Assessment insights infrastructure (for future use)

## Features

### Core Capabilities
- **Type-Safe Database Access** via Prisma ORM
- **Structured Data Models** for content delivery
- **Fast Response Times** with optimized queries
- **CORS Support** for secure cross-origin requests
- **Request Validation** with proper error handling
- **PostgreSQL Database** for reliable data persistence

### API Features
- RESTful endpoint design following best practices
- JSON response format with consistent structure
- Pagination support for large datasets
- Search and filtering capabilities
- Comprehensive error messages
- Request logging for debugging

## Tech Stack

### Core Technologies
- **Node.js 18+** - JavaScript runtime
- **Express.js 4.18** - Web application framework
- **TypeScript 5.2** - Type-safe development
- **PostgreSQL 15** - Relational database
- **Prisma 5.7** - Type-safe ORM and query builder

### Key Libraries
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management
- **ts-node** - TypeScript execution for Node.js
- **nodemon** - Development hot-reload

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 15.x
- npm 9.x or yarn 1.22.x

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/dataaware-backend.git
cd dataaware-backend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```
Edit `.env` with your database credentials (see [Environment Variables](#environment-variables))

4. **Set up the database**
```bash
# Create database (if not exists)
createdb dataaware

# Run Prisma migrations
npx prisma migrate dev

# Seed the database (optional)
npm run seed
```

5. **Start development server**
```bash
npm run dev
# or
yarn dev
```

The API will be available at `http://localhost:3000`

### Verify Installation

Test the API health endpoint:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "ok": true,
  "message": "Server is running"
}
```

## Project Structure

```
dataaware-backend/
├── prisma/
│   ├── migrations/         # Database migration files
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.ts            # Database seeding script
├── src/
│   ├── controllers/       # Request handlers
│   │   ├── categoriesController.ts
│   │   ├── permissionsController.ts
│   │   ├── trackersController.ts
│   │   ├── sensorsController.ts
│   │   ├── dataValuesController.ts
│   │   └── assessmentInsightsController.ts
│   ├── routes/           # API route definitions
│   │   ├── categories.routes.ts
│   │   ├── permissions.routes.ts
│   │   ├── trackers.routes.ts
│   │   ├── sensors.routes.ts
│   │   ├── dataValues.routes.ts
│   │   └── assessmentInsights.routes.ts
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── app.ts          # Express app configuration
│   └── server.ts       # Server entry point
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md
```

## API Documentation

### Base URL
- Development: `http://localhost:3000`
- Production: `https://your-api-domain.com`

### Response Format

All API responses follow this structure:

**Success Response:**
```json
{
  "ok": true,
  "message": "Success message",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "ok": false,
  "message": "Error message",
  "error": "Detailed error (dev mode only)"
}
```

### Endpoints

#### Categories
```
GET    /api/categories              # Get all app categories
GET    /api/categories/:id          # Get specific category
```

**Example Response:**
```json
{
  "ok": true,
  "message": "App Categories successfully retrieved",
  "data": {
    "appCategories": [
      {
        "id": 1,
        "name": "Social Media",
        "description": "Apps for sharing content and networking",
        "permissions": ["CAMERA", "MICROPHONE", "ACCESS_FINE_LOCATION"],
        "trackers": ["Google Ads SDK", "Facebook Analytics"],
        "sensors": ["Accelerometer", "Gyroscope"]
      }
    ],
    "pagination": {
      "totalAppCategories": 10,
      "currentPage": 1,
      "pageSize": 10
    }
  }
}
```

#### Permissions
```
GET    /api/permissions             # Get all permissions
GET    /api/permissions/:id         # Get specific permission
```

**Example Response:**
```json
{
  "ok": true,
  "data": {
    "permissions": [
      {
        "id": 1,
        "name": "ACCESS_FINE_LOCATION",
        "category": "Location",
        "sensitivity": "High",
        "riskScore": 0.85,
        "description": "Access user precise location",
        "protectionTip": "Allow only while using app"
      }
    ]
  }
}
```

#### Trackers
```
GET    /api/trackers                # Get all trackers
GET    /api/trackers/:id            # Get specific tracker
```

#### Sensors
```
GET    /api/sensors                 # Get all sensors
GET    /api/sensors/:id             # Get specific sensor
```

#### Data Values
```
GET    /api/dataValue               # Get economic valuations
GET    /api/dataValue/:id           # Get specific valuation
```

**Example Response:**
```json
{
  "ok": true,
  "data": {
    "dataValues": [
      {
        "id": 1,
        "name": "Location",
        "category": "Behavioural",
        "economicValueUsd": 1.8,
        "riskLevel": "High",
        "description": "Geolocation data reveals movement patterns",
        "commonUses": "Ad targeting, navigation",
        "protectionTip": "Disable background tracking"
      }
    ]
  }
}
```

#### Assessment Insights (Future Infrastructure)
```
POST   /api/assessment-insights     # Submit assessment data
GET    /api/assessment-insights     # Get all insights (admin)
GET    /api/assessment-insights/stats  # Get statistics
DELETE /api/assessment-insights/:sessionId  # Delete data (GDPR)
```

**Note:** Assessment endpoints exist as infrastructure but are not currently used for data collection, as evaluation is conducted via external surveys.

### Query Parameters

**Pagination:**
```
?page=1&limit=10
```

**Filtering:**
```
?sensitivity=High
?category=Location
```

**Sorting:**
```
?sortBy=riskScore&order=desc
```

## Database Schema

### Core Tables

**app_categories**
- Stores categorized mobile app types with associated data collection methods

**permissions**
- Android permission details with risk scores and protection tips

**trackers**
- Third-party SDK tracking information

**sensors**
- Device sensor capabilities and privacy implications

**data_values**
- Economic valuations for different data types

**assessment_insights** (Future)
- Infrastructure for potential assessment data collection

### Prisma Schema Example

```prisma
model Permission {
  id             Int      @id @default(autoincrement())
  name           String   @unique @db.VarChar(255)
  category       String   @db.VarChar(100)
  sensitivity    String   @db.VarChar(50)
  riskScore      Float
  description    String   @db.Text
  protectionTip  String   @db.Text
  dataType       String   @db.VarChar(100)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@map("permissions")
}
```

See `prisma/schema.prisma` for complete schema definition.

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/dataaware?schema=public"

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Optional: API Keys (if needed)
# API_SECRET_KEY=your_secret_key_here

# Optional: JWT Configuration (if auth is added)
# JWT_SECRET=your_jwt_secret
# JWT_EXPIRES_IN=7d
```

### Variable Descriptions

- `DATABASE_URL` - PostgreSQL connection string (required)
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `CORS_ORIGIN` - Allowed origin for CORS (frontend URL)

### Production Configuration

For production, ensure:
- Strong database credentials
- Secure connection strings (SSL enabled)
- Appropriate CORS origins
- Environment-specific optimizations

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot-reload
npm run build        # Compile TypeScript to JavaScript
npm run start        # Start production server

# Database
npm run migrate      # Run Prisma migrations
npm run seed         # Seed database with sample data
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript compiler checks

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
```

## Deployment

### Prerequisites
- PostgreSQL database hosted on cloud provider
- Node.js hosting platform (Heroku, Railway, Render, etc.)

### Environment Setup

1. **Set up production database**
   - Create PostgreSQL instance on cloud provider
   - Note connection string

2. **Configure environment variables**
   - Set `DATABASE_URL` with production connection string
   - Set `NODE_ENV=production`
   - Set `CORS_ORIGIN` to production frontend URL

3. **Run migrations**
```bash
npx prisma migrate deploy
```

### Deployment Platforms

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Heroku
```bash
# Install Heroku CLI
# Login and create app
heroku login
heroku create dataaware-api

# Set environment variables
heroku config:set DATABASE_URL="postgresql://..."
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma migrate deploy
```

#### Render
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

### Post-Deployment

1. **Verify API health**
```bash
curl https://your-api-url.com/health
```

2. **Test endpoints**
```bash
curl https://your-api-url.com/api/categories
```

3. **Update frontend** with production API URL

## Security

### Implemented Security Measures
- CORS configuration for trusted origins
- Environment variable protection
- SQL injection prevention via Prisma ORM
- Input validation on all endpoints
- Secure HTTP headers
- Rate limiting (recommended for production)

### Security Best Practices
```typescript
// Example: CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// Example: Input validation
if (!sessionId || typeof sessionId !== 'string') {
  return res.status(400).json({
    ok: false,
    message: 'Invalid session ID'
  });
}
```

### Recommended Additions
- Implement rate limiting (e.g., express-rate-limit)
- Add helmet.js for security headers
- Use API key authentication for admin endpoints
- Enable SSL/TLS in production
- Implement request logging for audit trails

## Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Verify PostgreSQL is running
pg_isready

# Check connection string format
# postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

**Prisma Migration Issues**
```bash
# Reset database (development only!)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate
```

**Port Already in Use**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port in .env
PORT=3001
```

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### API Testing with cURL
```bash
# Health check
curl http://localhost:3000/health

# Get categories
curl http://localhost:3000/api/categories

# Get specific permission
curl http://localhost:3000/api/permissions/1
```

## Performance

### Optimization Strategies
- Database indexing on frequently queried fields
- Query optimization via Prisma
- Response caching for static content
- Connection pooling for database
- Gzip compression for responses

### Monitoring
- Use logging middleware for request tracking
- Monitor database query performance
- Set up error tracking (e.g., Sentry)
- Implement health check endpoints

## Contributing

This is a Master's research project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Follow TypeScript and ESLint conventions
4. Write tests for new features
5. Update API documentation
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Manoj Shrestha**  

## Acknowledgments

- Prisma for excellent ORM tooling
- Express.js community
- PostgreSQL documentation
- TypeScript ecosystem

## Contact & Support

For questions or issues:
- Open an issue in the repository
- Check existing documentation
- Review error logs for debugging

---

**Note**: This API serves educational content for privacy awareness. Assessment data collection infrastructure exists but is not utilized in current deployment, following institutional ethical guidelines.
