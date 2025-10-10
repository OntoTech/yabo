FROM node:24-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies with frozen lockfile for consistency
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN npx tsc -p tsconfig.build.json

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nestjs -u 1001

USER nestjs
WORKDIR /app

EXPOSE 8888

CMD ["node", "dist/main"]
