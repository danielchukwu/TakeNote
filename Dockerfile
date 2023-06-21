# FROM node:16-alpine AS build

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# COPY . .

# EXPOSE 4200

# CMD ["npm", "start"]

# Using ngix because it is offers faster build time and it reduces the size of the app, offers improved scalability
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

RUN npm run build
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /dist/src/app/dist/takenote-angular /usr/share/nginx/html
EXPOSE 80