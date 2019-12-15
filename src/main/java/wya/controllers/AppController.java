package wya.controllers;

import io.javalin.http.Context;
import io.javalin.http.ForbiddenResponse;
import wya.repositories.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AppController {
    Connection connection = DriverManager.getConnection("jdbc:sqlite:wya.db");

    public AppController() throws SQLException {
    }

    private EventRepository eventRepository = new EventRepository(connection);
    //    private FriendRepository friendRepository = new FriendRepository(connection);
    private PersonRepository personRepository = new PersonRepository(connection);
    private AccountRepository accountRepository = new AccountRepository(connection);
    private PlacesRepository placesRepository = new PlacesRepository(connection);
    private EventRelationsRepository eventRelationsRepository = new EventRelationsRepository(connection);

    private EventController eventController = new EventController(eventRepository);
    private PersonController personController = new PersonController(personRepository);
    private AccountController accountController = new AccountController(accountRepository);
    private PlacesController placesController = new PlacesController(placesRepository);
    private EventRelationsController eventRelationsController = new EventRelationsController(eventRelationsRepository);

    /**
     * Creates an entry in the user and person tables. This uses Context.formParams to fill in the attributes for each entry.
     * Example:
     *      fullName:admin
     *      lastSeen:2019-12-14T02:09:12+00:00↵
     *      status:admin stuff
     *      longitude:39.3289957
     *      latitude:-76.6205235
     *      username:admin
     *      password:securepassword
     *      email:admin@test.com
     *      profilePicture:drive.com/profilepicture
     *      privacy:neighborhood
     *
     * @param ctx Javalin Context object.
     * @throws SQLException Unable to execute the account creation.
     */
    public void register(Context ctx) throws SQLException {
        if (ctx.formParam("username").length() < 1) {
            System.out.println("No username entered");
            throw new ForbiddenResponse();
        }
        if (ctx.formParam("password").length() < 1) {
            System.out.println("No password entered");
        }
        if (accountController.duplicateUsername(ctx)) {
            // ctx.status set to 409 if duplicate username
            System.out.println("\"" + ctx.formParam("username") + "\": Username already taken.");
            ctx.status(409);
            return;
        }
        int person_id = personController.create(ctx);
        try {
            accountController.register(ctx, person_id);
        } catch (SQLException e) {
            // ctx.status set to 409 if duplicate username
            // repeated just in case
            ctx.status(409);
            return;
        }
        placesController.create(ctx, person_id);
    }

    /**
     * Update the account profile picture and email. This uses Context.formParams.
     * Example.
     * email:newemailadmin@test.com
     * profilePicture:drive.com/profilepicture
     * Context.status = 204 when successfully changed.
     *
     * @param ctx the Javalin Context object.
     * @throws SQLException             Unable to execute the changes in the user table.
     * @throws AccountNotFoundException The current user account entry cannot be found in user.
     */
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


    public void login(Context ctx) {
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

    public void viewFriends(Context ctx) throws SQLException {
//        personController.getAllFriends(ctx);  // If we ever implement adding and removing friends
        personController.getAll(ctx);           // For now everyone is your friend
        ctx.status(200);
    }

   public void editFriends(Context ctx) {    // If we ever implement adding and removing friends
//        //TODO
    }

    public void updatePlaces(Context ctx) throws SQLException, PlacesNotFoundException {
        placesController.updateDetails(ctx);
        ctx.status(204);
    }

    public void getPlaces(Context ctx) throws SQLException {
        placesController.getAll(ctx);
        ctx.status(200);
    }

    public void getAccount(Context ctx) throws SQLException, AccountNotFoundException {
        accountController.getCurrentUser(ctx);
        ctx.status(200);
    }

    public void getProfile(Context ctx) throws SQLException, PersonNotFoundException {
        personController.getOne(ctx);
        ctx.status(200);
    }

    public void getPersonIDForEvent(Context ctx) throws SQLException, EventRelationsNotFoundException {
        eventRelationsController.getPersonIDForEvent(ctx);
        ctx.status(200);
    }

    public void getEventIDsForPerson(Context ctx) throws SQLException, EventRelationsNotFoundException {
        eventRelationsController.getEventIDsForPerson(ctx);
        ctx.status(200);
    }

    public void removeRelation(Context ctx) throws SQLException {
        eventRelationsController.removeRelation(ctx);
        ctx.status(204);
    }

    public void createRelation(Context ctx) throws SQLException {
        eventRelationsController.create(ctx);
        ctx.status(201);
    }

    //TODO: Route through event...WHEN DELETE EVENT IS IMPLEMENTED
    public void deleteEvent(Context ctx) throws SQLException {
        eventRelationsController.deleteEvent(ctx);
    }

    //TODO: Route through person WHEN DELETE ACCOUNT IS IMPLEMENTED
    public void deletePerson(Context ctx) throws SQLException {
        eventRelationsController.deletePerson(ctx);
    }

    public void updateTime(Context ctx) throws SQLException, PersonNotFoundException {
        personController.updateTime(ctx);
        ctx.status(204);
    }

    public void updateLocation(Context ctx) throws SQLException, PersonNotFoundException {
        personController.updateLocation(ctx);
        ctx.status(204);
    }

    public void updateAvailability(Context ctx) throws SQLException, PersonNotFoundException {
        personController.updateAvailability(ctx);
        ctx.status(204);
    }
}
