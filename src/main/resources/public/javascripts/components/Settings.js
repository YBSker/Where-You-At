//var Image = ReactBootstrap.Image;
var DropdownButton = ReactBootstrap.DropdownButton;
var Dropdown = ReactBootstrap.Dropdown;
var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;
var InputGroup = ReactBootstrap.InputGroup;
var FormControl = ReactBootstrap.FormControl;

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** Person props. */
            identifier: 0,
            fullName: "",
            lastSeen: "",
            live: true,
            status: "",
            longitude: 0,
            latitude: 0,
            availability: 0,
            privacy: "",
            /** User props. */
            username: "",
            //TODO: hold up is this safe....
            password: "",
            email: "",
            person_id: 0,
            profilePicture: "",

            person: [],
            user: []
        };
        this.getDefaultPersonState.bind(this);
    }

    /** Fetch and set default person props.
     *  Call this everytime you're about to update state of a person
     * */
    async getDefaultPersonState() {
        /** This block fixes the "Unexpected token I in JSON... error". */
        fetch('/profile')
            .then(res => res.text)
            .then(text => console.log(text));

        let profile = await (await fetch("/profile")).json();

        /** Set state based on information from "profile". */
        this.setState({"identifier": profile['identifier']});
        this.setState({"fullName": profile['fullName']});
        this.setState({"lastSeen": profile['lastSeen']});
        this.setState({"live": profile['live']});
        this.setState({"status": profile['status']});
        this.setState({"longitude": profile['longitude']});
        this.setState({"latitude": profile['latitude']});
        this.setState({"availability": profile['availability']});
        this.setState({"privacy": profile['privacy']});


        //TODO: DETERMINE IF NECESSARY TO GET JSON DATA AS STATE FIRST???

        // this.setState({person: await (await fetch("/profile")).json()});
        // console.log(this.state.person);
        // this.setState
        // for (const test of this.state.person) {
        //     let testarr = {identifier: test.identifier,
        //     fullName: test.fullName,
        //     lastSeen: test.lastSeen,
        //     status: test.status,
        //     longitude: test.longitude,
        //     latitude: test.latitude,
        //     availability: test.availability
        //     };
        // }



        console.trace("Updated person state data from server");
        // let testarr = [];
        // let test = await fetch("/profile").json();
        // this.setState({test: await(await fetch("/profile", {method: "GET"})).json()});

        // let testarr = {identifier: this.state.test.identifier
        // fullName: test.fullName,
        // lastSeen: test.lastSeen,
        // status: test.status,
        // longitude: test.longitude,
        // latitude: test.latitude,
        // availability: test.availability
        // };
        // console.log(testarr.identifier);

        // let obj = JSON.parse(test);
        // let array = obj.response.user;

        // console.log(array);
    }
    /** Fetch and set default user props.
     *  call everytime before update state of user.
     * */

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        //
        // this.setState({
        //     [name]: value
        // });
    }

    render() {
        return (
            <div style={{padding: '25px'}}>


                <header>
                    <h1> Settings </h1>
                </header>

                <button onClick={this.getDefaultPersonState.bind(this)}>Test!</button>

                <DropdownButton id="availability" title="Availability">
                    <Dropdown.Item as="button"> Available </Dropdown.Item>
                    <Dropdown.Item as="button"> Busy </Dropdown.Item>
                    <Dropdown.Item as="button"> Do not disturb </Dropdown.Item>
                </DropdownButton>

                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Button</Button>
                    </InputGroup.Append>
                </InputGroup>

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
                        <Form.Control type="text" placeholder="Enter something about yourself"
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>


            </div>

        );
    }
}







