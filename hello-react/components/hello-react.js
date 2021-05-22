class Hello extends React.Component {
    // default properties
    static defaultProps = {
        colorText: "white",
        colorBackground: "purple",

        from: "Ego",
        hobbies: ['Eating'],
        dislikes: ["Working"]
    } // defaultProps
    
 
    render() {
        const { colorText, colorBackground, from, hobbies, dislikes, to } = this.props;
        const style = {
            color: colorText,
            backgroundColor: colorBackground,
            textDecoration: 'underline'
        }; // colors
        
        return  (
            <div className="Hello">
                <h1 style={style}>Hello {to}, I am {from}!</h1>
                <p><b>My hobbies are:</b></p>
                <ul>
                    { hobbies.map(h => <li>{h}</li>)  }
                </ul>
                <p><b>I dislike:</b></p>
                <ul>
                    { dislikes.map(d => <li>{d}</li>)  }
                </ul>
            </div>
        ) // return
    }; // render
} // class Welcome