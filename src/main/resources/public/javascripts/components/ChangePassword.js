class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',

            formSubmitted: false,
            emptySubmit: false
        }
    }

    render() {
        return(
            <div>
                <header>
                    <h3>Please enter BOTH your old password AND a new password!</h3>
                </header>

                {/*<div className={"Input Old Password"}>*/}
                {/*    <Form.Label>Input old Password</Form.Label>*/}
                {/*    <InputGroup className="mb-3">*/}
                {/*        <Form.Control*/}
                {/*            placeholder="Please enter your old password"*/}
                {/*            aria-label="Enter old pass"*/}
                {/*            id="Old_Pass"*/}
                {/*            type="password"*/}
                {/*            onChange={(e) => {*/}
                {/*                this.setState({oldPass: e.target.value})*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </InputGroup>*/}
                {/*    /!*{this.state.nameSuccess === 1 ? successMessage : null}*!/*/}
                {/*    /!*{this.state.nameSuccess === 2 ? failedSubmitMessage : null}*!/*/}
                {/*    /!*{this.state.nameSuccess === 3 ? emptySubmitMessage : null}*!/*/}
                {/*</div>*/}

                {/*<div className={"Input New Password"}>*/}
                {/*    <Form.Label>Input new Password</Form.Label>*/}
                {/*    <InputGroup className="mb-3">*/}
                {/*        <Form.Control*/}
                {/*            placeholder="Please enter a new password"*/}
                {/*            aria-label="Enter old pass"*/}
                {/*            id="Old_Pass"*/}
                {/*            onChange={(e) => {*/}
                {/*                this.setState({oldPass: e.target.value})*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </InputGroup>*/}
                {/*    /!*{this.state.nameSuccess === 1 ? successMessage : null}*!/*/}
                {/*    /!*{this.state.nameSuccess === 2 ? failedSubmitMessage : null}*!/*/}
                {/*    /!*{this.state.nameSuccess === 3 ? emptySubmitMessage : null}*!/*/}
                {/*</div>*/}

            </div>
        )
    }
}
