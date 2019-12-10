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

        let buckets = this.bucketize(this.state.myFriends);
        buckets = this.resolveMarkerLabels(buckets);

        console.trace(buckets);
        for (const mark of buckets) {
            console.trace("adding marker");
            const m = new window.google.maps.Marker({
                position: {lat: mark.latitude, lng: mark.longitude},
                map: this.map,
                label: mark.fullName
            });

            window.google.maps.event.addDomListener(m, 'click', () => {
                this.populateSidebar(m.getPosition().lat(), m.getPosition().lng());
            });
        }
    }

    resolveMarkerLabels(markers) {
        for (const marker of markers) {
            if (marker.num > 1) {
                marker.fullName = marker.num.toString();
            }
        }
        return markers;
    }

    bucketize(friends) {
        let buckets = [];
        for (const friend of friends) {
            let duplicate = false;
            for (const marker of buckets) {
                if (friend.latitude === marker.latitude && friend.longitude === marker.longitude) {
                    duplicate = true;
                    marker.num++;
                    marker.fullName = "";
                    break;
                }
            }

            if (!duplicate) {
                friend.num = 1;
                buckets.push(friend)
            }
        }
        return buckets;
    }

    populateSidebar(lat, lng) {
        console.log(lat);
        console.log(lng);
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