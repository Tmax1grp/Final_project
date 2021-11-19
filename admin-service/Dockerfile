FROM openjdk:17-ea-11-jdk-slim

VOLUME /tmp

COPY target/admin-service-1.0.jar admin-service.jar

ENTRYPOINT ["java", "-jar", "admin-service.jar"]