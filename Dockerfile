# Dockerfile

# ***Build Stage***
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy all code
COPY . .

# Build the application
RUN npm run build

# ***Runtime Stage***
FROM node:22-alpine AS runtime
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Copy standalone build and required static files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]