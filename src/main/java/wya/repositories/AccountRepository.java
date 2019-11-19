package wya.repositories;

import wya.models.Account;
import wya.models.Radius;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AccountRepository {
    private Connection connection;
    private PersonRepository personRepository;

    public AccountRepository(Connection connection, PersonRepository personRepository) throws SQLException {
        this.connection = connection;
        this.personRepository = personRepository;
        var statement = connection.createStatement();
        //FK(location, peopleAvailable, peopleAccepted, peopleInvited, peopleSeen)
        statement.execute("CREATE TABLE IF NOT EXISTS users (identifier INTEGER PRIMARY KEY AUTOINCREMENT, username, email TEXT, " +
                "FOREIGN KEY (person_id) REFERENCES persons(person_id), radius INTEGER, facebook INTEGER)");
        statement.close();
    }

    public List<Account> getAll() throws SQLException, PersonNotFoundException{
        var account = new ArrayList<Account>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT FROM users");
        while (result.next()) {
            account.add(createAccountFromDB(result));
        }
        result.close();
        statement.close();
        return account;
    }

    public Account getOne(int id) throws SQLException, AccountNotFoundException, PersonNotFoundException {
        var statement = connection.prepareStatement("SELECT FROM users WHERE identifier = ?");
        statement.setInt(1, id);
        var result = statement.executeQuery();
        try {
            if (result.next()) {
                return createAccountFromDB(result);
            } else {
                throw new AccountNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    /*
     * Update database
     */
    public void create() throws SQLException {
        var statement = connection.createStatement();
        statement.execute("INSERT INTO users (name) VALUES(\"\")"); //todo
        statement.close();
    }

    public void create(Account event) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO users (name, description, place, longitude, latitude, image, startTime, endTime) VALUES(?,?,?,?,?,?,?,?)");
        statement.execute();
        statement.close();
    }

    public void updateDetails(Account event) throws SQLException, AccountNotFoundException {
        var statement = connection.prepareStatement("UPDATE users SET name = ?, description = ?, place = ?, longitude = ?, latitude = ?, image = ?, startTime = ?, endTime = ? WHERE identifier = ?");
        statement.setString(1, event.getFullName());
        statement.setInt(9, event.getIdentifier());
        try {
            if (statement.executeUpdate() == 0) throw new AccountNotFoundException();
        } finally {
            statement.close();
        }
    }

    private Account createAccountFromDB(ResultSet result) throws SQLException, PersonNotFoundException {
        return new Account(
                result.getInt("identifier"),
                result.getString("fullName"),
                result.getString("username"),
                result.getString("email"),
                personRepository.getOne(result.getInt("person_id")),
                new Radius(),   //todo
                result.getInt("facebook")
                );
    }
}
