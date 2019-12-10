class SidebarCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            picture: "https://i.imgur.com/sOXFllp.jpg",
            last_seen: 'x',
            live: 'x',
            status: 'x',
        };
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
