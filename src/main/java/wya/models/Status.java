package wya.models;

public class Status {
    private int identifier;
    private int status;
    private String textStatus;

    /** THIS FUNCTION CAN SET ID AND "STATUS". TEXT IS THE TEXT CORRESPONDING TO A CERTAIN STATUS!. */
    public Status(int identifier, int status) {
        this.identifier = identifier;
        this.status = status;
        /** 0 - Unavailable
         *  1 - Busy
         *  2 - Available
         */
        if (status == 0) {
            this.textStatus = "Unavailable";
        } else if (status == 1) {
            this.textStatus = "Busy";
        } else {
            this.textStatus = "Available";
        }
    }

    public int getIdentifier() {
        return identifier;
    }

    public void setIdentifier(int identifier) {
        this.identifier = identifier;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }

    public String getTextStatus() {
        return textStatus;
    }

}
