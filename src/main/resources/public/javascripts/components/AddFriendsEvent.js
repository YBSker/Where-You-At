class AddFriendsEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFriends: [],
        };
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    getFriendsFromServer = async() => {
        this.setState({ myFriends: await (await fetch("/friends")).json() });
    };

    addOneFriend = async() => {
        const formData = new FormData();
        // formData.append("oldpassword", this.state.oldPass);
        // formData.append("newpassword", this.state.newPass);
        await fetch("eventAttendance", {method: "POST", body: formData});
    };

    handleSubmit = async(event) => {

        await this.addOneFriend();
    };

    render() {

        return(
            <div className="side" style={{padding: '25px'}}>
                <header>
                    <h5>Add friends to your event</h5>
                </header>

                <div>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </div>

            </div>
        )
    }
}
