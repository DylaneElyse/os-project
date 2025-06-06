# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./

# Copy the public and .next/static folders
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# The command to start the app
CMD ["node", "server.js"]