FROM node:20.12 as build
# https://github.com/nodejs/docker-node/issues/1668#issuecomment-1912066184
RUN npm update -g npm
WORKDIR /home/node

COPY package.json package-lock.json ./
RUN npm ci --no-audit --maxsockets 1

COPY . .

# TODO: add generated types to the container
# ignore TS errors since we dont have the types for graphql queries
RUN DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true npm run build

FROM nginx:1.25.4-alpine

COPY --from=build /home/node/build /usr/share/nginx/html/
