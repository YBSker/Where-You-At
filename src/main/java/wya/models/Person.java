package wya.models;

public class Person {
    private int identifier;
    private String fullName;
    private String lastSeen;
    private boolean live;
    private String status;
    private float longitude;
    private float latitude;
    private int availability;


    public Person() {}

    //todo figure out default live, status, and avail
    public Person(int identifier, String name, String lastSeen, boolean live) {
        this.identifier = identifier;
        this.fullName = name;
        this.lastSeen = lastSeen;
        this.live = live;
    }

    /*
     * Constructor with all vars
     */

    public Person(int identifier, String fullName, String lastSeen, boolean live, String status, float longitude, float latitude, int availability) {
        this.identifier = identifier;
        this.fullName = fullName;
        this.lastSeen = lastSeen;
        this.live = live;
        this.status = status;
        this.availability = availability;
        this.longitude = longitude;
        this.latitude = latitude;
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

    public String getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(String lastSeen) {
        this.lastSeen = lastSeen;
    }

    public boolean isLive() {
        return live;
    }

    public void setLive(boolean live) {
        this.live = live;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int availability) {
        this.availability = availability;
    }
}
