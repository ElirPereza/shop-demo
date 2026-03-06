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

# Check if this is first run (AUTO_INSTALL=true means run migrations + seed)
if [ "$AUTO_INSTALL" = "true" ]; then
    echo ""
    echo "==================================="
    echo "  Running migrations..."
    echo "==================================="
    
    # Run in dev mode to trigger automatic migrations
    npm run dev &
    DEV_PID=$!
    
    # Wait for migrations to complete (check for server ready)
    echo "Waiting for migrations to complete..."
    sleep 60
    
    # Kill dev server
    kill $DEV_PID 2>/dev/null || true
    sleep 5
    
    echo "Migrations completed!"
    
    echo ""
    echo "==================================="
    echo "  Seeding bakery products..."
    echo "==================================="
    npm run seed:bakery || echo "Seed may have already run or failed"
    
    # Create admin user
    echo ""
    echo "==================================="
    echo "  Creating admin user..."
    echo "==================================="
    node /app/create-admin.js || echo "Admin may already exist"
    
    echo ""
fi

echo "==================================="
echo "  Starting production server..."
echo "==================================="
exec npm run start
