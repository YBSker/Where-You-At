package wya.models;

public class Places {
    private int identifier;
    private String town;
    private String city;
    private String state;
    private String country;

    public Places(int identifier, String town, String city, String state, String country) {
        this.identifier = identifier;
        this.town = town;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    public Places() {

    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
