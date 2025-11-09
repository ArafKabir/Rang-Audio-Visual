# === Stage 1: Install dependencies for development ===
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# === Stage 2: Build the app ===
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# === Stage 3: Production runtime ===
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy only what’s needed
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build

EXPOSE 5173
CMD ["npm", "run", "start"]