class SlotMachine extends React.Component {
    render() {
        const { one, two, three } = this.props;

        return  (
            <slot-machine>
                <p style={ { fontSize: '200%' } }>{one} {two} {three}</p>
                { (one == two && two == three)
                  ? 
                  <div>
                        <p className="win">CONGRATS !</p>
                        <img src='https://media.giphy.com/media/kclzyKws114UgrnBRO/giphy.gif'/>
                  </div>
                  :
                  <p className="lose">Sorry, you lose.</p>
                }
            </slot-machine>
        ) // return
    }; // render
} // class SlotMachine