FROM nginx

ENV APP_HOME=/app
ENV APP_NAME=bo-node

WORKDIR $APP_HOME

COPY build/$APP_NAME.tar.gz $APP_NAME.tar.gz
COPY bo/nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p $APP_NAME
RUN tar -xzvf $APP_NAME.tar.gz --strip-components=4 -C $APP_NAME
RUN rm $APP_NAME.tar.gz

EXPOSE 9911
ENTRYPOINT ["nginx", "-g", "daemon off;"]