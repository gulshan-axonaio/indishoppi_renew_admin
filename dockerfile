# Use the official Node.js image as a parent image
FROM node:18 AS build

# Set the working directory
WORKDIR /dashboard

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the CRA app
RUN npm run build

# Use a lightweight server to serve the build
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /dashboard/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
