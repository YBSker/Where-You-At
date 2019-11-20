var Nav = ReactBootstrap.Nav;

const SIDEBAR_STATE = {
    closed: 0,
    event: 1,
    cardList: 2,
    settings: 3,
};

class NavigationBar extends React.Component {
    render(){
        return (
            <Nav
                activeKey="/home"
                onSelect={selectedKey => {switch(selectedKey) {
                    case "HOME":
                    default:
                        this.props.updateSidebar(SIDEBAR_STATE.closed);
                        break;
                    case "EVENTS":
                        this.props.updateSidebar(SIDEBAR_STATE.event);
                        break;
                    case "NEARBY":
                        this.props.updateSidebar(SIDEBAR_STATE.cardList);
                        break;
                    case "SETTINGS":
                        this.props.updateSidebar(SIDEBAR_STATE.settings);
                        break;
                }}}
            >
                <Nav.Item>
                    <Nav.Link eventKey="HOME">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="EVENTS">Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="NEARBY">Nearby</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="SETTINGS">Settings</Nav.Link>
                </Nav.Item>
            </Nav>

        );
    }

}


