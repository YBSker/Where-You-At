package wya;

import io.javalin.Javalin;
import wya.controllers.AccountController;
import wya.controllers.EventController;
import wya.controllers.PersonController;
import wya.repositories.AccountRepository;
import wya.repositories.EventRepository;
import wya.repositories.PersonRepository;

import java.sql.DriverManager;
import java.sql.SQLException;

import static io.javalin.apibuilder.ApiBuilder.*;

public class Server {
    public static void main(String[] args) throws SQLException {
        var connection = DriverManager.getConnection("jdbc:sqlite:wya.db");

        Javalin.create(config -> { config.addStaticFiles("/public"); })
                .events(event -> {
                    event.serverStopped(() -> { connection.close(); });
                })
                .routes(() -> {

                })
                .start(System.getenv("PORT") == null ? 7001 : Integer.parseInt(System.getenv("PORT")));
    }
}