const sideHeaderStyles = {
    textAlign: 'center',
    height: '75px',
    borderRadius: '0 0 25px 25px',
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, .8)'
};

const h1Styles = {
    textTransform: 'uppercase',
    fontFamily: 'futura-pt, sans-serif',
    fontWeight: '700',
    lineHeight: '75px',
    fontSize: '40px',
    letterSpacing: '5px'
};

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Baltimore',
            cards: [],
        };
    }

    render() {
        const cardsRender = this.props.friends.map((friend) => {
            return([
                <li>
                    <div className="pfp-container"><img src={friend.pfp} alt={friend.fullName}/></div>
                    <div className="info">
                        <div className="name"><h2>{friend.fullName}</h2></div>
                        <div className="last-seen"><p><i>last seen {friend.lastseen} min ago</i></p></div>
                        <div className="status"><p>{friend.status}</p>
                        </div>
                    </div>
                </li>]);
        });


        return (
            <div className="side">
                <div className="side-header" style={sideHeaderStyles}>
                    <h1 style={h1Styles}>{this.state.location}</h1>
                </div>
                <ul className="card-list">
                    {cardsRender}
                </ul>
            </div>
        );
    }
}

/*

 */