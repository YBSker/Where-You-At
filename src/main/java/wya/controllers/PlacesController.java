package wya.controllers;

import io.javalin.http.Context;
import wya.repositories.PlacesNotFoundException;
import wya.repositories.PlacesRepository;
import wya.models.Places;

import java.sql.SQLException;

public class PlacesController {

    private PlacesRepository placesRepository;

    PlacesController(PlacesRepository PlacesRepository) {
        this.placesRepository = PlacesRepository;
    }

    public void getAll(Context ctx) throws SQLException {
        ctx.json(placesRepository.getAll());
    }

    int create(Context ctx, int person_id) throws SQLException {
        Places places = new Places();
        places.setIdentifier(person_id);
        createToDB(ctx, places);
        placesRepository.create(places);
        ctx.status(201);
        return person_id;
    }

    void updateDetails(Context ctx) throws SQLException, PlacesNotFoundException {
        var places = placesRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
        createToDB(ctx, places);
        placesRepository.updatePlaces(places);
        ctx.status(204);
    }

    private void createToDB(Context ctx, Places places) {
        places.setTown(ctx.formParam("town", ""));
        places.setCity(ctx.formParam("city", ""));
        places.setState(ctx.formParam("state", ""));
        places.setCountry(ctx.formParam("country", ""));
    }


}
