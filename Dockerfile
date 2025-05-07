# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built React app into the Nginx HTML directory
COPY ./dist /usr/share/nginx/html

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]