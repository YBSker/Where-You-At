package wya.models;

public class Location {
    private int identifier;
    private double longitude;
    private double latitude;

    public Location(int identifier, double longitude, double latitude) {
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

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
}
