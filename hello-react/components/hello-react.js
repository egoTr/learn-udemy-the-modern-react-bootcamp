class Hello extends React.Component {
    render() {
        const ps = this.props;
        
        return  (
            <div>
                <h1>Hello {ps.to} !</h1>
                <h2>I am {ps.from}</h2>
                <h3>Timestamp = {Date.now()}</h3>
            </div>
        ) // return
    }; // render
} // class Welcome