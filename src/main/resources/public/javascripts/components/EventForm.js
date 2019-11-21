var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: '',
            longitude: '',
            latitude: '',
            time: '',
            peopleInvited: '',
            peopleGoing: '',
            invites: [],
            validated: false,
            created: false,
            formInvalid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    getLocation = async () => {
        try {
            const address = this.state.address.split(" ").join("+");
            const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBPAVxV62gRRQO8EJlnK3JtcGFuV7X5tnw");
            const body = await response.json();
            const location = body.results[0].geometry.location;
            this.setState({longitude: location.lng.toString()});
            this.setState({latitude: location.lat.toString()});
        }
        catch (error) {
            console.log(error);
        }
    }

    handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            this.setState({validated: true});
            if (this.state.name && this.state.address && this.state.time && this.state.longitude && this.state.latitude) {
                const formData = new FormData();
                formData.append("name", this.state.name);
                formData.append("description", this.state.description);
                formData.append("place", this.state.address);
                formData.append("longitude", this.state.longitude);
                formData.append("latitude", this.state.latitude);
                formData.append("startTime", this.state.time);
                fetch("event/create", {method: "POST", body: formData});
                this.setState({created: true});
                this.setState({formInvalid: false});
            }
            else {
                this.setState({formInvalid: true});
                if (this.state.validated) {this.setState({validated: false})}
                if (!this.state.longitude || !this.state.latitude) {this.setState({address: ''})}
            }
        }
    }

    onNewEvent = () => {
        this.setState({created: false});
        this.setState({validated: false});
        this.setState({formInvalid: false});
        this.setState({name: ''});
        this.setState({description: ''});
        this.setState({address: ''});
        this.setState({longitude: ''});
        this.setState({latitude: ''});
        this.setState({time: ''});
        this.setState({invites: []});
    }

    render() {
        const eventCreated = <div><h6>Event Created!</h6><Button variant="primary" onClick={this.onNewEvent}>Make Another Event!</Button></div>

        const invalidMessage = <h6>Event was not created, please make sure you filled out all fields and pressed Load Address Location! Then submit again!</h6>

        const loadButton = <Button variant="primary" onClick={this.getLocation}>Load Address Location</Button>

        const reloadButton = <div><Button variant="primary" onClick={this.getLocation}>Reload Address Location</Button><h6>Success!</h6></div>

        return (
            <Form style={{padding: '25px'}} noValidate validated={this.state.validated}>
                <Form.Group controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required value={this.state.name}type="text" placeholder="Enter your event name" onChange={(e)=>{this.setState({name: e.target.value})}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={this.state.description} type="text" placeholder="Write a description" onChange={(e)=>{this.setState({description: e.target.value})}}/>
                </Form.Group>

                <Form.Group controlId="validationCustom01">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required value={this.state.address} type="text" placeholder="Enter the event location" onChange={(e)=>{this.setState({address: e.target.value})}}/>
                    <Form.Control.Feedback>Please make sure this is a real and valid address. Then press Load Address Location.</Form.Control.Feedback>
                    {this.state.longitude ? reloadButton : loadButton}
                </Form.Group>

                <Form.Group controlId="validationCustom01">
                    <Form.Label>Time</Form.Label>
                    <Form.Control required value={this.state.time} type="text" placeholder="Enter when your event takes place" onChange={(e)=>{this.setState({time: e.target.value})}}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Send Invites</Form.Label>
                    <Form.Control value={this.state.invites} type="text" placeholder="Enter friends you want to invite" onChange={(e)=>{this.setState({invites: e.target.value})}}/>
                </Form.Group>
                {this.state.formInvalid ? invalidMessage : null}
                {this.state.created ? eventCreated : (<Button onClick={this.handleSubmit}>Submit</Button>) }
            </Form>
        );
    }

}