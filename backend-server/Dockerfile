FROM node:18.18.0-alpine@sha256:a315556d82ef54561e54fca7d8ee333382de183d4e56841dcefcd05b55310f46 as base
WORKDIR /app

FROM base as dependencies

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install

FROM base as final

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 80

CMD ["index.js"]
