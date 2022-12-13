FROM node:18.12.1
LABEL author="Jihyun, Jeong"

WORKDIR /var/www/server
COPY . .
RUN chmod +x ./entrypoint.sh

EXPOSE 8080

ENTRYPOINT ./entrypoint.sh