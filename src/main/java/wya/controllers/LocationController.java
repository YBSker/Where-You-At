package wya.controllers;//package wya.controllers;
//
//import io.javalin.plugin.openapi.annotations.NULL_CLASS;
//import wya.models.Location;
//import wya.repositories.LocationNotFoundException;
//import wya.repositories.LocationRepository;
//import io.javalin.http.Context;
//
//import java.sql.SQLException;
//
//public class LocationController {
//
//    private LocationRepository LocationRepository;
//
//    public LocationController(LocationRepository LocationRepository) {
//        this.LocationRepository = LocationRepository;
//    }
//
//    public void getAll(Context ctx) throws SQLException {
//        ctx.json(LocationRepository.getAll());
//    }
//
//    public void create(Context ctx) throws SQLException {
//        Location location = new Location();
//        createToDB(ctx, location);
//        LocationRepository.create(location);
//        ctx.status(201);
//    }
//
//    public void updateDetails(Context ctx) throws SQLException, LocationNotFoundException {
//        var location = LocationRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
//        createToDB(ctx, location);
//        LocationRepository.updateDetails(location);
//        ctx.status(204);
//    }
//
//    private void createToDB(Context ctx, Location location) {
//        //FIGURE OUT HOW TO SET THE DYNAMIC ID
//        //TODO: ASK ABOUT THIS IDENTIFIER THING HOW ITS BEING HANDLED
////        location.setIdentifier(ctx.formParam("identifier"));
//        location.setLongitude(ctx.formParam("longitude", float.class, "").get());
//        location.setLatitude(ctx.formParam("latitude", float.class, "").get());
//    }
//
//
//}
