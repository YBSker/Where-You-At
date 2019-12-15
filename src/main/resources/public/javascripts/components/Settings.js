//var Image = ReactBootstrap.Image;
// import React from "react";

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

            editName: "",
            editStatus: "",

            failedSubmit: false,
            emptySubmit: false
        };
        this.getDBPersonState.bind(this);
    }

    /** Fetch and set default person props.
     *  Call this everytime you're about to update state of a person
     * */
    async getDBPersonState() {
        /** This block fixes the "Unexpected token I in JSON... error". */
        fetch('/profile')
            .then(res => res.text);
            // .then(text => console.log(text));

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

        // console.trace("Updated person state data from server");
    }

    /* Function for actual for submission. */
    async submitForm() {
        const formData = new FormData();
        formData.append("identifier", this.state.identifier);
        formData.append("fullName", this.state.fullName);
        formData.append("lastSeen", this.state.lastSeen);
        formData.append("live", this.state.live);
        formData.append("status", this.state.status);
        formData.append("longitude", this.state.longitude);
        formData.append("latitude", this.state.latitude);
        formData.append("availability", this.state.availability);
        formData.append("privacy", this.state.privacy);
        await fetch("updateProfile", {method: "PUT", body: formData})
            .then(function (response) {
                if (response.status !== 204) {
                    this.setState({failedSubmit: true})
                }
            }.bind(this));
        // console.trace("Submitted updated form data.");
    }

    async handleNameUpdate() {
        await this.getDBPersonState();
        /* Check if there was no submission data. */
        if (this.state.editName === "") {
            this.setState({emptySubmit: true});
            return;
        } else {
            this.setState({emptySubmit: false});
        }
        this.setState({fullName: this.state.editName});
        this.submitForm();
    }

    async handleStatusUpdate() {
        await this.getDBPersonState();
        /* Check if there was no submission data. */
        if (this.state.editStatus === "") {
            this.setState({emptySubmit: true});
            return;
        } else {
            this.setState({emptySubmit: false});
        }
        this.setState({status: this.state.editStatus});
        this.submitForm();
    }

    //TODO: Get "User" info once route is setup.
    /** Fetch and set default user props.
     *  call everytime before update state of user.
     * */
    // async getDefaultUserState() {
    // }

    //TODO: Delete?
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        //
        // this.setState({
        //     [name]: value
        // });
    }

    test() {
        console.log(this.state.editName);
    }

    render() {

        const successMessage = <h6>Information Submitted!</h6>;

        const emptySubmitMessage = <h6>Please do not submit an empty field!</h6>;

        const failedSubmitMessage = <h6>Something went wrong with submission...</h6>;

        // const changeNameButton = <Button variant="primary"
        //     // onClick={this.getDefaultPersonState.bind(this)}
        //                                  onClick={this.test.bind(this)}>Submit</Button>;

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

                <div className={"Edit Name"}>
                    <Form.Label>Name</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Edit your name"
                            aria-label="Edit your name"
                            id="Edit Name"
                            // aria-describedby="basic-addon2"
                            onChange={(e) => {
                                this.setState({editName: e.target.value})
                            }}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary"
                                    type="submit"
                                    onClick={this.handleNameUpdate.bind(this)}
                            >Submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.emptySubmit ? emptySubmitMessage : null}
                    {this.state.failedSubmit ? failedSubmitMessage : null}
                </div>

                <div className={"Edit Status"}>
                    <Form.Label>Status</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Edit your status"
                            aria-label="Edit your status"
                            id="Edit Status"
                            // aria-describedby="basic-addon2"
                            onChange={(e) => {
                                this.setState({editStatus: e.target.value})
                            }}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary"
                                    type="submit"
                                    onClick={this.handleStatusUpdate.bind(this)}
                            >Submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.emptySubmit ? emptySubmitMessage : null}
                    {this.state.failedSubmit ? failedSubmitMessage : null}
                </div>

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







