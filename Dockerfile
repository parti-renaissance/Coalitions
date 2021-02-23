ARG NODE_VERSION=14
ARG NGINX_VERSION=1.19

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV REACT_APP_ENV production

# useful for node-gyp
RUN apk add python make gcc g++

COPY frontend/ ./

# useful to get react-app-rewired and types for typescript
RUN yarn install --production=false
RUN yarn build


FROM nginx:${NGINX_VERSION}-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx_conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
