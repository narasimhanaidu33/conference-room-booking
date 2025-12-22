# Use lightweight Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY src ./src

# Expose service port
EXPOSE 5002

# Start the service
CMD ["node", "src/server.js"]
