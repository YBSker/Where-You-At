
class Application extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>

            </div>
        );
    }
}

ReactDOM.render(<Application/>, document.querySelector("#application"));
