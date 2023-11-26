FROM node:18.18.2-alpine@sha256:3428c2de886bf4378657da6fe86e105573a609c94df1f7d6a70e57d2b51de21f as base
WORKDIR /app

FROM base as dependencies

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install

FROM base as final

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 80

CMD ["index.js"]
