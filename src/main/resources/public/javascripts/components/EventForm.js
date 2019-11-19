var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: '',
            time: '',
            peopleInvited: '',
            peopleGoing: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        const formData = new FormData();
        formData.append("name", "Test Event");
        formData.append("description", "This event is fake");
        formData.append("longitude", "-76.634000");
        formData.append("latitude", "39.32932");
        fetch("http://localhost:7000/event", { method: "POST", body: formData}).then(()=> alert("Clicked"));
        console.log("Event Submitted")
    }

    render() {
        return (
            <Form style={{padding: '25px'}}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your event name" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Write a description" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter the event location" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="text" placeholder="Enter when your event takes place" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Send Invites</Form.Label>
                    <Form.Control type="text" placeholder="Enter friends you want to invite" onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </Form>
        );
    }

}
