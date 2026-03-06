#!/bin/sh
set -e

echo "==================================="
echo "  Sweet Dreams Bakery"
echo "==================================="

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
while ! nc -z $DB_HOST $DB_PORT 2>/dev/null; do
    sleep 2
done
echo "PostgreSQL ready!"

# Just start the production server
# EverShop handles migrations automatically on first start
echo ""
echo "Starting production server..."
exec npm run start
