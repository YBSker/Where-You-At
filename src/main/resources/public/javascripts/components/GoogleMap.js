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
            privacy: 0,
            region_array: [],
            region: "neighborhood",
            place: "",
            geocodelatlng: {
                lat: 0,
                lng: 0
            },
        }
    }

    async getFriendsFromServer() {
        this.setState({ myFriends: await (await fetch("/friends")).json() });
        window.setTimeout(() => { this.getFriendsFromServer(); }, 200);

        //add friends markers to the map

        for (const friend of this.state.myFriends) {
            const m = new window.google.maps.Marker({
                position: {lat: friend.latitude, lng: friend.longitude},
                map: this.map,
                label: friend.fullName
            });

            window.google.maps.event.addDomListener(m, 'click', function() {
                console.log("hello!");
            });
        }
    }

    async getLocation() {

        //updating current location
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({userLocation: {lat: pos.coords.latitude, lng: pos.coords.longitude}})
                //console.log(pos.coords)

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

                this.getFriendsFromServer();

            })
        }
    }

    async componentDidMount() {
        await this.getLocation();


        // this.reverseGeocode();
        // this.geocode();

    };


    //reverse geocode: lat,long to address
    reverseGeocode(address, fn) {
        let geocoder = new window.google.maps.Geocoder;
        geocoder.geocode({'location': this.state.userLocation}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    for (var i in results[0].address_components) {
                        if (this.state.region === results[0].address_components[i].types[0]) {
                            console.log(results[0].address_components[i].short_name);
                            this.setState(() => {
                                return {
                                    place: results[0].address_components[i].short_name,
                                };
                            });
                        }
                    }
                } else {
                    window.alert('reverseGeocoder: No results found');
                }
            } else {
                window.alert('reverseGeocoder failed due to: ' + status);
            }
        });
    }

    //gets lat and long given the address
    geocode() {
        var geocoder = new window.google.maps.Geocoder;
        console.log(this.state.place);

        geocoder.geocode( { 'address': this.state.place}, (results, status) => {
            if (status == 'OK') {
                var marker = new window.google.maps.Marker({
                    map: this.map,
                    position: results[0].geometry.location,
                    label: "approx"
                });
                this.setState(() => {
                    return {
                        geocodelatlng: results[0].geometry.location,
                    };
                });

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    render() {
        return (
            <div style={{ width: screenWidth, height: screenHeight }} id="map" />
        );
    }

}