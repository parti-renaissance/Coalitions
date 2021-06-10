ARG NODE_VERSION=14
ARG NGINX_VERSION=1.19

FROM node:${NODE_VERSION}-alpine AS build

ARG REACT_APP_ENV

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV REACT_APP_ENV=$REACT_APP_ENV

# useful for node-gyp
RUN apk add python make gcc g++

COPY . ./

# useful to get react-app-rewired and types for typescript
RUN yarn install --production=false
RUN yarn build

#FROM nginx:${NGINX_VERSION}-alpine
#RUN rm /etc/nginx/conf.d/default.conf
#COPY docker/nginx_conf /etc/nginx/conf.d
#COPY --from=build /usr/src/app/build /usr/share/nginx/html

CMD ["yarn", "run", "start-server"]
