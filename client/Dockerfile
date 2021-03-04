FROM node:15.3.0-alpine3.10

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .
