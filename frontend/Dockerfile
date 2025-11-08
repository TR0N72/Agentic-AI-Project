FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps as it was in the original Dockerfile
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the application (client and server)
RUN npm run build

# Expose the port the app runs on
# The docker-compose.yml maps this to 3001 on the host
EXPOSE 3000

# Run the application
CMD ["npm", "start"]