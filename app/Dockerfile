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

# Create app directory
WORKDIR /usr/src/app

USER root
RUN mkdir /usr/src/app/node_modules && chown -R node:node /usr/src/app/node_modules

USER node

COPY --chown=node:node package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

# prismaの設定をアプリ側で実装してからコメントアウトを外す
# RUN npx prisma generate

RUN npm run build

USER node

EXPOSE 3000

FROM base AS local
ENV NODE_ENV development
CMD ["npm", "run", "start:dev"]

FROM base AS stg
ENV NODE_ENV development
CMD ["npm", "run", "start:stg"]

FROM base AS prod
ENV NODE_ENV production
CMD ["npm", "run", "start:prod"]
