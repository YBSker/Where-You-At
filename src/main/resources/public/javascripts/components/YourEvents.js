

class YourEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }

    async getEventsFromServer() {
        this.setState({ events: await (await fetch("/events")).json() });
    }



    render() {
        return (
            <div className="side">
                <div className="side-header" style={sideHeaderStyles}>
                    <h1 style={h1Styles}>Your Events</h1>
                </div>
            </div>
        );
    }
}