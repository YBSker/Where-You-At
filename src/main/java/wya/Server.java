package wya;

import io.javalin.Javalin;
import wya.controllers.AppController;
import wya.repositories.AccountNotFoundException;
import wya.repositories.EventNotFoundException;
import wya.repositories.PersonNotFoundException;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static io.javalin.apibuilder.ApiBuilder.*;

public class Server {
    public static void main(String[] args) throws SQLException {
        AppController appController = new AppController();
        Connection connection = DriverManager.getConnection("jdbc:sqlite:wya.db");
        Javalin.create(config -> { config.addStaticFiles("/public"); })

        .events(event -> {
            event.serverStopped(() -> {
                connection.close();
            });
        })
        .routes(() -> {
            path("register", () -> {
                post(appController::register);
            });
        })
        .routes(() -> {
            path("changePassword", () -> {
                put(appController::changePassword);
            });
        })
        .routes(() -> {
            path("login", () -> {
                post(appController::login);
            });
        }).exception(AccountNotFoundException.class, (e, ctx) -> {
            ctx.status(404);
        })
        .routes(() -> {
            path("updateAccount", () -> {
                put(appController::updateAccount);
                get(appController::getAccount);
            });
        }).exception(AccountNotFoundException.class, (e, ctx) -> {
            ctx.status(404);
        })
        .routes(() -> {
            get(appController::getProfile);
            path("updateProfile", () -> {
                put(appController::updateProfile);
            });
        }).exception(PersonNotFoundException.class, (e, ctx) -> {
            ctx.status(404);
        })
        .routes(() -> {
            path("event", () -> {
                get(appController::viewEvents);
                path(":identifier", () -> {
                    put(appController::editEvent);
                });
                path("create", () -> {
                    post(appController::createEvent);
                });
            });
        }).exception(EventNotFoundException.class, (e, ctx) -> {
            ctx.status(404);
        })
        .routes(() -> {
            path("friends", () -> {
                get(appController::viewFriends);
                path("editFriends", () -> {
                    put(appController::editFriends);
                });
            });
        })
        .start(System.getenv("PORT") == null ? 7000 : Integer.parseInt(System.getenv("PORT")));
    }
}