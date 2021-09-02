ARG NGINX_VERSION=1.20

FROM nginx:${NGINX_VERSION}-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
