FROM node:18.19.0-alpine@sha256:b1a0356f7d6b86c958a06949d3db3f7fb27f95f627aa6157cb98bc65c801efa2 as base
WORKDIR /app

FROM base as dependencies

COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install

FROM base as final

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 80

CMD ["index.js"]
