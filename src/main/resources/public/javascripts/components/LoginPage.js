class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.logIn(true); //Just sending true for now so that things work, you can send actual shit eventually
    }

    render(){
        return (
            <div className="login-wrapper">
                <div className="login-div">
                    <div className="login-side">
                        <form className="login-form" onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="username"/>
                            <input type="password" placeholder="password"/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    <div className="logo">
                        <h1>Where<br/>You<br/>At</h1>
                    </div>
                </div>
            </div>
        );
    }

}


