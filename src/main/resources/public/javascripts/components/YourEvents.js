

class YourEvents extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const eventInfo = this.props.eventInfo;
        console.log(eventInfo);
        console.log(eventInfo.name);
        const eventName = eventInfo.name;
        return (
            <div className="side">
                <div className="side-header">
                    <h1 className="side-header-text">Event Details</h1>
                </div>
            </div>
        );
    }
}