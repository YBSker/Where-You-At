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
            radius: 100,
            userLocation: {
                lat: 39.32932,
                lng: -76.634000
            },
            userNewLocation: {
                lat: 0,
                lng: 0
            },
            isMarkerShown: false,
            isOpen: false,
            myFriends: [
                {id: "Matt", pos: {lat: 39.33333, lng: -76.634003}, isOpen: false},
                {id: "Vincent", pos: {lat: 39.33234, lng: -76.631021}, isOpen: false},
                {id: "Nick", pos: {lat: 39.31799, lng: -76.629121}, isOpen: false},
                {id: "Stan", pos: {lat: 39.34231, lng: -76.639101}, isOpen: false},
                {id: "Gary", pos: {lat: 39.34231, lng: -76.649101}, isOpen: false}
            ],
            region: "town",
            place: "New York",
            region_array: [],
            myEvents:{}
        }
    }

    async componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: this.state.userLocation,
            zoom: 13
        });

        new google.maps.Marker({
            position: this.state.userLocation,
            map: map,
            label: "Me"
        });

        {this.state.myFriends.map(name => (
            new google.maps.Marker({
                position: name.pos,
                map: map,
                label: name.id
            })
        ))}

        // async function call
        await this.getPlace(this.state.region);
        // updates the User place aka "Baltimore" and Location aka {lat, lng} at center of Baltimore given "city" as function parameter
        this.setState({place: userPlace});
        this.setState({userNewLocation: newLocation});
        this.setState({region_array: region_arr});
        console.log(this.state.region_array);
        this.getCurrentLocation();
        const eventsList = await this.getEvents();
        this.setState({myEvents: eventsList});
        console.log(this.state.myEvents);
        {this.state.myEvents.map(event => (this.displaySingleEvent(event, map)))}
    };

    displaySingleEvent(event, map) {
        const lat = event.latitude;
        const lng = event.longitude;
        const eventName = event.name;
        const location = {lat, lng};
        new google.maps.Marker({position: location, map: map, label: eventName});
    }

    getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        userLocation: {
                            ...prevState.userLocation,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        isMarkerShown: true
                    }))
                }
            )
        }
    };

    handleToggleOpen = (id) => {
        this.props.updateSidebar(SIDEBAR_STATE.cardList);
    };
    handleToggleClosed = (id) => {
        id.setState({
            isOpen: false
        })
    };

    getPlace = async (region) => {
        const usr_lat = this.state.userLocation.lat;
        const usr_lng = this.state.userLocation.lng;
        let area = "";

        // turns region to google api type names
        if (!(region === 'town') || !(region === 'city') || !(region === 'state') || !(region === 'country')) {
            console.log("invalid region")
        }
        if (region === 'town') {
            area = "neighborhood"
        }
        if (region === 'city') {
            area = "locality"
        }
        if (region === 'state') {
            area = "administrative_area_level_1"
        }
        if (region === 'country') {
            area = "country"
        }

        // GOOGLE MAP API CALL
        const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + String(usr_lat) + "," + String(usr_lng) + '&key=' + api_key);
        const body = await response.json();
        console.log(body);
        console.log(body.results);
        let result = body.results;
        console.log(result);

        //searches through the json array for the desired region size, then get the name and location of that region
        let i = 0;
        for (; i < result.length; i++) {
            if (area === result[i].types[0]) {
                userPlace = result[i].address_components[0].long_name;
                newLocation = result[i].geometry.location;
            }
        }
        let j = 0;
        for (; j <result.length; j++) {
            if (result[j].types[0]==="country") {region_arr[0] = result[j].address_components[0].long_name;}
            else if (result[j].types[0]==="administrative_area_level_1") {region_arr[1] = result[j].address_components[0].long_name;}
            else if (result[j].types[0]==="locality") {region_arr[2] = result[j].address_components[0].long_name;}
            else if (result[j].types[0]==="neighborhood") {region_arr[3] = result[j].address_components[0].long_name;}
        }
    };

    getEvents = async() => {
        const response = await fetch("/event",{method: "GET"});
        console.log(response);
        const eventList = await response.json();
        console.log(eventList);
        return eventList;
    }


    render() {
        return (
            <div style={{ width: screenWidth, height: screenHeight }} id="map" />
        );
    }
}