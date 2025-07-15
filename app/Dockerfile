# Base image
FROM node:21-bookworm-slim AS base

ARG LOCAL_UID=1000
ARG LOCAL_GID=1000

RUN apt-get update && \
    apt-get install -y locales curl procps

RUN locale-gen ja_JP.UTF-8

RUN localedef -f UTF-8 -i ja_JP ja_JP

ENV LANG=ja_JP.UTF-8

ENV TZ=Asia/Tokyo

RUN usermod -u ${LOCAL_UID} node && groupmod -g ${LOCAL_GID} node

USER node

WORKDIR /usr/src/app

USER root
RUN mkdir /usr/src/app/node_modules && chown -R node:node /usr/src/app/node_modules

USER node

COPY --chown=node:node package*.json ./

# 「--legacy-peer-deps」を使用して、依存関係の競合を回避
# graphql-subscriptions@1.2.1とgraphql@16.11.0の互換性の問題を解決
RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

# prismaの設定をアプリ側で実装してからコメントアウトを外す
# RUN npx prisma generate

RUN npm run build

USER node

EXPOSE 3000

# マルチステージビルド
# 今の所は不要だがデプロイ時にもしかしたら使うかも
FROM base AS local
ENV NODE_ENV development
CMD ["npm", "run", "start:dev"]

FROM base AS stg
ENV NODE_ENV development
CMD ["npm", "run", "start:stg"]

FROM base AS prod
ENV NODE_ENV production
CMD ["npm", "run", "start:prod"]
