package wya.repositories;

import wya.models.Location;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class LocationRepository {
    private Connection connection;

    public LocationRepository(Connection connection) throws SQLException {
        this.connection = connection;
        var statement = connection.createStatement();
        //TODO: make the long/latitude dependent on what is clicked??
        statement.execute("CREATE TABLE IF NOT EXISTS location (identifier INTEGER PRIMARY KEY AUTOINCREMENT, longitude DECIMAL(9,6), latitude DECIMAL(9,6))");
        statement.close();
    }

    public List<Location> getAll() throws SQLException {
        var locations = new ArrayList<Location>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT * FROM location");
        while (result.next()) {
            locations.add(createLocationFromDB(result));
        }
        statement.close();
        result.close();
        return locations;
    }

    public Location getOne(int identifier) throws SQLException, LocationNotFoundException {
        var statement = connection.prepareStatement("SELECT * FROM location WHERE identifier = ?");
        statement.setInt(1, identifier);
        var result = statement.executeQuery();
        try {
            if (result.next()) {
                return createLocationFromDB(result);
            } else {
                throw new LocationNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    public void create(Location location) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO location (identifier, longitude, latitude) VALUES (?,?,?)");
        prepareStatement(location, statement);
        //TODO: Make sure that identifier thing is working?
        statement.setInt(1, location.getIdentifier());
        statement.execute();
        statement.close();
    }

    public void updateDetails(Location location) throws SQLException, LocationNotFoundException {
        var statement = connection.prepareStatement("UPDATE location SET identifier = ?, longitude = ?, latitude = ?");
        prepareStatement(location, statement);
        statement.setInt(1, location.getIdentifier());
        try {
            if (statement.executeUpdate() == 0) throw new LocationNotFoundException();
        } finally {
            statement.close();
        }
    }

    /*
     * Helper to get locations for a person BASED ON IDENTIFIER.
     */
    private Location createLocationFromDB(ResultSet result) throws SQLException {
        return new Location(
                result.getInt("identifier"),
                result.getFloat("longitude"),
                result.getFloat("latitude")
            );
    }

    private void prepareStatement(Location location, PreparedStatement statement) throws SQLException {
        statement.setInt(1, location.getIdentifier());
        //There was a typing mismatch in Location Models...ensure this isn't anywhere else...
        statement.setFloat(2, location.getLongitude());
        statement.setFloat(3, location.getLatitude());
    }
}
