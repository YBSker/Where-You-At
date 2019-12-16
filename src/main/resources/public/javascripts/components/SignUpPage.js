
class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            user_exists: false,
            display_name: "",
            range: "neighborhood"
        }
    }

    handleSignUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.display_name);
        console.log(this.convertToEnglish(this.state.range));
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        formData.append("fullName", this.state.name);
        formData.append("live","True");
        formData.append("availability", "1");
        formData.append("privacy", this.convertToEnglish(this.state.range));
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
        this.props.setRange(e.target.value);
        this.setState({range: e.target.value});
    }

    convertToEnglish(range) {
        let new_range = "";
        if (!range) {
            return null;
        }
        if (range === "neighborhood") {
            return new_range = "neighborhood"
        }
        if (range === "postal_code") {
            return new_range = "postal_code"
        }
        if (range === "locality") {
            return new_range = "locality"
        }
        if (range === "administrative_area_level_1") {
            return new_range = "administrative_area_level_1"
        }
    }


    render() {
        return (
            <div className="login-wrapper">
                <div className="login-div">
                    <div className="login-side">
                        <form className="login-form" onSubmit={this.handleSignUp}>
                            <input required type="text" placeholder="username" onChange={(event)=>this.setState({username: event.target.value})}/>
                            <input required type="password" placeholder="password" onChange={(event)=>this.setState({password: event.target.value})}/>
                            <input required type="text" placeholder="display name" onChange={(event)=>this.setState({display_name: event.target.value})} />
                            {this.state.user_exists ? <div>This username already exists, please choose another username</div>: null}
                            <button type="submit">Sign Up</button>
                        </form>
                        <div className="logo">
                            <h1>Where<br/>You<br/>At</h1>
                        </div>
                        <form>
                            <br />
                            <p>Please choose your desired privacy range: </p>
                            <div className="row">
                                <div class="col-sm-3">
                                    <label>
                                        <input type="radio" value="neighborhood" checked={this.state.range === 'neighborhood'} onChange={this.handleChange}/>
                                        Neighborhood
                                    </label>
                                </div>
                                <div className="col-sm-3">
                                    <label>
                                        <input type="radio" value="postal_code" checked={this.state.range === 'postal_code'} onChange={this.handleChange}/>
                                        Town
                                    </label>
                                </div>
                                <div className="col-sm-3">
                                    <label>
                                        <input type="radio" value="locality" checked={this.state.range === 'locality'} onChange={this.handleChange}/>
                                        City
                                    </label>
                                </div>
                                <div className="col-sm-3">
                                    <label>
                                        <input type="radio" value="administrative_area_level_1" checked={this.state.range === "administrative_area_level_1"} onChange={this.handleChange}/>
                                        State
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
}