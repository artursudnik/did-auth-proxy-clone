FROM node:18.18.2-alpine@sha256:435dcad253bb5b7f347ebc69c8cc52de7c912eb7241098b920f2fc2d7843183d as base

WORKDIR /app

#### TRANSPILATION STAGE
FROM base as build

RUN apk add python3 make g++

COPY ["./package.json", "yarn.lock", "./"]
RUN yarn

COPY . .
RUN yarn build

#### PRODUCTION DEPENDENCIES INSTALLATION STAGE
FROM base as dependencies-prod

RUN apk add python3 make g++

COPY --from=build /usr/local/share/.cache/yarn/v6 /usr/local/share/.cache/yarn/v6
COPY ["./package.json", "yarn.lock", "./"]
RUN yarn install --production=true

#### FINAL IMAGE CREATION STAGE
FROM base as final

ARG GIT_SHA

ENV NODE_ENV=production
ENV BIND=0.0.0.0
ENV LOG_LEVEL=info

COPY --from=dependencies-prod /app/node_modules ./authorisation-server/node_modules
COPY --from=build /app/dist ./authorisation-server/

RUN echo "{\"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\", \"gitSha\": \"$GIT_SHA\"}" > build.json
COPY package.json .
EXPOSE 3000

CMD ["node", "authorisation-server/main.js"]
