import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test PostGIS extension
    const result = await prisma.$queryRaw`SELECT PostGIS_Version() as version`;
    console.log('✅ PostGIS extension available:', result);
    
    // Test basic queries
    const userCount = await prisma.user.count();
    const eventCount = await prisma.event.count();
    const categoryCount = await prisma.category.count();
    
    console.log('📊 Database Statistics:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Events: ${eventCount}`);
    console.log(`   Categories: ${categoryCount}`);
    
    // Test location queries (using raw SQL for PostGIS functions)
    const nearbyVenues = await prisma.$queryRaw`
      SELECT name, latitude, longitude,
             ST_Distance(
               ST_Point(longitude, latitude)::geography,
               ST_Point(106.8456, -6.2088)::geography
             ) / 1000 as distance_km
      FROM venues
      WHERE ST_Distance(
              ST_Point(longitude, latitude)::geography,
              ST_Point(106.8456, -6.2088)::geography
            ) <= 50000
      ORDER BY distance_km
      LIMIT 5
    `;
    
    console.log('🗺️ Nearby venues (within 50km of Jakarta center):');
    console.log(nearbyVenues);
    
    console.log('✅ All database tests passed!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();