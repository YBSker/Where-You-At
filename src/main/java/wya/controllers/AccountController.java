package wya.controllers;

import at.favre.lib.crypto.bcrypt.BCrypt;
import io.javalin.http.Context;
import io.javalin.http.ForbiddenResponse;
import io.javalin.http.NotFoundResponse;
import wya.models.Account;
import wya.repositories.AccountNotFoundException;
import wya.repositories.AccountRepository;

import java.sql.SQLException;
import java.util.Objects;

public class AccountController {

    private AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public void getAll(Context ctx) throws SQLException {
        ctx.json(accountRepository.getAll());
    }

    public void getOne(Context ctx) throws SQLException, AccountNotFoundException {
        ctx.json(accountRepository.getOne(ctx.pathParam("username")));
    }

    /**
     * Create a new user entry in user using the form params from ctx and the person_id.
     *
     * @param ctx       Javalin Context object with the form params to insert into new user entry.
     * @param person_id PK from person to use as FK in person.
     * @throws SQLException Statement failed to execute.
     */
    void register(Context ctx, int person_id) throws SQLException {
        Account account = new Account();
        account.setPerson_id(person_id);
        createToDB(ctx, account);
        accountRepository.create(account);
        ctx.status(201);
    }

    /**
     * Login handler.
     * Set the session attribute to the user account.
     *
     * @param ctx Javalin Context object with the form params to insert into new user entry.
     * @throws AccountNotFoundException Account with the username/password combination is wrong.
     * @throws SQLException             SQL statement failed to execute.
     */
    void login(Context ctx) throws AccountNotFoundException, SQLException {
        Account user = null;
        try {
            user = accountRepository.getOne(ctx.formParam("username"));
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (AccountNotFoundException e) {
            System.out.println("Username does not exist");
            throw new NotFoundResponse();
        }
        BCrypt.Result result = BCrypt.verifyer().verify(ctx.formParam("password", "").toCharArray(), user.getPassword());
        if (!result.verified) {
            throw new ForbiddenResponse();
        }
        ctx.sessionAttribute("user", user);
        ctx.sessionAttribute("person_id", user.getPerson_id());
        ctx.status(200);
    }


    /**
     * Change password for account specified by ctx.
     *
     * @param ctx Javalin Context object with the form params to insert into user entry.
     */
    void changePass(Context ctx) throws AccountNotFoundException, SQLException {
        var curr = currentUser(ctx);
        BCrypt.Result result = BCrypt.verifyer().verify(ctx.formParam("oldpassword", "").toCharArray(), curr.getPassword());
        if (!result.verified) {
            throw new ForbiddenResponse();
        }
        curr.setPassword(BCrypt.withDefaults().hashToString(12, ctx.formParam("newpassword", "").toCharArray()));
        accountRepository.updateDetails(curr);
        ctx.status(200);
    }

    /**
     * Get the current user of the session.
     *
     * @param ctx Javalin Context object
     * @return The Account of the current user.
     */
    private Account currentUser(Context ctx) {
        var user = (Account) ctx.sessionAttribute("user");
        if (user == null) throw new ForbiddenResponse();
        return user;
    }

    /**
     * Update user entry in user using the form params from ctx.
     *
     * @param ctx Javalin Context object with the form params to insert into user entry.
     * @throws SQLException             Statement failed to execute.
     * @throws AccountNotFoundException Account with PK identifier not found in user.
     */
    void updateDetails(Context ctx) throws SQLException, AccountNotFoundException {
        var curr = currentUser(ctx);
        editToDB(ctx, curr);
        accountRepository.updateDetails(curr);
        ctx.status(204);
    }

    /**
     * Helper function to create the Account object to be inserted into user.
     *
     * @param ctx     Javalin Context object with the form params to insert into user entry.
     * @param account Account object to be converted into user entry.
     */
    private void createToDB(Context ctx, Account account) {
        account.setUsername(ctx.formParam("username", ""));
        account.setPassword(BCrypt.withDefaults().hashToString(12, Objects.requireNonNull(ctx.formParam("password", "")).toCharArray()));
        account.setEmail(ctx.formParam("email", ""));
        account.setPerson_id(account.getPerson_id());
        account.setProfilePicture(ctx.formParam("profilePicture", ""));
    }

    private void editToDB(Context ctx, Account account) {
        account.setEmail(ctx.formParam("email", ""));
        account.setProfilePicture(ctx.formParam("profilePicture", ""));
    }
}

