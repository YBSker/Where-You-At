package wya.controllers;

import wya.models.Person;
import wya.repositories.PersonNotFoundException;
import wya.repositories.PersonRepository;
import io.javalin.http.Context;

import java.sql.SQLException;

public class PersonController {

    private PersonRepository personRepository;

    public PersonController(PersonRepository PersonRepository) {
        this.personRepository = PersonRepository;
    }

    public void getAll(Context ctx) throws SQLException {
        ctx.json(personRepository.getAll());
    }

    public void create(Context ctx) throws SQLException {
        Person person = new Person();
        createToDB(ctx, person);
        personRepository.create(person);
        ctx.status(201);
    }

    public void updateDetails(Context ctx) throws SQLException, PersonNotFoundException {
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
//        person.setAvailability(new Availability()); //TODO
    }


}
