class NavigationBar extends React.Component {
    render() {
        return (
            <Nav
                activeKey="/home"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item>
                    <Nav.Link href="add link to home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="add link to events">Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="add link to settings">Settings</Nav.Link>
                </Nav.Item>
            </Nav>

        );
    }
}