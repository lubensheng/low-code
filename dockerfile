FROM nginx as run-stage

WORKDIR /home/low-code

COPY ./dist .

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]