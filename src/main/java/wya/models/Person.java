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
    private int privacy;


    public Person() {}

//     //todo figure out default live, status, and avail
//     public Person(int identifier, String name, String lastSeen, boolean live) {
//         this.identifier = identifier;
//         this.fullName = name;
//         this.lastSeen = lastSeen;
//         this.live = live;
//     }

   /**
     * Public constructor to create a Person model in the MVC.
     *
     * @param identifier   The identifier of the person.
     * @param fullName     The full name of the person.
     * @param lastSeen     The time stamp of the last time the person updated his/her time.
     * @param live         The boolean whether or not the person is active or inactive on the app.
     *                     true = online
     *                     false = offline
     * @param status       The status that the user wants to tell other users about what they are doing.
     * @param longitude    The longitude of their last logged location.
     * @param latitude     The latitude of their last logged location
     * @param availability The availability of the user at the current time using an enumeration.
     *                     0 = available
     *                     1 = busy
     *                     2 = do not disturb
     */
    public Person(int identifier, String fullName, String lastSeen, boolean live, String status, float longitude, float latitude, int availability, int privacy) {
        this.identifier = identifier;
        this.fullName = fullName;
        this.lastSeen = lastSeen;
        this.live = live;
        this.status = status;
        this.availability = availability;
        this.longitude = longitude;
        this.latitude = latitude;
        this.privacy = privacy;
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

    public void setPrivacy(int privacy) {
        this.privacy = privacy;
    }

    public int getPrivacy() {
        return privacy;
    }

}
