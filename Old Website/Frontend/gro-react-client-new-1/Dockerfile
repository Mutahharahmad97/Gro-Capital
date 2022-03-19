FROM node:8.8.1

EXPOSE 3000

RUN mkdir -p /usr/src/app/gro-client
ENV APP /usr/src/app/gro-client

COPY package.json yarn.lock $APP/
COPY src/config/env.js $APP/src/config/env.js

ADD tools $APP/tools

WORKDIR $APP

RUN yarn

COPY . .

CMD ["yarn", "start"]
