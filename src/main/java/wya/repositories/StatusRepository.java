package wya.repositories;

import wya.models.Status;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/** We store for each status the identifier and an int indicating what kind of status.
 *  Any text corresponding is handled in the model itself.
 */
public class StatusRepository {
    private Connection connection;

    public StatusRepository(Connection connection) throws SQLException {
        this.connection = connection;
        var statement = connection.createStatement();
        statement.execute("CREATE TABLE IF NOT EXISTS status (identifier INTEGER PRIMARY KEY AUTOINCREMENT, status INTEGER)");
        statement.close();
    }

    public List<Status> getAll() throws SQLException {
        var status = new ArrayList<Status>();
        var statement = connection.createStatement();
        var result = statement.executeQuery("SELECT * FROM status");
        while (result.next()) {
            status.add(createStatusFromDB(result));
        }
        statement.close();
        result.close();
        return status;
    }

    public Status getOne(int identifier) throws SQLException, StatusNotFoundException {
        var statement = connection.prepareStatement("SELECT * FROM status WHERE identifier = ?");
        statement.setInt(1, identifier);
        var result = statement.executeQuery();
        try {
            if (result.next()) {
                return createStatusFromDB(result);
            } else {
                throw new StatusNotFoundException();
            }
        } finally {
            statement.close();
            result.close();
        }
    }

    public void create() throws SQLException {
        var statement = connection.prepareStatement("INSERT INTO status (status) VALUES (?)");
//        prepareStatement(status, statement);
//        statement.execute();
        statement.close();
    }

    public void updateStatus(Status status) throws SQLException, StatusNotFoundException {
        var statement = connection.prepareStatement("UPDATE status SET status=?");
        prepareStatement(status, statement);
        try {
            if (statement.executeUpdate() == 0) throw new StatusNotFoundException();
        } finally {
            statement.close();
        }
    }

    private Status createStatusFromDB(ResultSet result) throws SQLException {
        return new Status(
                result.getInt("identifier"),
                result.getInt("status")
        );
    }

    private void prepareStatement(Status status, PreparedStatement statement) throws SQLException {
        statement.setInt(1, status.getStatus());
    }

}
