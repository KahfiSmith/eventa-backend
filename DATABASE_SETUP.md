# Database Setup Guide

## Overview

This guide will help you set up PostgreSQL with PostGIS extension for the Eventa Local Event Discovery App.

## Prerequisites

1. **PostgreSQL 15+** installed locally or via Docker
2. **PostGIS extension** available
3. **Node.js 18+** and **pnpm** package manager

## Quick Setup with Docker (Recommended)

### 1. Start PostgreSQL with PostGIS

```bash
# Using the provided docker-compose.yml
docker-compose up -d postgres

# Or run PostgreSQL+PostGIS manually
docker run -d \
  --name eventa-postgres \
  -e POSTGRES_DB=eventa_db \
  -e POSTGRES_USER=eventa_user \
  -e POSTGRES_PASSWORD=eventa_password \
  -p 5432:5432 \
  postgis/postgis:15-3.3
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the database configuration in `.env`:

```env
DATABASE_URL=postgresql://eventa_user:eventa_password@localhost:5432/eventa_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventa_db
DB_USER=eventa_user
DB_PASSWORD=eventa_password
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Database Migrations

```bash
npx prisma migrate deploy
```

### 6. Seed the Database

```bash
npx prisma db seed
```

### 7. Test the Setup

```bash
npx ts-node scripts/test-db.ts
```

## Manual PostgreSQL Setup

### 1. Install PostgreSQL and PostGIS

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib postgis postgresql-15-postgis-3
```

**macOS (using Homebrew):**
```bash
brew install postgresql postgis
```

**Windows:**
Download PostgreSQL from [official website](https://www.postgresql.org/download/windows/) and install PostGIS extension.

### 2. Create Database and User

```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Create user and database
CREATE USER eventa_user WITH PASSWORD 'eventa_password';
CREATE DATABASE eventa_db OWNER eventa_user;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE eventa_db TO eventa_user;

# Connect to the new database
\c eventa_db

# Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

# Exit psql
\q
```

### 3. Continue with steps 2-7 from Docker setup

## Database Schema Overview

### Core Models

- **User**: User accounts with role-based access (ATTENDEE, ORGANIZER, VENUE_OWNER, ADMIN)
- **Category**: Event categories (Technology, Music, Sports, etc.)
- **Venue**: Physical locations with PostGIS coordinates
- **Event**: Events with location, timing, and ticketing information
- **TicketTier**: Multiple pricing tiers per event
- **Ticket**: Individual tickets with QR codes
- **Payment**: Payment processing with Midtrans integration

### Location Features

The schema includes PostGIS integration for:
- Venue coordinates (latitude/longitude)
- Distance-based venue searches
- Location-based event recommendations
- User location tracking (optional)

### Key Relationships

- Users can be organizers, venue owners, or attendees
- Events belong to categories and venues
- Events can have multiple ticket tiers
- Users can purchase tickets and attend events
- Reviews and favorites link users to events

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm db:migrate` | Deploy pending migrations |
| `pnpm db:seed` | Seed database with sample data |
| `pnpm db:reset` | Reset database (⚠️ destructive) |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx prisma db push` | Push schema changes without migration |

## Prisma Studio

Access the database GUI:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` to browse and edit data.

## Sample Data

The seed script creates:

- **6 users** (admin, organizers, venue owner, attendees)
- **7 categories** (Technology, Business, Music, Sports, Food, Arts, Education)
- **4 venues** in major Indonesian cities
- **5 events** with various ticket types
- **Sample tickets, payments, and reviews**

### Test Credentials

| Role | Email | Username | Password |
|------|-------|----------|----------|
| Admin | admin@eventa.com | admin | password123 |
| Organizer | john.organizer@eventa.com | johnorganizer | password123 |
| Venue Owner | venue.owner@eventa.com | venueowner1 | password123 |
| Attendee | alice.attendee@eventa.com | aliceattendee | password123 |

## Troubleshooting

### Common Issues

**1. PostGIS Extension Not Found**
```bash
# Install PostGIS
sudo apt install postgresql-15-postgis-3  # Ubuntu
brew install postgis                       # macOS
```

**2. Connection Refused**
- Ensure PostgreSQL is running
- Check port 5432 is not blocked
- Verify DATABASE_URL in .env

**3. Permission Denied**
```sql
-- Grant proper permissions
GRANT ALL PRIVILEGES ON DATABASE eventa_db TO eventa_user;
GRANT USAGE, CREATE ON SCHEMA public TO eventa_user;
```

**4. Migration Fails**
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate deploy
```

### Useful Commands

```bash
# Check database connection
npx prisma db pull

# Generate client after schema changes
npx prisma generate

# View migration status
npx prisma migrate status

# Create new migration
npx prisma migrate dev --name migration_name
```

## Production Considerations

1. **Environment Variables**: Use secure values in production
2. **Connection Pooling**: Consider using PgBouncer
3. **Backups**: Set up automated backups
4. **SSL**: Enable SSL connections in production
5. **Monitoring**: Monitor query performance and connections
6. **Indexing**: Add indexes for frequently queried columns

## Location-Based Queries

### Finding Nearby Venues

```sql
-- Find venues within 10km of a location
SELECT name, address,
       ST_Distance(
         ST_Point(longitude, latitude)::geography,
         ST_Point(106.8456, -6.2088)::geography
       ) / 1000 as distance_km
FROM venues
WHERE ST_Distance(
        ST_Point(longitude, latitude)::geography,
        ST_Point(106.8456, -6.2088)::geography
      ) <= 10000
ORDER BY distance_km;
```

### Location-Based Event Search

```sql
-- Find events near user's location
SELECT e.title, v.name as venue_name,
       ST_Distance(
         ST_Point(v.longitude, v.latitude)::geography,
         ST_Point(106.8456, -6.2088)::geography
       ) / 1000 as distance_km
FROM events e
JOIN venues v ON e.venue_id = v.id
WHERE e.status = 'PUBLISHED'
  AND ST_Distance(
        ST_Point(v.longitude, v.latitude)::geography,
        ST_Point(106.8456, -6.2088)::geography
      ) <= 25000
ORDER BY distance_km, e.start_date;
```

---

**Need help?** Check the [Prisma documentation](https://www.prisma.io/docs) or [PostGIS manual](https://postgis.net/docs/).