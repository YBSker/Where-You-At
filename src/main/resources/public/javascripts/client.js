class Application extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Header/>
            </div>
        );
    }
}

const Header = () => <h1>Where you at</h1>;

ReactDOM.render(<Application/>, document.querySelector("#application"));
