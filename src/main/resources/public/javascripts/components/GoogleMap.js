const SIDEBAR_STATE = {
    closed: 0,
    event: 1,
    cardList: 2,
    settings: 3,
};

const screenHeight = 400;
const screenWidth = 800;

class GoogleMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: {
                lat: 0,
                lng: 0
            },
            myFriends: [],
        }
    }

    async getFriendsFromServer() {
        this.setState({ myFriends: await (await fetch("/friends")).json() });
        window.setTimeout(() => { this.getFriendsFromServer(); }, 200);
    }

    async getLocation() {
        //updating current location
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({userLocation: {lat: pos.coords.latitude, lng: pos.coords.longitude}})
            })
        }
    }

    async componentDidMount() {
        await this.getLocation();
        await this.getFriendsFromServer();

        //create map
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.state.userLocation,
            zoom: 11
        });

        //add user's marker to map
        new window.google.maps.Marker({
            position: this.state.userLocation,
            map: this.map,
            label: "Me"
        });

        //add friends markers to the map
        {this.state.myFriends.map(item => (
            new window.google.maps.Marker({
                position: {lat: item.latitude, lng: item.longitude},
                map: this.map,
                label: item.fullName
            })
        ))}

    };

    render() {
        return (
            <div style={{ width: screenWidth, height: screenHeight }} id="map" />
        );
    }
}