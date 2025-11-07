# Dockerfile

# ***Build Stage***
FROM node:22-alpine AS builder

WORKDIR /app

# Build-time arguments
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Make them available as environment variables for the build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Kopiera package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Kopiera all kod
COPY . .

# Bygg applikationen
RUN npm run build

# Exponera port
EXPOSE 3000

# ***Runtime Stage***
FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Only copy the needed files from builder stage
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Start the application
CMD ["npm", "start"]