package wya.controllers;

import io.javalin.http.Context;
import io.javalin.http.ForbiddenResponse;
import wya.models.Availability;
import wya.models.Person;
import wya.repositories.FriendRepository;
import wya.repositories.PersonNotFoundException;
import wya.repositories.PersonRepository;

import java.sql.SQLException;

public class PersonController {

    private PersonRepository personRepository;
    private FriendRepository friendRepository;

    /**
     * Person Controller constructor.
     *
     * @param PersonRepository Person Repository to control.
     */
    PersonController(PersonRepository PersonRepository, FriendRepository friendRepository) {
        this.personRepository = PersonRepository;
        this.friendRepository = friendRepository;
    }

    /**
     * Get all person profiles in person table.
     *
     * @param ctx
     * @throws SQLException
     */
    public void getAll(Context ctx) throws SQLException {
        ctx.json(personRepository.getAll());
    }

    public void getAllFriends(Context ctx) throws SQLException {
//        ctx.json(friendRepository.getAll());
    }

//    public void getOne(Context ctx) throws SQLException, PersonNotFoundException {
//        var person_id = ctx.sessionAttribute("person_id");
//        ctx.json(personRepository.getOne((int) person_id));
//    }

    /**
     * Create a new person entry in person table.
     *
     * @param ctx The Javalin Context object to get form fields
     * @return The person identifier from the newly created person entry.
     * @throws SQLException Statement failed to execute.
     */
    int create(Context ctx) throws SQLException {
        Person person = new Person();
        createToDB(ctx, person);
        int person_id = personRepository.create(person);
        ctx.status(201);
        return person_id;
    }

    void updateDetails(Context ctx) throws SQLException, PersonNotFoundException {
        var person = currentPerson(ctx);
        createToDB(ctx, person);
        personRepository.updateDetails(person);
        ctx.status(204);
    }

    void updateLocation(Context ctx) throws SQLException, PersonNotFoundException {

        float longitude = ctx.formParam("longitude", float.class).get();
        float latitude = ctx.formParam("latitude", float.class).get();
        personRepository.updateLocation(longitude, latitude);
        ctx.status(204);
    }

    void updateTime(Context ctx) throws SQLException, PersonNotFoundException {
        String time = ctx.formParam("time");
        personRepository.updateTime(time);
        ctx.status(204);
    }

    /**
     * Get the current person of the session.
     *
     * @param ctx Javalin Context object
     * @return The Person of the current user.
     */
    private Person currentPerson(Context ctx) throws SQLException, PersonNotFoundException {
        var personID = ctx.sessionAttribute("person_id");
        var person = personRepository.getOne((int) personID);
        if (person == null) throw new ForbiddenResponse();
        return person;
    }

    private void createToDB(Context ctx, Person person) {
        person.setFullName(ctx.formParam("fullName", ""));
        person.setLastSeen(ctx.formParam("lastSeen", ""));
        person.setLive(ctx.formParam("live", Boolean.class).get());
        person.setStatus(ctx.formParam("status", ""));
        person.setLongitude(ctx.formParam("longitude", float.class, "").get());
        person.setLatitude(ctx.formParam("latitude", float.class, "").get());
        person.setAvailability(new Availability()); //TODO what's the default?
    }
}
