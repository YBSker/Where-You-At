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
            privacy: "neighborhood",
            //privacy options are "neighborhood", "postal_code", "locality" (city), "administrative_area_level_1" (state)
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


    //Rounding due to weird floating point errors from GoogleMaps
    roundCoordinate(n) {
        return Math.floor(n * (10 ** 5));
    }

    sameCoordinate(latA, lngA, latB, lngB) {
        return Math.abs(latA - latB) < 5 && Math.abs(lngA - lngB) < 5;
    }

    populateSidebar(lat, lng) {
        const roundedLat = this.roundCoordinate(lat);
        const roundedLng = this.roundCoordinate(lng);

        let clickedFriends = [];
        for (const friend of this.state.myFriends) {
            const roundedFriendLat = this.roundCoordinate(friend.latitude);
            const roundedFriendLng = this.roundCoordinate(friend.longitude);
            if (this.sameCoordinate(roundedLat, roundedLng, roundedFriendLat, roundedFriendLng)) {
                clickedFriends.push(friend);
            }
        }
        this.props.updateSidebar(SIDEBAR_STATE.cardList, clickedFriends);
    }

    async getLocation() {
        //updating current location
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({userLocation: {lat: pos.coords.latitude, lng: pos.coords.longitude}});

                var myLocation = {lat: pos.coords.latitude, lng: pos.coords.longitude};

                //create map centered at myLocation
                this.map = new window.google.maps.Map(document.getElementById('map'), {
                    center: myLocation,
                    zoom: 11,
                    disableDefaultUI: true
                });

                //add user's marker to map at myLocation
                new window.google.maps.Marker({
                    position: myLocation,
                    map: this.map,
                    label: "Me"
                });

                this.getFriendsFromServer();
                this.reverseGeocode(myLocation);
            })
        }
    }

    async componentDidMount() {
        await this.getLocation();
        this.updateTime();
        console.log(this.props.range);
    };


    //reverse geocode: latlng to approx place, then get latlng of approx place
    reverseGeocode(myLocation) {
        let geocoder = new window.google.maps.Geocoder;
        geocoder.geocode({'location': myLocation}, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    for (var i in results[0].address_components) {
                        if (this.state.privacy === results[0].address_components[i].types[0]) {
                            var address = (results[0].address_components[i].long_name).toString();

                            //get lat and lng from place
                            console.log("reverseGeocode: " + address);
                            this.geocode(address)
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
    geocode(address) {
        let geocoder = new window.google.maps.Geocoder;
        //console.log("Geocode: " + address);
        geocoder.geocode( { 'address': address}, (results, status) => {
            if (status == 'OK') {
                var marker = new window.google.maps.Marker({
                    map: this.map,
                    position: results[0].geometry.location,
                    label: "approx"
                });
                console.log("geocode: " +  results[0].geometry.location);

                //TODO: send approx latlng to database
                //TODO:

            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

    }

    updateTime() {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        console.log(date);
        const formData = new FormData();
        // formData.append("time", date);
        // fetch("/time", {method: "PUT", body: formData})
    }


    render() {
        return (
            <div style={{ width: "100%", height: "calc(100% - 32px)" }} id="map" />
        );
    }
}