package wya.models;

public class Account {
    private int identifier;
    private String fullName;
    private String username;
    private String email;
    private String profilePicture;
    private Person person;
    private Radius radius;
    private Person[] friends;
    private int facebook;

    public Account(int identifier, String fullName, String username, String email, Person person, Radius radius, int facebook) {
        this.identifier = identifier;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.person = person;
        this.radius = radius;
        this.facebook = facebook;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Radius getRadius() {
        return radius;
    }

    public void setRadius(Radius radius) {
        this.radius = radius;
    }

    public Person[] getFriends() {
        return friends;
    }

    public void setFriends(Person[] friends) {
        this.friends = friends;
    }

    public int getFacebook() {
        return facebook;
    }

    public void setFacebook(int facebook) {
        this.facebook = facebook;
    }
}
