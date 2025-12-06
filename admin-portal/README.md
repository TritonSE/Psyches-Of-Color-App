# Psyches of Color - Admin Portal

Admin portal for managing and monitoring the Psyches of Color mobile application.

## Features

- **Statistics Dashboard**: Comprehensive analytics and metrics

  - User activity tracking (total users, new accounts, check-ins, journal entries)
  - Monthly activity trends
  - User retention analytics
  - Onboarding demographics (age, gender, ethnicity, education, counseling experience)
  - Lesson ratings and feedback

- **Authentication**: Secure email/password login with admin verification

- **Future Features** (Coming Soon):
  - Content editor for lessons and activities
  - User management and settings

## Data Status: Real vs Placeholder

The statistics dashboard displays a mix of real database data and placeholder values:

### ✅ Real Data (from MongoDB)

- **Total User Count**: Actual count from User collection
- **Avg Check-Ins/User**: Calculated from Mood collection (last 6 months)
- **Avg Entries/User**: Calculated from JournalEntry collection (last 6 months)
- **Monthly Activity Chart**: Real check-ins and journal entries over last 6 months
- **User Retention Curve**: Real data based on last activity dates
- **All Onboarding Analytics**: Real demographics from user onboarding responses
  - Age distribution
  - Gender distribution
  - Ethnicity breakdown
  - Education levels
  - Counseling experience
  - Residence (urban/suburban/rural)

### ❌ Placeholder Data (hardcoded)

#### New Accounts Created

- **Status**: Returns 0
- **Reason**: User model doesn't have `createdAt` timestamp
- **How to fix**: Add `timestamps: true` to userSchema in `backend/src/models/users.ts`

#### Percentage Changes ("↑ 100% vs. Last Month")

- **Status**: Hardcoded in frontend
- **Reason**: No historical data tracking for month-over-month comparison
- **How to fix**: Implement time-series data collection or store previous month's metrics

#### Avg Time App Opened

- **Status**: Shows same value as New Accounts Created (0)
- **Reason**: No app open tracking exists
- **How to fix**: Add app open event tracking to mobile app and backend

#### All Lesson Ratings Data

- **Status**: Completely hardcoded (averageRating: 4.37, all unit ratings)
- **Reason**: No rating system exists in the application
- **How to fix**:
  1. Create Rating model in backend (fields: userId, lessonId, unitId, rating, createdAt)
  2. Add rating UI in mobile app after lesson completion
  3. Update `/api/stats` endpoint to aggregate real ratings
  4. This is a significant feature addition requiring mobile app changes

### Code Documentation

All placeholder/dummy data in the codebase is marked with `// DUMMY DATA:` comments explaining:

- Why it's placeholder data
- What's needed to make it real
- Where to find related code

See:

- `admin-portal/src/app/dashboard/page.tsx` - Frontend placeholder data comments
- `backend/src/routes/stats.ts` - Backend placeholder data comments

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:3000`
- Firebase project configured

### Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env` file:

The `admin-portal/.env` file should contain:

```env
# Firebase Configuration (use same config as mobile app)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Development Mode (NEVER USE IN PRODUCTION!)
# Set to "true" to bypass authentication during development
NEXT_PUBLIC_DEV_BYPASS_AUTH=false

# Set to "true" to use mock data instead of real API calls
NEXT_PUBLIC_USE_MOCK_DATA=false
```

> **Note**: You can also use `.env.local` if you prefer. Both work the same way - `.env.local` has slightly higher priority and is guaranteed to never be committed to git.

### Quick Start for Development (Without Backend Setup)

For rapid frontend development without setting up the backend or Firebase, update your `.env`:

```env
# In admin-portal/.env - DEV ONLY configuration
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

⚠️ **WARNING**: Never set `DEV_BYPASS_AUTH` or `USE_MOCK_DATA` to `true` in production!

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Admin Account Setup

### Creating Admin Users

Admin users need to be created with the `isAdmin` flag set to `true` in the database. Here's how:

1. Create a user account in Firebase Authentication with any email address

   - Example: `admin@psychesofcolor.com` or `manager@example.com`

2. Update the user document in MongoDB to set `isAdmin: true`:

```javascript
db.users.updateOne({ email: "admin@psychesofcolor.com" }, { $set: { isAdmin: true } });
```

3. Login to the admin portal using:
   - Email: The email address used in Firebase (e.g., `admin@psychesofcolor.com`)
   - Password: (the password set in Firebase)

### Login Credentials Format

The admin portal uses standard email/password authentication:

- **Email**: Any valid email address registered in Firebase Auth
- **Password**: Set in Firebase Authentication

## Project Structure

```
admin-portal/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Main dashboard with statistics
│   │   ├── login/              # Login page
│   │   └── page.tsx            # Root redirect page
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/
│   │   ├── api.ts              # API client functions
│   │   └── firebase.ts         # Firebase configuration
│   └── public/                 # Static assets
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: Firebase Auth
- **Styling**: CSS Modules
- **Charts**: Custom SVG-based visualizations

