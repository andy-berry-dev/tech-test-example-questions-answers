FROM node:20.12 as build

WORKDIR /home/node

COPY package.json package-lock.json ./
RUN npm ci --no-audit --maxsockets 1 --production

COPY . .

ENV PORT=80
EXPOSE 80
CMD ./node_modules/.bin/ts-node --transpile-only ./src/server.ts
