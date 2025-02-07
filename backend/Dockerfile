FROM node:20-alpine

WORKDIR /bagbuddy/backend
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm

RUN pnpm i

COPY . .
COPY ./src/config/firebase-service-account-key.json ./dist/config/

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
