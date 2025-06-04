FROM openjdk:8-jdk-slim

ENV APP_HOME=/app
ENV APP_NAME=bo-java

WORKDIR $APP_HOME

COPY $APP_NAME.jar $APP_NAME.jar

EXPOSE 9901
ENTRYPOINT sh -c "java -jar $APP_NAME.jar"