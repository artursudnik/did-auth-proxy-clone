FROM node:18.19.0-alpine@sha256:4bdb3f3105718f0742bc8d64bb4e36e8f955ebbee295325e40ae80bc8ef78833 as base
WORKDIR /app

FROM base as dependencies

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install

FROM base as final

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 80

CMD ["index.js"]
