FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Use an official Node runtime as a base image
#FROM node:14-slim

# Set the working directory in the container to /app
#WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
#COPY package*.json ./

# # Install dependencies
#RUN npm install

# Copy the current directory contents into the container at /app
#COPY . .

# Build the app
# RUN npm run build

# Install global serve tool to serve your React app
# RUN npm install -g serve

# Make port 3000 available outside of the image
#EXPOSE 3000

# Run the app when the container launches
# CMD ["serve", "-s", "build", "-l", "3000"]
#CMD ["npm", "start"]