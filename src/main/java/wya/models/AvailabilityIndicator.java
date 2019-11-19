package wya.models;

public class AvailabilityIndicator {
    private int identifier;
    private int color;

    public AvailabilityIndicator(int identifier, int color) {
        this.identifier = identifier;
        this.color = color;

    }

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
        this.color = color;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }
}