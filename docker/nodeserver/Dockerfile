ARG NODE_VERSION=14

FROM node:${NODE_VERSION}-alpine

ARG REACT_APP_ENV

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV REACT_APP_ENV=$REACT_APP_ENV

# useful for node-gyp
RUN apk add python make gcc g++

COPY . ./

# used for SSR
RUN npm install -g ts-node

# useful to get react-app-rewired and types for typescript
RUN yarn install --production=false
RUN yarn build

EXPOSE 8080

CMD ["yarn", "run", "start-server"]
