package wya.models;

public class Availability {
    private int identifier;
    private Availability availability;
    private AvailabilityIndicator indicator;
    private String time;

    public Availability() {
    }

    public Availability(int identifier, Availability availability, AvailabilityIndicator indicator, String time) {
        this.identifier = identifier;
        this.availability = availability;
        this.indicator = indicator;
        this.time = time;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public Availability getAvailability() {
        return availability;
    }

    public void setAvailability(Availability availability) {
        this.availability = availability;
    }

    public AvailabilityIndicator getIndicator() {
        return indicator;
    }

    public void setIndicator(AvailabilityIndicator indicator) {
        this.indicator = indicator;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}