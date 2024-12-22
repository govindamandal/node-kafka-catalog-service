FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source
COPY . .

# Build the TypeScript application
RUN npm run build

# Specify the directory containing the build artifacts
WORKDIR /usr/src/app/build

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["node", "src/server.js"]