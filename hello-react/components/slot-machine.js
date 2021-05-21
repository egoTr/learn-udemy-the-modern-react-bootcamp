const const_fruits = ['🍅', '🍇', '🍈'];

class SlotMachine extends React.Component {
    render() {
        const { one, two, three } = this.props;

        return  (
            <div>
                <p>{one} {two} {three}</p>
                { (one == two && two == three)
                  ? 
                  <div>
                        <p>CONGRATS !</p>
                        <img src='https://media.giphy.com/media/kclzyKws114UgrnBRO/giphy.gif'/>
                  </div>
                  :
                  <p>Sorry, you lose.</p>
                }
            </div>
        ) // return
    }; // render
} // class SlotMachine