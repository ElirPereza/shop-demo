# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY themes/sweetdreambakery/package*.json ./themes/sweetdreambakery/
COPY extensions/sweetdreambakery/package*.json ./extensions/sweetdreambakery/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Compile extension and theme
RUN cd extensions/sweetdreambakery && npm install && npm run compile
RUN cd themes/sweetdreambakery && npm install && npm run build

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install netcat for health checks and psql for DB checks
RUN apk add --no-cache netcat-openbsd postgresql-client

# Copy built application
COPY --from=builder /app ./

# Copy and setup entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start with entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"]
