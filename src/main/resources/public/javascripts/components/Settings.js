//var Image = ReactBootstrap.Image;
var DropdownButton = ReactBootstrap.DropdownButton;
var Dropdown = ReactBootstrap.Dropdown;
var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            availability: "",
            location: ""
        };
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div style={{padding: '25px'}}>



                <header>
                    <h1> Settings </h1>
                </header>

                <DropdownButton id="availability" title="Availability">
                    <Dropdown.Item as="button"> Available </Dropdown.Item>
                    <Dropdown.Item as="button"> Busy </Dropdown.Item>
                    <Dropdown.Item as="button"> Do not disturb </Dropdown.Item>
                </DropdownButton>

                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Edit your name" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Edit your password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Edit your username" onChange={this.handleChange}/>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control type="text" placeholder="Enter something about yourself" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>


            </div>

        );
    }
}







