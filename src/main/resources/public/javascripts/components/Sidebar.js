class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Baltimore',
            cards: [],
        };
    }

    render() {
        const pfp = "https://i.imgur.com/u31EyPE.jpg";
        const cardsRender = this.props.friends.map((friend) => {
            friend.pfp = pfp; //TODO Delete this once pfp's in the database are working
            if (!friend.status || friend.status === "") {
                friend.status = "User has not updated their status.";
            }

            if (!friend.lastSeen || friend.lastSeen === "") {
                friend.lastSeenPrintout = "Could not find last seen time.";
            } else {
                //TODO calculate last seen time from current time - lastSeen time;
                friend.lastSeenPrintout = "last seen " + /*calc*/ + " ago";
            }

            return([
                <li className="wyacard">
                    <div className="pfp-container"><img src= {friend.pfp} alt={friend.fullName}/></div>
                    <div className="info">
                        <div className="name"><h2 className="name-text">{friend.fullName}</h2></div>
                        <div className="last-seen"><p className="last-seen-text"><i>{friend.lastSeenPrintout}</i></p></div>
                        <div className="status"><p className="status-text">{friend.status}</p>
                        </div>
                    </div>
                </li>]);
        });


        return (
            <div className="side">
                <div className="side-header">
                    <h1 className="side-header-text">{this.state.location}</h1>
                </div>
                <ul className="card-list">
                    {cardsRender}
                </ul>
            </div>
        );
    }
}