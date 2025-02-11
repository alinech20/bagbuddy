# Stage 1: Build
FROM node:lts-alpine AS base

WORKDIR /bagbuddy/frontend
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm

RUN pnpm i

COPY . .

FROM base AS dev
CMD ["pnpm", "run", "dev"]

FROM base as build
RUN pnpm run build

# Stage 2: Serve the application
FROM nginx:stable-alpine

COPY --from=build /bagbuddy/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
