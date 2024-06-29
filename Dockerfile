# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install global dependencies first
RUN npm install -g truffle ganache

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile the contracts
RUN truffle compile

# Expose the Ganache CLI port
EXPOSE 7545

# Start Ganache CLI
CMD ["ganache", "--host", "0.0.0.0", "--port", "7545"]
