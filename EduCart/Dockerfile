# Stage 1: Build the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ../EduCart/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app's source code
COPY ../EduCart ./

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the built React app from the previous stage to Nginx's default HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80 8000

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]