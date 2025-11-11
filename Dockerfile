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

# Expose port
EXPOSE 3000

# ***Runtime Stage***
FROM node:22-alpine AS runtime
WORKDIR /app

# Copy standalone build and required static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./static
COPY --from=builder /app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]