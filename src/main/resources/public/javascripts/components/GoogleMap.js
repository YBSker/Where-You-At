const SIDEBAR_STATE = {
    closed: 0,
    event: 1,
    cardList: 2,
    settings: 3,
};

let userPlace = "";
let newLocation = {lat: 0, lng: 0};
let region_arr = [];
const api_key = 'AIzaSyBPAVxV62gRRQO8EJlnK3JtcGFuV7X5tnw';

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
        this.getLocation();
        this.getFriendsFromServer();
        console.log(this.state.myFriends);


        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.state.userLocation,
            zoom: 11
        });

        this.myMarker = new window.google.maps.Marker({
            position: this.state.userLocation,
            map: this.map,
            label: "Me"
        });

        {this.state.myFriends.map(name => (
            new window.google.maps.Marker({
                position: name.pos,
                map: this.map,
                label: name.id
            })
        ))}

    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.userLocation !== this.state.userLocation) {
            this.recenterMap();
        }
        if (prevState.myFriends !== this.state.myFriends){
            this.printFriends();
        }
    }

    printFriends() {
        console.log(this.state.myFriends)
    }

    recenterMap() {
        let newCenter = new window.google.maps.LatLng(this.state.userLocation.lat, this.state.userLocation.lng);
        if (this.map && this.myMarker) {
            this.map.panTo(newCenter);
            this.myMarker.setPosition(newCenter);
        }
    }

    render() {
        return (
            <div style={{ width: screenWidth, height: screenHeight }} id="map" />
        );
    }
}