const SIDEBAR_STATE = {
    closed: 0,
    createEvent: 1,
    yourEvents: 2,
    cardList: 3,
    settings: 4,
    changePass: 5,
};

const mainContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto 400px',
    height: '100vh'
};

const mainContainerClosedStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    height: '100vh'
};

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signUp: false,
            range: "",
            sidebarState: SIDEBAR_STATE.closed,
            friendsToDisplay: []
        };

        this.logIn = this.logIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.setRange = this.setRange.bind(this);
        this.updateSidebar = this.updateSidebar.bind(this);
    }

    logIn(state) {
        this.setState({loggedIn: state});
    }

    signUp(state) {
        this.setState({signUp: state});
    }

    setRange(range_option) {
        this.setState({range: range_option});
    }

    updateSidebar(state, friends) {
        if (friends) {
            this.setState({friendsToDisplay: friends});
        }
        this.setState({sidebarState: state});
    }

    render() {
        if (!this.state.loggedIn && !this.state.signUp) {
            return (
                <div>
                    <LoginPage logIn={this.logIn} signUp={this.signUp}/>
                </div>
            );
        }

        if (this.state.signUp) {
            return (
                <div>
                    <SignUpPage logIn={this.logIn} signUp={this.signUp} setRange={this.setRange}/>
                </div>
            );
        }

        switch (this.state.sidebarState) {
            case SIDEBAR_STATE.closed:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerClosedStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar} range={this.state.range}/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.createEvent:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <EventForm/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.yourEvents:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <YourEvents/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.cardList:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <Sidebar friends={this.state.friendsToDisplay}/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.settings:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar}/>
                            </div>
                            <Settings updateSidebar={this.updateSidebar}/>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.changePass:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <ChangePassword/>
                            </div>
                        </div>
                    </div>
                );


            default:
                return (
                    <div>
                        <NavigationBar updateSidebar={this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerClosedStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar={this.updateSidebar}/>
                            </div>
                        </div>
                    </div>
                );
        }
    }
}

ReactDOM.render(<Application/>, document.querySelector("#application"));
