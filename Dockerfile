# Stage 1: Build the application
FROM node:20-alpine AS build

# Install build tools
RUN apk add --no-cache make gcc g++ python3 autoconf automake

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the built files from the build stage
COPY --from=build /app/frontend/dist ./frontend/dist
COPY --from=build /app/backend/dist ./backend/dist

# Copy package.json for production install
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "backend/dist/server.js"]
