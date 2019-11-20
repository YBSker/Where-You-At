package wya.models;

public class Place {
    private int identifier;
    private String placeName;
    private String[] regionTypename;
    private int longitude;
    private int latitude;

    public Place(int identifier) {
        this.identifier = identifier;
//        this.regionTypename = regionTypename;
        //TODO: PlaceName needs to be based off of regionTypeName and COORDINATES a Person is in
        //TODO: Work with gary on this component...I can't finish on my own without knowledge on how the maps API handles things...
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

    public String[] getRegionTypename() {
        return regionTypename;
    }

    public void setRegionTypename(String[] regionTypename) {
        this.regionTypename = regionTypename;
    }

    public int getLongitude() {
        return longitude;
    }

    public void setLongitude(int longitude) {
        this.longitude = longitude;
    }

    public int getLatitude() {
        return latitude;
    }

    public void setLatitude(int latitude) {
        this.latitude = latitude;
    }
}
