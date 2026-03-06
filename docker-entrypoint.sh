#!/bin/sh
set -e

echo "==================================="
echo "  Sweet Dreams Bakery - Starting"
echo "==================================="

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL at $DB_HOST:$DB_PORT..."
while ! nc -z $DB_HOST $DB_PORT 2>/dev/null; do
    echo "PostgreSQL not ready, waiting..."
    sleep 2
done
echo "PostgreSQL is ready!"

# Check if database is already initialized (check for 'setting' table)
DB_INITIALIZED=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -tAc "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'setting');" 2>/dev/null || echo "f")

if [ "$DB_INITIALIZED" = "t" ]; then
    echo ""
    echo "Database already initialized, skipping setup..."
else
    echo ""
    echo "==================================="
    echo "  First run - Running migrations..."
    echo "==================================="
    
    # Run in dev mode to trigger automatic migrations
    timeout 120 npm run dev &
    DEV_PID=$!
    
    # Wait for server to be ready
    echo "Waiting for migrations (max 90 seconds)..."
    sleep 90
    
    # Kill dev server
    kill $DEV_PID 2>/dev/null || true
    sleep 3
    
    echo "Migrations completed!"
    
    echo ""
    echo "==================================="
    echo "  Seeding bakery products..."
    echo "==================================="
    npm run seed:bakery || echo "Seed completed or skipped"
    
    # Create admin user
    echo ""
    echo "==================================="
    echo "  Creating admin user..."
    echo "==================================="
    node /app/create-admin.js || echo "Admin created or already exists"
fi

echo ""
echo "==================================="
echo "  Starting PRODUCTION server..."
echo "==================================="
exec npm run start
