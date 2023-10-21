FROM node:18.18.2-alpine@sha256:435dcad253bb5b7f347ebc69c8cc52de7c912eb7241098b920f2fc2d7843183d as base
WORKDIR /app

FROM base as dependencies

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install

FROM base as final

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 80

CMD ["index.js"]
