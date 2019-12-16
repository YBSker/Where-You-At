

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
                <div className="side-header">
                    <h1 className="side-header-text">Your Events</h1>
                </div>
            </div>
        );
    }
}