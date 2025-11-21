# Psyches of Color - Backend

Node.js/Express backend API for the Psyches of Color mobile application and admin portal.

## Features

- **RESTful API**: Endpoints for users, moods, journal entries, lessons, activities, and statistics
- **Authentication**: Firebase Auth integration with JWT token verification
- **Database**: MongoDB with Mongoose ODM
- **Admin Statistics**: Comprehensive analytics endpoint for the admin portal
- **Email**: Email functionality for user communications

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Firebase Admin SDK
- **Validation**: Envalid for environment variables

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Firebase project with Admin SDK credentials

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Create a `.env` file in the `backend/` directory (see `.env.example` for all options):

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/psyches-of-color

# Email Configuration
EMAIL_USER=your-email@example.com

# Firebase Service Account (entire JSON as a string)
SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Development Mode (optional, default: false)
DEV_SKIP_AUTH=false
```

3. Start the development server:

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Users

- `GET /api/users/:uid` - Get user by Firebase UID
- `POST /api/users` - Create new user
- `PUT /api/users/:uid` - Update user

### Moods

- `GET /api/moods/:uid` - Get user's mood entries
- `POST /api/moods` - Create mood entry

### Journal Entries

- `GET /api/journalEntries/:authorId` - Get user's journal entries
- `POST /api/journalEntries` - Create journal entry
- `PUT /api/journalEntries/:id` - Update journal entry
- `DELETE /api/journalEntries/:id` - Delete journal entry

### Units & Lessons

- `GET /api/units` - Get all units
- `GET /api/units/:id` - Get unit by ID
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson by ID

### Activities

- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID

### Statistics (Admin Only)

- `GET /api/stats` - Get comprehensive statistics
  - Requires Firebase authentication token
  - Requires admin user (`isAdmin: true`)
  - Returns user activity, demographics, retention data

## Development

### Development Mode

The backend supports a development mode that bypasses authentication for testing purposes.

#### DEV_SKIP_AUTH Flag

⚠️ **DANGEROUS - DEV ONLY** ⚠️

When `DEV_SKIP_AUTH=true` is set in `.env`, the backend will:

- Skip Firebase token verification
- Skip admin privilege checks
- Accept all API requests without authentication
- Display large warning banner on startup
- Log each request that bypasses authentication

**Use case**: Testing real backend data without setting up Firebase Auth

**Setup**:

```env
# In backend/.env
DEV_SKIP_AUTH=true
```

**⚠️ CRITICAL WARNING**:

- This completely disables ALL authentication
- ANY request will be accepted
- NEVER use this in production
- NEVER commit `.env` with this enabled

**When to use**:

- Local development without Firebase
- Testing database queries
- Integration testing with admin portal

**When NOT to use**:

- Production environment
- Staging environment
- Any environment accessible from outside your local machine

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint        # Check for issues
npm run lint-fix    # Fix issues automatically
```

### Available Scripts

- `npm start` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint-fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## Project Structure

```
backend/
├── src/
│   ├── middleware/
│   │   ├── auth.ts           # Authentication middleware
│   │   └── errorHandler.ts   # Error handling middleware
│   ├── models/
│   │   ├── users.ts          # User model and schema
│   │   ├── mood.ts           # Mood check-in model
│   │   ├── journalEntry.ts   # Journal entry model
│   │   ├── lesson.ts         # Lesson model
│   │   ├── unit.ts           # Unit model
│   │   └── activity.ts       # Activity model
│   ├── routes/
│   │   ├── users.ts          # User endpoints
│   │   ├── mood.ts           # Mood endpoints
│   │   ├── journalEntry.ts   # Journal endpoints
│   │   ├── lesson.ts         # Lesson endpoints
│   │   ├── unit.ts           # Unit endpoints
│   │   ├── activity.ts       # Activity endpoints
│   │   └── stats.ts          # Statistics endpoints (admin)
│   ├── services/
│   │   ├── auth.ts           # Firebase Auth service
│   │   └── firebase.ts       # Firebase Admin initialization
│   ├── validators/
│   │   └── ...               # Request validation schemas
│   ├── util/
│   │   └── validateEnv.ts    # Environment validation
│   └── server.ts             # Express app setup
├── package.json
├── tsconfig.json
└── .env                      # Environment variables (gitignored)
```

## Database Models

### User

- Basic user information
- Character selection
- Completed lessons tracking
- Onboarding demographics
- Admin flag (`isAdmin`)

### Mood

- Daily mood check-ins
- Timestamps and user association
- One mood per user per day

### Journal Entry

- User journal entries
- Title and content
- Optional image URLs
- Timestamps

### Unit & Lesson

- Course content structure
- Lessons grouped into units
- Progress tracking

### Activity

- Interactive lesson activities
- Multiple choice, reflection, and scenario questions

## Authentication

The backend uses Firebase Admin SDK for authentication:

1. Client sends Firebase ID token in Authorization header: `Bearer <token>`
2. Backend verifies token with Firebase
3. Extracts user UID from verified token
4. Checks user permissions (admin flag for protected endpoints)

### Admin Users

To create an admin user:

1. Create user in Firebase Authentication
2. Create user document in MongoDB
3. Set `isAdmin: true` in the user document:

```javascript
db.users.updateOne({ email: "admin@psychesofcolor.com" }, { $set: { isAdmin: true } });
```

## Error Handling

The backend uses centralized error handling:

- Validation errors: 400 Bad Request
- Authentication errors: 401 Unauthorized
- Authorization errors: 403 Forbidden
- Not found errors: 404 Not Found
- Server errors: 500 Internal Server Error

## Security

- Firebase token verification on all protected routes
- Admin privilege checks for sensitive endpoints
- CORS configured for frontend and admin portal origins
- Environment variables for sensitive credentials
- Input validation on all endpoints

## Deployment

### Environment Variables

Ensure all required environment variables are set in production:

- ✅ `PORT` - Server port
- ✅ `MONGODB_URI` - MongoDB connection string
- ✅ `EMAIL_USER` - Email for notifications
- ✅ `SERVICE_ACCOUNT_KEY` - Firebase service account JSON
- ❌ `DEV_SKIP_AUTH` - Must be `false` or unset

### Production Checklist

- [ ] All environment variables configured
- [ ] `DEV_SKIP_AUTH` is NOT set or set to `false`
- [ ] MongoDB connection string uses authentication
- [ ] CORS origins updated for production domains
- [ ] Firebase service account credentials secured
- [ ] Error logging configured
- [ ] Database indexes created for performance

## Troubleshooting

### "Unauthorized: No token provided"

- Check that Authorization header is included: `Bearer <token>`
- Verify token is a valid Firebase ID token
- Ensure `DEV_SKIP_AUTH` is not interfering

### "Access denied. Admin privileges required"

- Verify user has `isAdmin: true` in database
- Check user UID matches token UID
- Confirm user document exists in MongoDB

### "MongoDB connection error"

- Verify `MONGODB_URI` is correct
- Check MongoDB is running (if local)
- Verify network connectivity (if remote)
- Check authentication credentials

### Development Mode Not Working

- Ensure `DEV_SKIP_AUTH=true` is in `.env` file
- Check console for warning banner on startup
- Verify `.env` file is in `backend/` directory
- Restart the server after changing `.env`

## Contributing

Follow the project's conventional commit guidelines when making changes. See the main project README for details.

## License

See LICENSE file in the project root.
