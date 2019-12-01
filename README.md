# Very Useful Tools to Remember (VUTTR)

This project aims attend to requirements in order to join [BossaBox](https://bossabox.com/)'s community. It's a full stack project with React based front-end and Spring Boot back-end.

## Features

This is a simple application that manages useful tools with its respective names, links, descriptions and tags. Furthermore, it also implements a Oauth2 Authentication that protects some application features.

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

### Step 2. Deploy Database Stack
From downloaded project directory:

```console
~/vuttr$ docker stack deploy -c stack.yml postgres
```

### Step 3. Build and Run the OAuth2Server
Enter the `../vuttr/oauth2server` directory and run:
```console
~/vuttr/oauth2server$ mvn install
~/vuttr/oauth2server$ java -jar target/oauth2server-{version}.jar &>/dev/null &
```
Where `{version}` is the application version, pointed by `<version>` tag in the pom.xml project file.

### Step 4. Build and Run the Resource Server
Enter the `../vuttr/vuttr_backend` directory and run:
```console
~/vuttr/oauth2server$ mvn install
~/vuttr/oauth2server$ java -jar target/backend-{version}.jar &>/dev/null &
```
Where `{version}` is the application version, pointed by `<version>` tag in the pom.xml project file.

Tip: use `jobs`, `fg`, `bg` and `kill %<job number>` to control background jobs.