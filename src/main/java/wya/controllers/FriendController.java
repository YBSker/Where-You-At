//package wya.controllers;
//
//public class FriendController {
//
//    private FriendRepository friendRepository;
//
//    /**
//     * Person Controller constructor.
//     *
//     * @param friendRepository Person Repository to control.
//     */
//    FriendController(FriendRepository friendRepository) {
//        this.friendRepository = friendRepository;
//    }
//
//    /**
//     * Get all friend profiles in friend table.
//     *
//     * @param ctx
//     * @throws SQLException
//     */
//    public void getAll(Context ctx) throws SQLException {
//        ctx.json(friendRepository.getAll());
//    }
//
//    public void getOne(Context ctx) throws SQLException, PersonNotFoundException {
//        var person_id = ctx.sessionAttribute("person_id");
//        ctx.json(friendRepository.getOne((int) person_id));
//    }
//
//    void request(Context ctx) throws SQLException {
////        friendRepository.request();
//    }
//
//    void updateDetails(Context ctx) throws SQLException, PersonNotFoundException {
//
//    }
//
//    private void createToDB(Context ctx, Person person) {
//
//    }
//}
