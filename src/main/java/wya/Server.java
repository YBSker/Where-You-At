package wya;

import io.javalin.Javalin;
import wya.controllers.AppController;
import wya.repositories.AccountNotFoundException;
import wya.repositories.EventNotFoundException;
import wya.repositories.PersonNotFoundException;
import wya.repositories.PlacesNotFoundException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static io.javalin.apibuilder.ApiBuilder.*;

public class Server {
    public static void main(String[] args) throws SQLException {
        AppController appController = new AppController();
        Connection connection = DriverManager.getConnection("jdbc:sqlite:wya.db");
        Javalin.create(config -> {
            config.addStaticFiles("/public");
        })
                .events(event -> {
                    event.serverStopped(() -> {
                        connection.close();
                    });
                })
                .routes(() -> {
                    path("register", () -> {
                        post(appController::register);
                    });
                    path("changePassword", () -> {
                        put(appController::changePassword);
                    });
                    path("login", () -> {
                        post(appController::login);
                    });
                    path("updateAccount", () -> {
                        put(appController::updateAccount);
                        get(appController::getAccount);
                    });
                    path("places", () -> {
                        get(appController::getPlaces);
                        path(":identifier", () -> {
                            put(appController::updatePlaces);
                        });
                    });
                    path("profile", () ->
                    {
                        get(appController::getProfile);
                    });
                    path("updateProfile", () -> {
                        put(appController::updateProfile);
                        get(appController::getProfile);
                    });
                    path("event", () -> {
                        get(appController::viewEvents);
                        path(":identifier", () -> {
                            put(appController::editEvent);
                        });
                        path("create", () -> {
                            post(appController::createEvent);
                        });
                    });
                    path("friends", () -> {
                        get(appController::viewFriends);
                        path("editFriends", () -> {
                            put(appController::editFriends);
                        });
                    });
                })
                .exception(AccountNotFoundException.class, (e, ctx) -> {
                    ctx.status(404);
                })
                .exception(PlacesNotFoundException.class, (e, ctx) -> {
                    ctx.status(404);
                })
                .exception(AccountNotFoundException.class, (e, ctx) -> {
                    System.out.println("HEre");
                    ctx.status(403);
                })
                .exception(PersonNotFoundException.class, (e, ctx) -> {
                    ctx.status(403);
                })
                .exception(EventNotFoundException.class, (e, ctx) -> {
                    ctx.status(404);
                })
                .start(System.getenv("PORT") == null ? 7000 : Integer.parseInt(System.getenv("PORT")));
    }
}