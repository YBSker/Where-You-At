//package wya.controllers;//package wya.controllers;
//
//import io.javalin.http.Context;
//import wya.models.Status;
//import wya.repositories.StatusNotFoundException;
//import wya.repositories.StatusRepository;
//
//import java.sql.SQLException;
//
//public class RadiusController {
//
//    private StatusRepository statusRepository;
//
//    public RadiusController(StatusRepository statusRepository) {
//        this.statusRepository = statusRepository;
//    }
//
//    public void getAll(Context ctx) throws SQLException {
//        ctx.json(statusRepository.getAll());
//    }
//
//    public void create(Context ctx) throws SQLException {
////        Status status = new Status();
////        createToDB(ctx, status);
//        statusRepository.create();
//        ctx.status(201);
//    }
//
//    public void updateStatus(Context ctx) throws SQLException, StatusNotFoundException {
//        var status = statusRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
//        createToDB(ctx, status);
//        statusRepository.updateStatus(status);
//        ctx.status(204);
//    }
//
//    private void createToDB(Context ctx, Status status) {
//        String val = ctx.formParam("status", "");
//        try {
//            int statVal = Integer.parseInt(val);
//            status.setStatus(statVal);
//            ctx.status(204);
//        } catch (NumberFormatException e) {
//            throw new IllegalArgumentException("Give me an int!");
//        }
//    }
//
//}
