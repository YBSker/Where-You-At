//package wya.controllers;
//public class AvailabilityController {
//
//    private AvailabilityRepository availabilityRepository;
//
//    public AvailabilityController(AvailabilityRepository availabilityRepository) {
//        this.availabilityRepository = availabilityRepository;
//    }
//
//    public void getAll(Context ctx) throws SQLException {
//        ctx.json(availabilityRepository.getAll());
//    }
//
//    public void create(Context ctx) throws SQLException {
//        Status status = new Status();
//        createToDB(ctx, status);
//        // Vincent: Person.create() returns the identifier for you. Check comments; sorry slowly adding comments.
//        availabilityRepository.create();
//        ctx.status(201);
//    }
//
//    public void updateAvailability(Context ctx) throws SQLException, AvailabilityNotFoundException {
//        var availability = availabilityRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
//        createToDB(ctx, availability);
//        availabilityRepository.updateAvailability(availability);
//        ctx.status(204);
//    }
//
//    private void createToDB(Context ctx, Availability status) {
//        String val = ctx.formParam("status", "");
//        try {
//            int statVal = Integer.parseInt(val);
//            status.setStatus(statVal);
//            ctx.status(204);
//        } catch (NumberFormatException e) {
//            throw new IllegalArgumentException("Give me an int!");
//        }
//    }
//}
