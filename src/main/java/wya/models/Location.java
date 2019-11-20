package wya.models;

public class Location {
    private int identifier;
    private float longitude;
    private float latitude;

    public Location(int identifier, float longitude, float latitude) {
        this.identifier = identifier;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
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
}
