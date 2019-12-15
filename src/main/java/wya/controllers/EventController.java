package wya.controllers;

import io.javalin.http.Context;
import wya.models.Event;
import wya.repositories.EventNotFoundException;
import wya.repositories.EventRepository;

import java.sql.SQLException;

public class EventController {
    private final EventRepository eventsRepository;

    public EventController(EventRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }

    public void getAll(Context ctx) throws SQLException {
        ctx.json(eventsRepository.getAll());
    }

    public void create(Context ctx) throws SQLException {
        var event = new Event();
        createToDB(ctx, event);
        eventsRepository.create(event);
        ctx.status(201);
    }

    public void updateDetails(Context ctx) throws SQLException, EventNotFoundException {
        var event = eventsRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
        createToDB(ctx, event);
        eventsRepository.updateDetails(event);
        ctx.status(204);
    }

    public void updatePeople(Context ctx) {
        //TODO FOR PERSONS ARRAYS
    }

    private void createToDB(Context ctx, Event event) {
        event.setName(ctx.formParam("name", ""));
        event.setDescription(ctx.formParam("description", ""));
        event.setPlace(ctx.formParam("place", ""));
        event.setLongitude(ctx.formParam("longitude", float.class, "").get());
        event.setLatitude(ctx.formParam("latitude", float.class, "").get());
        event.setImage(ctx.formParam("image", ""));
        event.setStartTime(ctx.formParam("startTime", ""));
        event.setEndTime(ctx.formParam("endTime", ""));
    }

}
