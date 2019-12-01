package wya.repositories;

import wya.models.Places;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PlacesRepository {
    private Connection connection;

    public PlacesRepository(Connection connection) throws SQLException {
        this.connection = connection;
        var statement = connection.createStatement();
        statement.execute("CREATE TABLE IF NOT EXISTS places (identifier INTEGER PRIMARY KEY AUTOINCREMENT, town TEXT, city TEXT, state TEXT, country TEXT)");
        statement.close();
    }

    public List<Places> getAll() throws SQLException {
        var places = new ArrayList<Places>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT * FROM person");
        while (result.next()) {
            places.add(createPlacesFromDB(result));
        }
        statement.close();
        result.close();
        return places;
    }

    public Places getOne(int identifier) throws SQLException, PlacesNotFoundException {
        var statement = connection.prepareStatement("SELECT * FROM places WHERE identifier = ?");
        statement.setInt(1, identifier);
        var result = statement.executeQuery();
        try {
            if (result.next()) {
                return createPlacesFromDB(result);
            } else {
                throw new PlacesNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    /**
     *
     * @param places Object places that has all of the fields that an "initialized" user exists in
     * @return The ID of place that the user should correspond too.
     * @throws SQLException rip
     */

    public int create(Places places) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO places (town, city, state, country) VALUES (?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
        prepareStatement(places, statement);
        statement.executeUpdate();
        int id = statement.getGeneratedKeys().getInt(1);
        statement.close();
        return id;
    }

    public void updatePlaces(Places places) throws SQLException, PlacesNotFoundException {
        var statement = connection.prepareStatement("UPDATE places SET town = ?, city = ?, state = ?, country = ? WHERE identifier = ?");
        try (statement) {
            prepareStatement(places, statement);
            statement.setInt(5, places.getIdentifier());
            if (statement.executeUpdate() == 0) throw new PlacesNotFoundException();
        }
    }


    private Places createPlacesFromDB(ResultSet result) throws SQLException {
        return new Places(
                result.getInt("identifier"),
                result.getString("town"),
                result.getString("city"),
                result.getString("state"),
                result.getString("country")
        );
    }

    private void prepareStatement(Places places, PreparedStatement statement) throws SQLException {
        statement.setString(1, places.getTown());
        statement.setString(2, places.getCity());
        statement.setString(3, places.getState());
        statement.setString(4, places.getCountry());
    }

}
