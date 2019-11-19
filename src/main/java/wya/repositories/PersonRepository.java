package wya.repositories;

import wya.models.Availability;
import wya.models.Location;
import wya.models.Person;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class PersonRepository {
    private Connection connection;

    public PersonRepository(Connection connection) throws SQLException {
        this.connection = connection;
        var statement = connection.createStatement();
        statement.execute("CREATE TABLE IF NOT EXISTS person (identifier INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, lastSeen TEXT, live BOOLEAN DEFAULT true, status TEXT, longitude DECIMAL(9,6), latitude DECIMAL(9,6), availability INTEGER)");
        statement.close();
    }

    public List<Person> getAll() throws SQLException {
        var people = new ArrayList<Person>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT * FROM person");
        while (result.next()) {
            people.add(createPersonFromDB(result));
        }
        statement.close();
        result.close();
        return people;
    }

    public Person getOne(int identifier) throws SQLException, PersonNotFoundException {
        var statement = connection.prepareStatement("SELECT * FROM person WHERE identifier = ?");
        statement.setInt(1, identifier);
        var result = statement.executeQuery();
        try {
            if (result.next()) {
                return createPersonFromDB(result);
            } else {
                throw new PersonNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    public void create(Person person) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO person (fullName, lastSeen, live, status, longitude, latitude, availability) VALUES (?,?,?,?,?,?,?)");
        prepareStatement(person, statement);
        statement.setString(1, person.getFullName());
        statement.execute();
        statement.close();
    }

    public void updateDetails(Person person) throws SQLException, PersonNotFoundException {
        var statement = connection.prepareStatement("UPDATE person SET fullName = ?, lastSeen = ?, live = ?, status = ?, longitude = ?, latitude = ?, availability = ?  WHERE identifier = ? ");
        prepareStatement(person, statement);
        statement.setInt(8, person.getIdentifier());
        try {
            if (statement.executeUpdate() == 0) throw new PersonNotFoundException();
        } finally {
            statement.close();
        }
    }

    /*
     * Helper to create a person from the database using a ResultSet Object.
     */
    private Person createPersonFromDB(ResultSet result) throws SQLException {
        return new Person(
                result.getInt("identifier"),
                result.getString("fullName"),
                result.getString("lastSeen"),
                result.getBoolean("live"),
                result.getString("status"),
                result.getFloat("longitude"),
                result.getFloat("latitude"),
                new Availability()  //todo
        );
    }

    private void prepareStatement(Person person, PreparedStatement statement) throws SQLException {
        statement.setString(1, person.getFullName());
        statement.setString(2, person.getLastSeen());
        statement.setBoolean(3, person.isLive());
        statement.setString(4, person.getStatus());
        statement.setFloat(5, person.getLongitude());
        statement.setFloat(6, person.getLatitude());
//        statement.setInt(7, person.getAvailability().getIdentifier());    //TODO
        statement.setInt(7,1);
    }
}
