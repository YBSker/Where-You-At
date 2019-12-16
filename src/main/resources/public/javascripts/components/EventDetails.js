//TODO You could merge this file and Your Events if you add a conditional on the way the function is accessed,
//and then map all events in the array to event cards, whether it's one or many

class EventDetails extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const eventInfo = this.props.eventInfo;
        console.log(eventInfo);
        console.log(eventInfo.name);
        return (
            <div className="side">
                <div className="side-header">
                    <h1 className="side-header-text">Event Details</h1>
                </div>

                <div className="event-list">
                    <div className="event-card">
                        <div className="event-name">
                            <h2 className="event-name-text">{eventInfo.name}</h2>
                        </div>

                        <div className="event-details">
                            <p>Description: <b>{eventInfo.description}</b></p>
                            <p>Address: <b>{eventInfo.place}</b></p>
                            <p>Start Time: <b>{eventInfo.startTime}</b></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}