#1. base-image
    # os -> need to install JDK or JRE
    # middleware -> tomcat (or jboss)
    # framework(or platform) -> JDK or JRE (run)
#2. describe the contents required for installation
#3. execute run script (or command)

FROM openjdk:11.0.12-jre

RUN mkdir /myapp
WORKDIR /myapp

COPY ./target/service-discovery-1.0.jar ./service-discovery-1.0.jar
EXPOSE 8761

ENTRYPOINT ["java", "-jar", "./service-discovery-1.0.jar"]

