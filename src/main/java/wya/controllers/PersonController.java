package wya.controllers;

import io.javalin.http.Context;
import io.javalin.http.ForbiddenResponse;
import wya.models.Person;
import wya.repositories.PersonNotFoundException;
import wya.repositories.PersonRepository;

import java.sql.SQLException;

public class PersonController {

    private final PersonRepository personRepository;

//    private FriendRepository friendRepository;
//
//    PersonController(PersonRepository PersonRepository, FriendRepository friendRepository) {
//        this.personRepository = PersonRepository;
//        this.friendRepository = friendRepository;
//    }
    PersonController(PersonRepository PersonRepository) {
        this.personRepository = PersonRepository;
    }

    void getAll(Context ctx) throws SQLException {
        ctx.json(personRepository.getAll());
    }

// For use if we implement adding and removing friends
//    void getAllFriends(Context ctx) throws SQLException, PersonNotFoundException {
//        var currperson = currentPerson(ctx);
//        ctx.json(friendRepository.getAll(currperson.getIdentifier()));
//    }

    public void getOne(Context ctx) throws SQLException, PersonNotFoundException {
        var currperson = currentPerson(ctx);
        ctx.json(personRepository.getOne(currperson.getIdentifier()));
    }

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
        person.setLive(ctx.formParam("live", Boolean.class).get());
        person.setAvailability(ctx.formParam("availability", Integer.class).get());
        personRepository.updateDetails(person);
        ctx.status(204);
    }

    void updateLocation(Context ctx) throws SQLException, PersonNotFoundException {
        float longitude = ctx.formParam("longitude", float.class).get();
        float latitude = ctx.formParam("latitude", float.class).get();
        personRepository.updateLocation(longitude, latitude, currentPerson(ctx).getIdentifier());
        ctx.status(204);
    }

    void updateTime(Context ctx) throws SQLException, PersonNotFoundException {
        String time = ctx.formParam("time");
        personRepository.updateTime(time, currentPerson(ctx).getIdentifier());
    }

    void updateAvailability(Context ctx) throws SQLException, PersonNotFoundException {
        int avail = ctx.formParam("availability", Integer.class).get();
        personRepository.updateAvailability(avail, currentPerson(ctx).getIdentifier());
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
        person.setStatus(ctx.formParam("status", ""));
        person.setLongitude(ctx.formParam("longitude", float.class, "").get());
        person.setLatitude(ctx.formParam("latitude", float.class, "").get());
        person.setPrivacy(ctx.formParam("privacy"));
    }
}
