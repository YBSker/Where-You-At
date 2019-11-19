package wya.models;

public class Status {
    private int identifier;
    private String text;
    private Reaction[] reacts;

    public Status(int identifier, String text, Reaction[] reacts) {
        this.identifier = identifier;
        this.text = text;
        this.reacts = reacts;
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Reaction[] getReacts() {
        return reacts;
    }

    public void setReacts(Reaction[] reacts) {
        this.reacts = reacts;
    }
}
