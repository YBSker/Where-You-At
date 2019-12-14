class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            login_time:'',
            wrong_pass: false,
            user_exists: false,
            logged_in: false,
            username_not_found: false,
            empty_entries: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this.state.username);
        console.log(this.state.password);
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        if (this.state.username && this.state.password) {
            fetch("/login", {method: "POST", body: formData}).then(function (response) {
                if (response.status === 403) {
                    this.setState({wrong_pass: true});
                    this.setState({username_not_found: false});
                    this.props.logIn(false);
                } else if (response.status === 404) {
                    this.setState({username_not_found: true});
                } else {
                    console.log("correct password");
                    this.setState({logged_in: true});
                    this.setState({wrong_pass: false});
                    this.setState({username_not_found: false});
                    this.props.logIn(true);
                }
            }.bind(this));
        }
    }

    handleRegister(e) {
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
                    this.props.logIn(false);
                } else {
                    console.log("user successfully created");
                    this.setState({logged_in: true});
                    this.setState({user_exists: false});
                    this.props.logIn(true);
                }
            }.bind(this));
        }
    }

    render(){
        return (
            <div className="login-wrapper">
                <div className="login-div">
                    <div className="login-side">
                        <form className="login-form" onSubmit={this.handleLogin}>
                            <input required type="text" placeholder="username" onChange={(event)=>this.setState({username: event.target.value})}/>
                            <input required type="password" placeholder="password" onChange={(event)=>this.setState({password: event.target.value})}/>
                            {this.state.username_not_found ? <div>Username does not exist</div> : this.state.wrong_pass ? <div>User exists, but wrong password entered</div> : null}
                            <button type="submit">Log in</button>
                        </form>
                    </div>

                    <div className="logo">
                        <h1>Where<br/>You<br/>At</h1>
                    </div>

                    <div className="register">
                        <form className="register-form" onSubmit={this.handleRegister}>
                            <input required type="text" placeholder="username" onChange={(event)=>this.setState({username: event.target.value})}/>
                            <input required type="password" placeholder="password" onChange={(event)=>this.setState({password: event.target.value})}/>
                            {this.state.user_exists ? <div>This username already exists, please choose another username</div>: null}
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}


