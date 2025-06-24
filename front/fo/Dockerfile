FROM node:18

ENV APP_HOME=/app
ENV APP_NAME=fo-node

RUN npm install -g cross-env
RUN npm install -g nuxt@3.10.0

WORKDIR $APP_HOME

COPY build/$APP_NAME.tar.gz $APP_NAME.tar.gz

RUN mkdir -p $APP_NAME 
RUN tar -xzvf $APP_NAME.tar.gz --strip-components=3 -C $APP_NAME
RUN rm $APP_NAME.tar.gz

WORKDIR $APP_NAME/server

EXPOSE 9912
ENTRYPOINT ["cross-env", "PORT=9912", "node", "index.mjs"]