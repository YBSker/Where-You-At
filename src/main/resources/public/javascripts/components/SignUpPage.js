
class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user_exists: false,
            range: "town"
        }
    }

    handleSignUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(this.state.username);
        console.log(this.state.password);
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        formData.append("live","True");
        formData.append("availability", "1");
        formData.append("privacy", "0");
        formData.append("longitude","-76.634000");
        formData.append("latitude","39.32932");
        if (this.state.username && this.state.password) {
            fetch("/register", {method: "POST", body: formData}).then(function (response) {
                if (response.status === 409) {
                    this.setState({user_exists: true});
                } else {
                    console.log("user successfully created");
                    this.setState({user_exists: false});
                    this.props.logIn(true);
                    this.props.signUp(false);
                }
            }.bind(this));
        }
    }

    handleChange = (e) => {
        this.setState({range: e.target.value});
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-div">
                    <div className="login-side">
                        <form className="login-form" onSubmit={this.handleSignUp}>
                            <input required type="text" placeholder="username" onChange={(event)=>this.setState({username: event.target.value})}/>
                            <input required type="password" placeholder="password" onChange={(event)=>this.setState({password: event.target.value})}/>
                            {this.state.user_exists ? <div>This username already exists, please choose another username</div>: null}
                            <button type="submit">Sign Up</button>
                        </form>
                        <div className="logo">
                            <h1>Where<br/>You<br/>At</h1>
                        </div>
                        <form>
                            <p>Please choose your desired privacy range: </p>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="town" checked={this.state.range === 'town'} onChange={this.handleChange}/>
                                    Town
                                </label>
                                <label>
                                    <input type="radio" value="city" checked={this.state.range === 'city'} onChange={this.handleChange}/>
                                    City
                                </label>
                                <label>
                                    <input type="radio" value="state" checked={this.state.range === 'state'} onChange={this.handleChange}/>
                                    State
                                </label>
                                <label>
                                    <input type="radio" value="country" checked={this.state.range === 'country'} onChange={this.handleChange}/>
                                    Country
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
}