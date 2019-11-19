package wya.models;

public class Radius {
    private int identifier;
    private int radius;
    private Location location;
    private String regionTypeName;
    private String[] regionCovered;

    public Radius(int identifier, int radius, Location location, String regionTypeName, String[] regionCovered) {
        this.identifier = identifier;
        this.radius = radius;
        this.location = location;
        this.regionTypeName = regionTypeName;
        this.regionCovered = regionCovered;
    }

    public Radius() {}

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getRegionTypeName() {
        return regionTypeName;
    }

    public void setRegionTypeName(String regionTypeName) {
        this.regionTypeName = regionTypeName;
    }

    public String[] getRegionCovered() {
        return regionCovered;
    }

    public void setRegionCovered(String[] regionCovered) {
        this.regionCovered = regionCovered;
    }
}