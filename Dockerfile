# === Stage 1: Install dependencies ===
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# === Stage 2: Build the app ===
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build    # produces build/client

# === Stage 3: Serve with nginx ===
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx page
RUN rm -rf ./*

# Copy CSR build output
COPY --from=build /app/build/client ./

# Add custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
