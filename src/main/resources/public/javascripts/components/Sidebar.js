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
            testCard: '',
        };

        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    addCard(card) {
        this.state.cards.push(card);
    }

    removeCard(card) {
        this.setState({cards: this.state.cards.filter(c => c !== card)});
    }


    render() {
        for (const friend of this.props.friends) {
            this.addCard(new SidebarCard({name: friend.fullName}))
        }

        const cards = this.state.cards.map(card => {
            return (<li key={card}>{card}</li>);
        });

        this.setState({testCard: cards[0]});

        console.log(this.state.cards);
        return (
            <div className="side">
                <div className="side-header" style={sideHeaderStyles}>
                    <h1 style={h1Styles}>{this.state.location}</h1>
                </div>
                <ul className="card-list">
                    {this.state.testCard}
                </ul>
            </div>
        );
    }
}

/*

 */