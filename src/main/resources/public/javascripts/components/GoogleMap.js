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
        this.setState({ myFriends: await (await fetch("/friends")).json() });

        //add friends markers to the map
        {this.state.myFriends.map(item => (
            new window.google.maps.Marker({
                position: {lat: item.latitude, lng: item.longitude},
                map: this.map,
                label: item.fullName
            })
        ))}
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
                    zoom: 11
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
        const formData = new F
        fetch("/time", {method: "PUT", body: formData})

    }


    render() {
        return (
            <div style={{ width: screenWidth, height: screenHeight }} id="map" />
        );
    }
}