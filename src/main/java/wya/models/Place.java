package wya.models;

public class Place {
    private int identifier;
    private String placeName;
    private Location location;
    private String[] regionTypename;

    public Place(int identifier, String placeName, Location location, String[] regionTypename) {
        this.identifier = identifier;
        this.placeName = placeName;
        this.location = location;
        this.regionTypename = regionTypename;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String[] getRegionTypename() {
        return regionTypename;
    }

    public void setRegionTypename(String[] regionTypename) {
        this.regionTypename = regionTypename;
    }
}
