package wya.controllers;

import io.javalin.http.Context;
import wya.models.EventRelations;
import wya.repositories.EventRelationsNotFoundException;
import wya.repositories.EventRelationsRepository;

import java.sql.SQLException;
import java.util.List;

public class EventRelationsController {
    private EventRelationsRepository eventRelationsRepository;

    public EventRelationsController(EventRelationsRepository eventRelationsRepository) {
        this.eventRelationsRepository = eventRelationsRepository;
    }

    /**
     * @param id ID of the event
     * @return list of person IDs attached to event
     * @throws SQLException
     * @throws EventRelationsNotFoundException
     */
    public void getPersonIDForEvent(Context ctx) throws SQLException, EventRelationsNotFoundException {
        ctx.json(eventRelationsRepository.getPersonIDsForEvent(ctx.pathParam("identifier", Integer.class).get()));
//        return eventRelationsRepository.getPersonIDsForEvent(id);
    }

    /**
     * @param id ID of the person
     * @return list of event IDs attached to person
     * @throws SQLException
     * @throws EventRelationsNotFoundException
     */
    public void getEventIDsForPerson(Context ctx) throws SQLException, EventRelationsNotFoundException {
        ctx.json(eventRelationsRepository.getEventIDsForPerson(ctx.pathParam("identifier", Integer.class).get()));
//        return eventRelationsRepository.getEventIDsForPerson(id);
    }

    /**
     * USE THIS WHENEVER A PERSON IS NOT GOING TO AN EVENT AFTER HAVING SAID THEY WERE GOING.
     * @param eventID id of event not going to.
     * @param personID id of user.
     * @throws SQLException
     */
    public void removeRelation(Context ctx) throws SQLException {
        var eventRelation = new EventRelations();
        //route through person id then find way to get event id?
        createToDB(ctx.pathParam("identifier", Integer.class).get(), ctx.pathParam("eventIdentifier", Integer.class).get(), eventRelation);
        eventRelationsRepository.removeAPerson(eventRelation);
    }

    /**
     * Probably in the frontend you could (very easily) fetch ID of the user and the event you want to go to.
     * @param ctx
     * @throws SQLException
     */
    public void create(Context ctx) throws SQLException {
        var eventRelation = new EventRelations();
        createToDB(ctx.pathParam("identifier", Integer.class).get(), ctx.pathParam("eventIdentifier", Integer.class).get(), eventRelation);
        eventRelationsRepository.create(eventRelation);
    }

    /**
     * Use this EVERYTIME YOU DELETE AN EVENT!!!
     * @param eventID id of event being deleted
     * @throws SQLException
     */
    //TODO: ADD THIS TO THE DELETE EVENT ROUTE!
    public void deleteEvent(Context ctx) throws SQLException {
        eventRelationsRepository.removeEvent(ctx.pathParam("identifier", Integer.class).get());
     }

    /**
     * Use this EVERYTIME YOU DELETE A PERSON!!!
     * @param personID id of event being deleted
     * @throws SQLException
     */
    //TODO: ADD THIS TO THE DELETE PERSON ROUTE!
    public void deletePerson(Context ctx) throws SQLException {
        eventRelationsRepository.removePerson(ctx.pathParam("identifier", Integer.class).get());
    }



    private void createToDB(int personID, int eventID, EventRelations eventRelations) {
        eventRelations.setPersonID(personID);
        eventRelations.setEventID(eventID);
    }

}
