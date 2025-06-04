FROM openjdk:8-jdk-slim

ENV APP_HOME=/app
ENV APP_NAME=fo-java

WORKDIR $APP_HOME

COPY $APP_NAME.jar $APP_NAME.jar

EXPOSE 9902
ENTRYPOINT sh -c "java -Dspring.profiles.active=dev -jar $APP_NAME.jar"