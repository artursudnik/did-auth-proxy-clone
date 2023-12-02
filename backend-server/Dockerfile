FROM node:18.18.2-alpine@sha256:16b46e5ea9fb5c2d13dda36f0feb670fa89de6a412725007555f2eee9a126b60 as base
WORKDIR /app

FROM base as dependencies

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install

FROM base as final

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 80

CMD ["index.js"]
