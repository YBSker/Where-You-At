package wya.controllers;

import io.javalin.http.Context;
import wya.repositories.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AppController {
    Connection connection = DriverManager.getConnection("jdbc:sqlite:wya.db");

    public AppController() throws SQLException {
    }

    private EventRepository eventRepository = new EventRepository(connection);
    private FriendRepository friendRepository = new FriendRepository(connection);
    private PersonRepository personRepository = new PersonRepository(connection);
    private AccountRepository accountRepository = new AccountRepository(connection);
    private PlacesRepository placesRepository = new PlacesRepository(connection);

    private EventController eventController = new EventController(eventRepository);
    private PersonController personController = new PersonController(personRepository, friendRepository);
    private AccountController accountController = new AccountController(accountRepository);
    private PlacesController placesController = new PlacesController(placesRepository);

    public void register(Context ctx) throws SQLException {
        //TODO Would create a new profile everytime we try to register even tho error
        int person_id = personController.create(ctx);
        try {
            accountController.register(ctx, person_id);
        } catch (SQLException e) {
            // ctx.status set to 409 if duplicate username
            ctx.status(409);
            return;
        }
        placesController.create(ctx, person_id);
    }

    public void updateAccount(Context ctx) throws SQLException, AccountNotFoundException {
        accountController.updateDetails(ctx);
        ctx.status(204);
    }

    public void changePassword(Context ctx) throws SQLException, AccountNotFoundException {
        accountController.changePass(ctx);
        ctx.status(200);
    }

    public void updateProfile(Context ctx) throws SQLException, PersonNotFoundException {
        personController.updateDetails(ctx);
        ctx.status(204);
    }

    public void login(Context ctx) throws AccountNotFoundException, SQLException {
        accountController.login(ctx);
        ctx.status(200);
    }

    public void viewEvents(Context ctx) throws SQLException {
        eventController.getAll(ctx);
        ctx.status(200);
    }

    public void createEvent(Context ctx) throws SQLException {
        eventController.create(ctx);
        ctx.status(201);
    }

    public void editEvent(Context ctx) throws SQLException, EventNotFoundException {
        eventController.updateDetails(ctx);
        ctx.status(204);
    }

    public void viewFriends(Context ctx) throws SQLException, PersonNotFoundException {
        personController.getAllFriends(ctx);
        ctx.status(200);
    }

    public void editFriends(Context ctx) {
        //TODO
    }

    public void updatePlaces(Context ctx) throws SQLException, PlacesNotFoundException {
        placesController.updateDetails(ctx);
        ctx.status(204);
    }

    public void getPlaces(Context ctx) throws SQLException {
        placesController.getAll(ctx);
        ctx.status(200);
    }

    public void getAccount(Context ctx) throws SQLException {
        accountController.getAll(ctx);
        ctx.status(200);
    }

    public void getProfile(Context ctx) throws SQLException, PersonNotFoundException {
        personController.getOne(ctx);
        ctx.status(200);
    }
}
