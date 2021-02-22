ARG NODE_VERSION=14
ARG NGINX_VERSION=1.19

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

COPY package.json ./

# build steps
# ...

COPY . ./

FROM nginx:${NGINX_VERSION}-alpine
COPY --from=build /usr/src/app/public /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
