package wya.controllers;

import io.javalin.http.Context;
import wya.models.Availability;
import wya.models.Person;
import wya.repositories.PersonNotFoundException;
import wya.repositories.PersonRepository;

import java.sql.SQLException;

public class PersonController {

    private PersonRepository personRepository;

    /**
     * Person Controller constructor.
     *
     * @param PersonRepository Person Repository to control.
     */
    PersonController(PersonRepository PersonRepository) {
        this.personRepository = PersonRepository;
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
        var person = personRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
        createToDB(ctx, person);
        personRepository.updateDetails(person);
        ctx.status(204);
    }

    private void createToDB(Context ctx, Person person) {
        person.setFullName(ctx.formParam("fullName", ""));
        person.setLastSeen(ctx.formParam("lastSeen", ""));
        person.setLive(ctx.formParam("live", Boolean.class).get());
        person.setStatus(ctx.formParam("status", ""));
        person.setLongitude(ctx.formParam("longitude", float.class, "").get());
        person.setLatitude(ctx.formParam("latitude", float.class, "").get());
        person.setAvailability(ctx.formParam("availability", int.class).get()); //TODO what's the default?
        person.setPrivacy(ctx.formParam("privacy", int.class).get());
    }
}
