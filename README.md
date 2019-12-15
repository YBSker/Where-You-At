# Where you at

**A web-based social media application for you to locate available friends around you and make events**

[Live Version](http://whereyouat-123.herokuapp.com/)

[Code Base](https://github.com/jhu-oose/2019-group-GrOOSEp)


[![Build Status](https://travis-ci.com/jhu-oose/2019-group-GrOOSEp.svg?token=zUm1RX3uzwqcFrgQKj9h&branch=master)](https://travis-ci.com/jhu-oose/2019-group-GrOOSEp)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://github.com/jhu-oose/2019-group-GrOOSEp)

## Getting Started 

To work on this project, first install **IntelliJ IDEA**. Then, clone all the files, import Gradle changes, make sure the SDK environment is Java 12, and run Server.java. The project will then be launched in development mode on **localhost:7000**. 

## Architecture

**Where you at** is a web application with two components: the Server and the Client. The server is written in Java using **Javalin** and the client written in Javascript using **ReactJS**.

## API Documentation

This project utilizes **Google API** and **Facebook API** for essential geographical information and user log in functionality. Our application calls Google API to retrieve geocode information, which includes latitude and longitude, and information such as address and city name. Facebook API helps facilitate user log in process and linking of the user to his/her friends on that are already connected on the social network. 

[Map API](https://developers.google.com/maps/documentation/javascript/tutorial)

[Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro)

[Facebook API](https://developers.facebook.com/)

We also used **React Bootstrap** for components such as Button and Form for the client.

[React Bootstrap](https://react-bootstrap.github.io)
## Auxiliary Files

[`.gitignore`](/.gitignore): Configuration for [Git](https://www.jhu-oose.com/toolbox/#version-control-systemvcs-git), specifying which files must **not** be versioned (tracked), because they belong not the project, but the developer’s machine, for example, the `.DS_Store` files generated by Finder in macOS.

[`.travis.yml`](/.travis.yml): Configuration for [Travis CI](https://www.jhu-oose.com/toolbox/#continuous-integrationci-server-travisci), specifying how to run the tests for TODOOSE.

[`app.json`](/app.json): Configuration for the **Deploy to Heroku** button above.

[`build.gradle`](/build.gradle): Configuration for [Gradle](https://www.jhu-oose.com/toolbox/#build-system-gradle), which lists the libraries in which TODOOSE depends, specifies that `Server` (see above) is the class that must run when the Server starts, specifies how to run unit tests (see above), and so forth.

[`CODE_OF_CONDUCT.md`](/CODE_OF_CONDUCT.md): The [Code of Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct) for TODOOSE contributors.

[`gradlew`](/gradlew) and [`gradlew.bat`](/gradlew.bat): Wrappers for Gradle for macOS/Linux and Windows, respectively. These wrappers install and run Gradle, simplifying the setup process.

[`LICENSE`](/LICENSE): The [License](https://choosealicense.com/licenses/mit/) for TODOOSE.

[`Procfile`](/Procfile): Configuration for [Heroku](https://www.jhu-oose.com/toolbox/#platform-heroku), specifying how to start the application.

[`README.md`](/README.md): This documentation.

[`settings.gradle`](/settings.gradle): Gradle configuration generated by [IntelliJ](https://www.jhu-oose.com/toolbox/#integrated-development-environmentide-intellijidea).

[`system.properties`](/system.properties): Configuration for Heroku, specifying which version of Java to run.
