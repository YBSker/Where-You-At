class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            login_time:''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.logIn(true); //Just sending true for now so that things work, you can send actual shit eventually
        console.log(this.state.username);
        console.log(this.state.password);
        const formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        fetch("/login", {method: "POST", body: formData}) //To Do: catch Forbidden error from failed password check
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
        formData.append("longitude","0.0");
        formData.append("latitude","0.0");
        fetch("/register", {method: "POST", body: formData})
    }


    render(){
        return (
            <div className="login-wrapper">
                <div className="login-div">
                    <div className="login-side">
                        <form className="login-form" onSubmit={this.handleLogin}>
                            <input type="text" placeholder="username" onChange={(event)=>this.setState({username: event.target.value})}/>
                            <input type="password" placeholder="password" onChange={(event)=>this.setState({password: event.target.value})}/>
                            <button type="submit">Log in</button>
                        </form>
                    </div>

                    <div className="logo">
                        <h1>Where<br/>You<br/>At</h1>
                    </div>

                    <div className="register">
                        <form className="register-form" onSubmit={this.handleRegister}>
                            <input type="text" placeholder="username" onChange={(event)=>this.setState({username: event.target.value})}/>
                            <input type="password" placeholder="password" onChange={(event)=>this.setState({password: event.target.value})}/>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}


