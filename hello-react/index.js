const const_fruits = ['🍅', '🍇', '🍈'];

class App extends React.Component {
    render() {
        const fruits =const_fruits.length; 
        const fruit1 = const_fruits[Math.floor( Math.random() * (fruits - 1) )]; // random index of fruit: 0-2
        const fruit2 = const_fruits[Math.floor( Math.random() * (fruits - 1) )];
        const fruit3 = const_fruits[Math.floor( Math.random() * (fruits - 1) )];

        return (
            <div>
                <Hello from="Ego" to="React"/>
                <SlotMachine one={fruit1} two={fruit2} three={fruit3}/>
            </div>
        ) // return
    } // render()
} // App

ReactDOM.render(<App/>, document.body);