## Development

### Development Modes

The admin portal supports multiple development modes for easier testing:

#### 1. **Frontend Auth Bypass** (`NEXT_PUBLIC_DEV_BYPASS_AUTH=true`)

Skips authentication entirely, allowing you to access the portal without logging in.

- **Use case**: Frontend development without setting up Firebase
- **Behavior**: Automatically logs you in as a mock admin user
- **Console warning**: Shows "⚠️ DEV MODE: Authentication bypassed!"

#### 2. **Mock Data Mode** (`NEXT_PUBLIC_USE_MOCK_DATA=true`)

Returns realistic mock data instead of making actual API calls.

- **Use case**: Frontend development without backend or with limited database data
- **Behavior**: Returns pre-populated statistics with realistic numbers
- **Data includes**:
  - 3,240 total users
  - Realistic onboarding demographics
  - Monthly activity trends
  - User retention curves
- **Console warning**: Shows "⚠️ DEV MODE: Using mock statistics data!"

#### 3. **Backend Auth Bypass** (`DEV_SKIP_AUTH=true` in backend/.env)

⚠️ **DANGEROUS - DEV ONLY** ⚠️

Completely bypasses authentication verification on the backend API.

- **Use case**: Testing real backend data without Firebase auth setup
- **Behavior**: Backend skips token verification and admin checks
- **Console warning**: Shows large warning banner on startup and logs each bypassed request
- **⚠️ CRITICAL**: This disables ALL authentication. Never use in production!
- **Required**: Must be used with frontend auth bypass to work properly

#### Recommended Development Setup

**Option A: Full Stack Development** (Production-like)

```env
# In admin-portal/.env
NEXT_PUBLIC_DEV_BYPASS_AUTH=false
NEXT_PUBLIC_USE_MOCK_DATA=false
```

Run both backend and admin portal. Requires Firebase and MongoDB setup.

**Option B: Frontend Only Development** (Fastest setup)

```env
# In admin-portal/.env
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_USE_MOCK_DATA=true
```

No backend, Firebase, or database needed. Perfect for UI/UX work.

**Option D: Test Real Backend Data Without Auth** (⚠️ DEV ONLY)

```env
# In admin-portal/.env
NEXT_PUBLIC_DEV_BYPASS_AUTH=true
NEXT_PUBLIC_USE_MOCK_DATA=false

# In backend/.env
DEV_SKIP_AUTH=true
```

Bypass authentication on both frontend and backend to test real database queries. Requires backend + MongoDB running.

⚠️ **CRITICAL**: Never use `DEV_SKIP_AUTH=true` in production! This completely disables authentication.

**Option C: Backend Testing with Mock Data**

```env
# In admin-portal/.env
NEXT_PUBLIC_DEV_BYPASS_AUTH=false
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Test authentication flow with beautiful mock data for visualization.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint-fix` - Fix linting issues
- `npm run format` - Format code with Prettier

### Port Configuration

By default, the admin portal runs on port 3001 to avoid conflicts with the backend (port 3000). To change this, modify the dev script in `package.json`:

```json
"dev": "next dev -p 3001"
```

## API Integration

The admin portal connects to the backend at `/api/stats` endpoint to fetch:

- User activity metrics
- Monthly activity data
- User retention statistics
- Onboarding demographics
- Lesson ratings

Authentication is handled via Firebase tokens in the Authorization header.

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

Ensure all environment variables are properly set in your production environment. Never commit `.env.local` to version control.

## Security

- Admin verification is enforced at both frontend and backend levels
- Firebase Auth tokens are used for API authentication
- Only users with `isAdmin: true` can access the portal
- Unauthorized access attempts are logged and rejected

## Troubleshooting

### "Access denied. Admin privileges required"

- Verify the user has `isAdmin: true` in the database
- Check Firebase Authentication is properly configured
- Ensure the backend server is running and accessible

### "Failed to fetch statistics"

- Verify the backend server is running on the correct port
- Check CORS settings allow requests from the admin portal
- Ensure the API endpoint `/api/stats` is accessible

### Authentication Issues

- Verify Firebase configuration in `.env` matches the project
- Ensure the email address exists in Firebase Auth
- Check that the user has `isAdmin: true` in MongoDB

## Contributing

Follow the project's conventional commit guidelines when making changes. See the main project README for details.

## License

See LICENSE file in the project root.
