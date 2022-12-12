FROM node:18.12.1

LABEL author="Jihyun, Jeong"

COPY . /var/www
WORKDIR /var/www

ENTRYPOINT ["npm", "run", "start:local"]