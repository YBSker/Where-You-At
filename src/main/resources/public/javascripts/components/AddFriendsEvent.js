var DropdownButton = ReactBootstrap.DropdownButton;
var Dropdown = ReactBootstrap.Dropdown;
var Button = ReactBootstrap.Button;

class AddFriendsEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myFriends: [],
            personID: '',
            eventID: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let friends = [];
        fetch("/friends")
            .then(response => {
                return response.json();
            }).then(data => {
            friends = data.results.map((person) => {
                return person
            });
            console.log(friends);
            this.setState({
                myFriends: friends,
            });
        });
    }


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    handleSelect = (eventKey, event) => {
        console.log(eventKey);
        // const formData = new FormData();
        // formData.append("personID", this.state.personID);
        // formData.append("eventID", this.state.eventID);
        // await fetch("eventAttendance", {method: "POST", body: formData});
    };

    render() {

        return(
            <div className="side" style={{padding: '25px'}}>
                <header>
                    <h5>Add friends to your event</h5>
                </header>

                <DropdownButton>
                    {this.state.myFriends.map(person => (
                        <Dropdown.item eventKey = "person.identifier" onSelect={(eventKey, event)=>this.handleSelect(eventKey, event)}> {person.name} </Dropdown.item>
                    ))}
                </DropdownButton>

                <div>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </div>

            </div>
        )
    }
}
