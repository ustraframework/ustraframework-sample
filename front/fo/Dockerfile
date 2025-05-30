FROM node:16

ENV APP_HOME=/app
ENV APP_NAME=fo-node

RUN npm install -g cross-env
RUN npm install -g nuxt@2.17.3

WORKDIR $APP_HOME

COPY $APP_NAME.tar.gz $APP_NAME.tar.gz

RUN mkdir -p $APP_NAME 
RUN tar -xzvf $APP_NAME.tar.gz -C $APP_NAME
RUN rm $APP_NAME.tar.gz

WORKDIR $APP_NAME/front/fo

EXPOSE 9912
ENTRYPOINT ["yarn", "start"]