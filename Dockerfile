# FROM node:16-alpine AS build

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# COPY . .

# EXPOSE 4200

# CMD ["npm", "start"]

# Using ngix because it is offers faster build time and it reduces the size of the app, offers improved scalability
# FROM node:16-alpine AS build

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# RUN npm run build
# # Serve Application using Nginx Server
# FROM nginx:alpine
# COPY --from=build /dist/src/app/dist/takenote-angular /usr/share/nginx/html
# EXPOSE 80

FROM node:18-alpine3.17 AS builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build --prod

# Server stage
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist/takenote-ft/ /usr/share/nginx/html

EXPOSE 80

# TERMINAL
# docker build -t danielchukwu/takenote-ft .

# docker run -p 3000:80 danielchukwu/takenote-ft