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
    echo "  Running migrations and seed..."
    echo "==================================="
    
    # Run in dev mode to trigger automatic migrations and seed
    npm run dev &
    DEV_PID=$!
    
    # Wait for migrations and seed to complete
    echo "Waiting for migrations and seed to complete..."
    sleep 90
    
    # Kill dev server
    kill $DEV_PID 2>/dev/null || true
    sleep 5
    
    echo "Migrations and seed completed!"
    
    # Create admin user
    echo ""
    echo "==================================="
    echo "  Creating admin user..."
    echo "==================================="
    node /app/create-admin.js || true
    
    echo ""
fi

echo "==================================="
echo "  Starting production server..."
echo "==================================="
exec npm run start
