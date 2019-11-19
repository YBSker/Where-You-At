package wya.repositories;

import wya.models.Account;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AccountRepository {
    private Connection connection;
    private RaidusRepository radiusRepository;

    public AccountRepository(Connection connection, RaidusRepository radiusRepository) throws SQLException {
        this.connection = connection;
        this.radiusRepository = radiusRepository;
        var statement = connection.createStatement();
        statement.execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY UNIQUE, password TEXT, email TEXT," +
                "person_id INTEGER, profilePicture TEXT, radius_id INTEGER, FOREIGN KEY (person_id) REFERENCES person(identifier), FOREIGN KEY (radius_id) REFERENCES radius(radius_id))");
        statement.close();
    }

    public List<Account> getAll() throws SQLException {
        var account = new ArrayList<Account>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT * FROM users");
        while (result.next()) {
            account.add(createAccountFromDB(result));
        }
        result.close();
        statement.close();
        return account;
    }

    public Account getOne(String username) throws SQLException, AccountNotFoundException {
        var statement = connection.prepareStatement("SELECT * FROM users WHERE username = ?");
        statement.setString(1, username);
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

    public void create(Account account) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO users (username, password, email, person_id, profilePicture, radius_id) VALUES(?,?,?,?,?,?)");   //TODO radius
        prepareStatement(account, statement);
        statement.execute();
        statement.close();
    }

    public void updateDetails(Account account) throws SQLException, AccountNotFoundException {
        var statement = connection.prepareStatement("UPDATE users SET password = ?,  email = ?, person_id = ?,  profilePicture = ?, radius_id = ? WHERE username = ?");
        prepareStatement(account, statement);
        statement.setString(6, account.getUsername());
        try {
            if (statement.executeUpdate() == 0) throw new AccountNotFoundException();
        } finally {
            statement.close();
        }
    }

    private Account createAccountFromDB(ResultSet result) throws SQLException {
        return new Account(
                result.getString("username"),
                result.getString("password"),
                result.getString("email"),
                result.getInt("person_id"),
                result.getString("profilePicture"),
                radiusRepository.getOne(result.getInt("radius_id"))
        );
    }

    private void prepareStatement(Account account, PreparedStatement statement) throws SQLException {
        statement.setString(1, account.getUsername());
        statement.setString(2, account.getPassword());
        statement.setString(3, account.getEmail());
        statement.setInt(4, account.getPerson_id());
        statement.setString(5, account.getProfilePicture());
        statement.setInt(6, account.getRadius().getIdentifier());
    }
}
