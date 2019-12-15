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
            // //TODO: hold up is this safe....
            email: "",
            profilePicture: "",

            editName: "",
            editStatus: "",
            editEmail: "",
            editPic: "",

            selectedAvailBut: null,

            failedSubmit: false,
            emptySubmit: false
        };
        this.getDBPersonState.bind(this);
    }

    /** Fetches privacy data before the page renders! */
    componentDidMount() {
        const that = this;
        fetch("/profile")
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                that.setState({privacy: jsonData['privacy']})
            });
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

    /** Fetch and set default user props.
     *  call everytime before update state of user.
     * */
    async getDBUserState() {
        let user = await (await fetch("/updateAccount", {method: "GET"})).json();
        /** Set state based on information from "profile". */
        this.setState({"email": user['email']});
        this.setState({"profilePicture": user['profilePicture']});
    }

    /* Function for actual for submission. */
    async submitProfileForm() {
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
    async submitUserForm() {
        const formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("profilePicture", this.state.profilePicture);
         await fetch("updateAccount", {method: "PUT", body: formData})
            .then(function (response) {
                if (response.status !== 204) {
                    this.setState({failedSubmit: true})
                }
            }.bind(this));
        // console.trace("Submitted updated user form data.");
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
        this.setState({editName: ""});
        this.submitProfileForm();
        document.getElementById('Edit_Name').value = ''
    }

    async handleAvailabilityUpdate(num) {
        await this.getDBPersonState();
        /* Check if there was no submission data. */
        this.setState({availability: num});
        await this.submitProfileForm();
    }

    async handlePrivacyUpdate(str) {
        await this.getDBPersonState();
        /* Check if there was no submission data. */
        this.setState({privacy: str});
        await this.submitProfileForm();
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
        this.setState({editStatus: ""});
        this.submitProfileForm();
        document.getElementById('Edit_Status').value = '';
    }

    async handleEmailUpdate() {
        await this.getDBUserState();
        /* Check if there was no submission data. */
        if (this.state.editEmail === "") {
            this.setState({emptySubmit: true});
            return;
        } else {
            this.setState({emptySubmit: false});
        }
        this.setState({email: this.state.editEmail});
        this.setState({editEmail: ""});
        this.submitUserForm();
        document.getElementById('Edit_Email').value = '';
    }

    async handleProfPicUpdate() {
        await this.getDBUserState();
        /* Check if there was no submission data. */
        if (this.state.editPic === "") {
            this.setState({emptySubmit: true});
            return;
        } else {
            this.setState({emptySubmit: false});
        }
        this.setState({profilePicture: this.state.editPic});
        this.setState({editPic: ""});
        this.submitUserForm();
        document.getElementById('Edit_Picture').value = '';
    }

    //TODO: DELETE THIS
    test() {
        console.log(this.state.privacy);
    }

    render() {

        const successMessage = <h6>Information Submitted!</h6>;

        const emptySubmitMessage = <h6>Please do not submit an empty field!</h6>;

        const failedSubmitMessage = <h6>Something went wrong with submission...</h6>;

        /** Render different selected AVAILABILITY dropdowns depending on availability state. */
        const selectedAvailAvailable = <DropdownButton id="availability" title="Availability">
            <Dropdown.Item active as="button"
                           onClick={this.handleAvailabilityUpdate.bind(this, 0)}> Available </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleAvailabilityUpdate.bind(this, 1)}> Busy </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleAvailabilityUpdate.bind(this, 2)}> Do not
                disturb </Dropdown.Item>
        </DropdownButton>;
        const selectedAvailBusy = <DropdownButton id="availability" title="Availability">
            <Dropdown.Item as="button" onClick={this.handleAvailabilityUpdate.bind(this, 0)}> Available </Dropdown.Item>
            <Dropdown.Item active as="button"
                           onClick={this.handleAvailabilityUpdate.bind(this, 1)}> Busy </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleAvailabilityUpdate.bind(this, 2)}> Do not
                disturb </Dropdown.Item>
        </DropdownButton>;
        const selectedAvailDnD = <DropdownButton id="availability" title="Availability">
            <Dropdown.Item as="button" onClick={this.handleAvailabilityUpdate.bind(this, 0)}> Available </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handleAvailabilityUpdate.bind(this, 1)}> Busy </Dropdown.Item>
            <Dropdown.Item active as="button" onClick={this.handleAvailabilityUpdate.bind(this, 2)}> Do not
                disturb </Dropdown.Item>
        </DropdownButton>;


        /** Render different selected PRIVACY dropdowns depending on privacy state. */
        const selectedPrivNeighborhood = <DropdownButton id="privacy" title="Privacy Range">
            <Dropdown.Item active as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "neighborhood")}> Neighborhood </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "town")}> Town </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "city")}> City </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "state")}> State </Dropdown.Item>
        </DropdownButton>;
        const selectedPrivTown = <DropdownButton id="privacy" title="Privacy Range">
            <Dropdown.Item as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "neighborhood")}> Neighborhood </Dropdown.Item>
            <Dropdown.Item active as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "town")}> Town </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "city")}> City </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "state")}> State </Dropdown.Item>
        </DropdownButton>;
        const selectedPrivCity = <DropdownButton id="privacy" title="Privacy Range">
            <Dropdown.Item as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "neighborhood")}> Neighborhood </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "town")}> Town </Dropdown.Item>
            <Dropdown.Item active as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "city")}> City </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "state")}> State </Dropdown.Item>
        </DropdownButton>;
        const selectedPrivState = <DropdownButton id="privacy" title="Privacy Range">
            <Dropdown.Item as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "neighborhood")}> Neighborhood </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "town")}> Town </Dropdown.Item>
            <Dropdown.Item as="button" onClick={this.handlePrivacyUpdate.bind(this, "city")}> City </Dropdown.Item>
            <Dropdown.Item active as="button"
                           onClick={this.handlePrivacyUpdate.bind(this, "state")}> State </Dropdown.Item>
        </DropdownButton>;


        return (
            <div style={{padding: '25px'}}>
                <header>
                    <h1> Settings </h1>
                </header>

                {this.state.availability === 0 ? selectedAvailAvailable : null}
                {this.state.availability === 1 ? selectedAvailBusy : null}
                {this.state.availability === 2 ? selectedAvailDnD : null}


                {this.state.privacy === "neighborhood" ? selectedPrivNeighborhood : null}
                {this.state.privacy === "town" ? selectedPrivTown : null}
                {this.state.privacy === "city" ? selectedPrivCity : null}
                {this.state.privacy === "state" ? selectedPrivState : null}


                <div className={"Edit Name"}>
                    <Form.Label>Name</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Edit your name"
                            aria-label="Edit your name"
                            id="Edit_Name"
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
                            id="Edit_Status"
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

                <div className={"Edit Email"}>
                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Edit your Email"
                            aria-label="Edit your Email"
                            id="Edit_Email"
                            // aria-describedby="basic-addon2"
                            onChange={(e) => {
                                this.setState({editEmail: e.target.value})
                            }}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary"
                                    type="submit"
                                    onClick={this.handleEmailUpdate.bind(this)}
                            >Submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.emptySubmit ? emptySubmitMessage : null}
                    {this.state.failedSubmit ? failedSubmitMessage : null}
                </div>

                <div className={"Edit ProfPic link"}>
                    <Form.Label>Status</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Edit your Picture"
                            aria-label="Edit your Picture"
                            id="Edit_Picture"
                            // aria-describedby="basic-addon2"
                            onChange={(e) => {
                                this.setState({editPic: e.target.value})
                            }}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary"
                                    type="submit"
                                    onClick={this.handleProfPicUpdate.bind(this)}
                            >Submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.emptySubmit ? emptySubmitMessage : null}
                    {this.state.failedSubmit ? failedSubmitMessage : null}
                </div>

            </div>

        );
    }
}







