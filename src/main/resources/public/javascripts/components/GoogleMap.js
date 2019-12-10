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
        console.trace("called getFriendsFromServer");
        this.setState({ myFriends: await (await fetch("/friends")).json() });

        //add friends markers to the map

        let markers = this.resolveMarkerLabels(this.bucketize(this.state.myFriends));

        for (const marker of markers) {
            const m = new window.google.maps.Marker({
                position: {lat: marker.latitude, lng: marker.longitude},
                map: this.map,
                label: marker.label
            });

            window.google.maps.event.addDomListener(m, 'click', () => {
                this.populateSidebar(m.getPosition().lat(), m.getPosition().lng());
            });
        }
    }

    resolveMarkerLabels(markers) {
        for (const marker of markers) {
            if (marker.numPeople > 1) {
                marker.label = marker.numPeople.toString();
            }
        }
        return markers;
    }

    bucketize(friends) {
        let markers = [];
        for (const friend of friends) {
            let duplicate = false;
            for (const marker of markers) {
                if (friend.latitude === marker.latitude && friend.longitude === marker.longitude) {
                    duplicate = true;
                    marker.numPeople++;
                    break;
                }
            }

            if (!duplicate) {
                let marker = {label: friend.fullName,
                              numPeople: 1,
                              latitude: friend.latitude,
                              longitude: friend.longitude};
                markers.push(marker);
            }
        }
        return markers;
    }

    populateSidebar(lat, lng) {
        console.log(lat);
        console.log(lng);
        let clickedFriends = [];
        for (const friend of this.state.myFriends) {
            if (friend.latitude === lat && friend.longitude === lng) {
                clickedFriends.push(friend);
            }
        }
        console.log(clickedFriends);
    }

    async getLocation() {
        //updating current location
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({userLocation: {lat: pos.coords.latitude, lng: pos.coords.longitude}});
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
                    for (let i in results[0].address_components) {
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
            if (status === 'OK') {
                let marker = new window.google.maps.Marker({
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