package wya.repositories;

import wya.models.Event;
import wya.models.Person;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EventRepository {
    private Connection connection;

    public EventRepository(Connection connection) throws SQLException {
        this.connection = connection;
        var statement = connection.createStatement();
        //FK(location, peopleAvailable, peopleAccepted, peopleInvited, peopleSeen)
        statement.execute("CREATE TABLE IF NOT EXISTS events (identifier INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, " +
                "place TEXT, longitude DECIMAL(9,6), latitude DECIMAL(9,6), image TEXT, startTime TEXT, endTime TEXT)");
        statement.close();
    }


    public List<Event> getAll() throws SQLException {
        var events = new ArrayList<Event>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT * FROM events");
        while (result.next()) {
            events.add(createEventFromDB(result));
        }
        result.close();
        statement.close();
        return events;
    }

    public Event getOne(int id) throws SQLException, wya.repositories.EventNotFoundException {
        var statement = connection.prepareStatement("SELECT * FROM events WHERE identifier = ?");
        statement.setInt(1, id);
        var result = statement.executeQuery();
        try {
            if (result.next()) {
                return createEventFromDB(result);
            } else {
                throw new EventNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    public void create(Event event) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO events (name, description, place, longitude, latitude, image, startTime, endTime) VALUES(?,?,?,?,?,?,?,?)");
        prepareStatement(event, statement);
        statement.execute();
        statement.close();
    }

    public void updateDetails(Event event) throws SQLException, EventNotFoundException {
        var statement = connection.prepareStatement("UPDATE events SET name = ?, description = ?, place = ?, longitude = ?, latitude = ?, image = ?, startTime = ?, endTime = ? WHERE identifier = ?");
        prepareStatement(event, statement);
        statement.setInt(9, event.getIdentifier());
        try {
            if (statement.executeUpdate() == 0) throw new EventNotFoundException();
        } finally {
            statement.close();
        }
    }

    /*
     * Helper to prepare SQL query
     */
    private void prepareStatement(Event event, PreparedStatement statement) throws SQLException {
        statement.setString(1, event.getName());
        statement.setString(2, event.getDescription());
        statement.setString(3, event.getPlace());
        statement.setFloat(4, event.getLongitude());
        statement.setFloat(5, event.getLatitude());
        statement.setString(6, event.getImage());
        statement.setString(7, event.getStartTime());
        statement.setString(8, event.getEndTime());
    }

    /*
     * Helper to prepare INSERT SQL query
     */
    private Event createEventFromDB(ResultSet result) throws SQLException {
        return new Event(
                result.getInt("identifier"),
                result.getString("name"),
                result.getString("description"),
                result.getString("place"),
                result.getFloat("longitude"),
                result.getFloat("latitude"),
                result.getString("image"),
                result.getString("startTime"),
                result.getString("endTime"),
                new Person[]{}, //TODO How do you interact with foreign keys
                new Person[]{}, //TODO How do you interact with foreign keys
                new Person[]{}, //TODO How do you interact with foreign keys
                new Person[]{}
        ); //TODO How do you interact with foreign keys
    }
}
