FROM openjdk:17.0.1-jdk-slim

ENV APP_HOME=/app
ENV APP_NAME=fo-java

WORKDIR $APP_HOME

COPY $APP_NAME.jar $APP_NAME.jar

EXPOSE 9902
ENTRYPOINT sh -c "java -jar $APP_NAME.jar"