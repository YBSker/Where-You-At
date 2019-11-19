package wya.controllers;

import wya.repositories.AccountRepository;

public class AccountController {

    private AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

//    public void getAll(Context ctx) throws SQLException, PersonNotFoundException {
//        ctx.json(accountRepository.getAll());
//    }
//
//    public void create(Context ctx) throws SQLException {
//        accountRepository.create();
//        ctx.status(201);
//    }
//
//    public void updateAccount(Context ctx) throws SQLException, PersonNotFoundException, AccountNotFoundException {
//        var person = accountRepository.getOne(ctx.pathParam("identifier", Integer.class).get());
//        var fullName = ctx.formParam("fullName", String.class).get();
//        person.setFullName(fullName);
//        accountRepository.updateName(person);
//        ctx.status(204);
//    }


}
