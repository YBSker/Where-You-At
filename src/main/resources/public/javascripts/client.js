const SIDEBAR_STATE = {
    closed: 0,
    event: 1,
    cardList: 2,
    settings: 3,
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
            sidebarState: SIDEBAR_STATE.closed
        };

        this.updateSidebar = this.updateSidebar.bind(this);
    }

    logIn = (state) => {
        this.setState({loggedIn: state});
    }

    signUp = (state) => {
        this.setState({signUp: state});
    }

    updateSidebar(state) {
        this.setState({sidebarState: state});
    }

    render() {
        if (!this.state.loggedIn && !this.state.signUp) {
            return (
                <div>
                    <LoginPage logIn = {this.logIn} signUp = {this.signUp}/>
                </div>
            );
        }

        if (this.state.signUp) {
            return (
                <div>
                    <SignUpPage logIn={this.logIn} signUp = {this.signUp}/>
                </div>
            )
        }

        switch (this.state.sidebarState) {
            case SIDEBAR_STATE.closed:
                return (
                    <div>
                        <NavigationBar updateSidebar = {this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerClosedStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar = {this.updateSidebar}/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.event:
                return (
                    <div>
                        <NavigationBar updateSidebar = {this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar = {this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <EventForm/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.cardList:
                return (
                    <div>
                        <NavigationBar updateSidebar = {this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar = {this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <Sidebar/>
                            </div>
                        </div>
                    </div>
                );

            case SIDEBAR_STATE.settings:
                return (
                    <div>
                        <NavigationBar updateSidebar = {this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar = {this.updateSidebar}/>
                            </div>
                            <div className="side">
                                <Settings/>
                            </div>
                        </div>
                    </div>
                );


            default:
                return (
                    <div>
                        <NavigationBar updateSidebar = {this.updateSidebar}/>
                        <div className="mainContainer" style={mainContainerClosedStyle}>
                            <div className="mapContainer">
                                <GoogleMap updateSidebar = {this.updateSidebar}/>
                            </div>
                        </div>
                    </div>
                );
        }
    }
}

ReactDOM.render(<Application/>, document.querySelector("#application"));
