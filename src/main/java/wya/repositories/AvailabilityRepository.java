//package wya.repositories;
//
//import wya.models.Availability;
//
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.List;
//
//
//public class AvailabilityRepository {
//    private Connection connection;
//
//    public AvailabilityRepository(Connection connection) throws SQLException {
//        this.connection = connection;
//        var statement = connection.createStatement();
//        //I guess it could be like we set availability to a certain number depending on the time vector later...
//        statement.execute("CREATE TABLE IF NOT EXISTS availability (identifier INTEGER PRIMARY KEY AUTOINCREMENT, availability INTEGER)");
//        statement.close();
//    }
//
//    public List<Availability> getAll() throws SQLException {
//        var availabilities = new ArrayList<Availability>();
//        var statement = connection.createStatement();
//        var result = statement.executeQuery("SELECT * FROM availability");
//        while (result.next()) {
//            availabilities.add(createAvailabilityFromDB(result));
//        }
//        statement.close();
//        result.close();
//        return availabilities;
//    }
//
//    public Availability getOne(int identifier) throws SQLException, AvailabilityNotFoundException {
//        var statement = connection.prepareStatement("SELECT * FROM availability WHERE identifier = ?");
//        statement.setInt(1, identifier);
//        var result = statement.executeQuery();
//        try {
//            if (result.next()) {
//                return createAvailabilityFromDB(result);
//            } else {
//                throw new AvailabilityNotFoundException();
//            }
//        } finally {
//            statement.close();
//            result.close();
//        }
//    }
//
//    public void create(Availability availability) throws SQLException {
//        var statement = connection.prepareStatement("INSERT INTO availability (identifier) VALUES (?)");
//        prepareStatement(availability, statement);
//        statement.setInt(1, availability.getIdentifier());
//        statement.execute();
//        statement.close();
//    }
//    public void updateAvailability(Availability availability) throws SQLException, AvailabilityNotFoundException {
//        var statement = connection.prepareStatement("UPDATE availability SET availability=? WHERE identifier = ? ");
//        prepareStatement(availability, statement);
//        statement.setInt(1, availability.getIdentifier());
//        try {
//            if (statement.executeUpdate() == 0) throw new AvailabilityNotFoundException();
//        } finally {
//            statement.close();
//        }
//    }
//
//    /*
//     * Helper to create a person from the database using a ResultSet Object.
//     */
//    private Availability createAvailabilityFromDB(ResultSet result) throws SQLException {
////        var statement = connection.createStatement();
////        ResultSet rst;
////        rst = statement.executeQuery(sql);
////        ArrayList<Date> times = new ArrayList<>(Date);
//
//        return new Availability(
//                result.getInt("identifier")
//                );
//    }
//
//    private void prepareStatement(Availability availability, PreparedStatement statement) throws SQLException {
//        statement.setInt(1, availability.getIdentifier());
//    }
//}
