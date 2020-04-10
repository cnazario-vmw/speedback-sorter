# Build react application
FROM node:13.12.0-alpine AS build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

# Copy build to app directory and start the webserver
FROM node:13.12.0-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build-stage /app/build .

CMD ["serve", "-p", "80", "."]
