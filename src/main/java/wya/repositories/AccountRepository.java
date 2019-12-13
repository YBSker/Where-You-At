package wya.repositories;

import wya.models.Account;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AccountRepository {
    private Connection connection;

    public AccountRepository(Connection connection) throws SQLException {
        this.connection = connection;
        var statement = connection.createStatement();
        statement.execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY UNIQUE, password TEXT, email TEXT," +
                "person_id INTEGER, profilePicture TEXT, FOREIGN KEY (person_id) REFERENCES person(identifier))");
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
                System.out.println("Account not found");
                throw new AccountNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    public void create(Account account) throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO users (username, password, email, person_id, profilePicture) VALUES(?,?,?,?,?)");
        statement.setString(1, account.getUsername());
        statement.setString(2, account.getPassword());
        statement.setString(3, account.getEmail());
        statement.setInt(4, account.getPerson_id());
        statement.setString(5, account.getProfilePicture());

        statement.execute();
        statement.close();
    }

    public void updateDetails(Account account) throws SQLException, AccountNotFoundException {
        var statement = connection.prepareStatement("UPDATE users SET password = ?,  email = ?, person_id = ?,  profilePicture = ? WHERE username = ?");
        statement.setString(1, account.getPassword());
        statement.setString(2, account.getEmail());
        statement.setInt(3, account.getPerson_id());
        statement.setString(4, account.getProfilePicture());
        statement.setString(5, account.getUsername());
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
                result.getString("profilePicture")
        );
    }
}
