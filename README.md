# Very Useful Tools to Remember (VUTTR)

This is a full stack project for a conceptual test involving the following technologies: 
- React.js front-end;
- Spring Boot back-end;
- Oauth2 (Spring Security).

## Features

This is a simple application that manages useful tools with respective names, links, descriptions and tags. Furthermore, it also implements a Oauth2 Authentication that protects some application features.

- Sign in/Sign out with OAuth2 authorization code;
- Tools' listing and filtering;
- Tools' creating, updating and deleting;
- API documentation with [AsciiDoc](http://asciidoc.org/) and [Spring REST Docs](https://spring.io/projects/spring-restdocs);
- Unity tests with [JUnit 4](https://junit.org/junit4/) and [spring-boot-starter-test](https://docs.spring.io/spring-boot/docs/1.5.7.RELEASE/reference/html/boot-features-testing.html);

## How To Use

Preflight requirement: 
- Any Java Runtime Enviroment version 8 or higher ([Oracle JRE](https://www.oracle.com/technetwork/pt/java/javase/downloads/jre8-downloads-2133155.html), [OpenJDK](https://openjdk.java.net/install/), etc.);
- [Git client](https://git-scm.com/) to donwload the project;
- [Docker](https://docs.docker.com/) to deploy [Adminer](https://www.adminer.org/)/[PostgreSQL](https://www.postgresql.org/) stack;
- [Maven](https://maven.apache.org/download.cgi) to run building scripts;


### Step 1. Check Out the Code

```console
~$ git clone https://github.com/victorborg3s/vuttr.git
```

### Step 2. Build Jars

From `../vuttr/oauth2server` directory:
```console
~/vuttr/oauth2server$ mvn clean install
~/vuttr/oauth2server$ docker build -t vuttr/oauth2 .
```

And from `../vuttr/vuttr_backend` directory:
```console
~/vuttr/vuttr_backend$ mvn clean install
~/vuttr/vuttr_backend$ docker build -t vuttr/resource .
```

### Step 3. Run Stack

From `../vuttr` directory:
```console
~/vuttr$ sudo docker stack deploy -c stack.yml vuttr
```

### Conclusion

After running these commands, you can do requests to application's end-point. Check the [API Documentation](http://htmlpreview.github.io/?https://github.com/victorborg3s/vuttr/blob/master/vuttr_backend/target/generated-docs/index.html) for some clues.

## TODOs

- All the front-end.
