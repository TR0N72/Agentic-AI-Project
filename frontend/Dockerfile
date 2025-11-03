# --- Build Stage ---
# Use a Node.js image with build tools
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
# This layer is cached and only re-runs if package files change
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# --- Production Stage ---
# Use a lightweight web server to serve the static files
FROM nginx:stable-alpine

# Copy the built assets from the "builder" stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the nginx config
COPY netlify.toml /etc/nginx/conf.d/default.conf

# Expose port 80 and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
