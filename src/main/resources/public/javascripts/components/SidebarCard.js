class SidebarCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            picture: '',
            last_seen: '',
            live: '',
            status: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
    }

    render() {
        return (
            <div>
                <div className="pfp-container"><img src={this.state.picture} alt={this.state.name}/></div>
                <div className="info">
                    <div className="name"><h2>{this.state.name}</h2></div>
                    <div className="last-seen"><p><i>last seen {this.state.last_seen} min ago</i></p></div>
                    <div className="status"><p>{this.state.status}</p>
                    </div>
                </div>
            </div>
        );
    }
}
