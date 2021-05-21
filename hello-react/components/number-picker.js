function isEvenOrOdd(num) {
    return num % 2 == 0 ? `${num}, is an even number` : `${num}, is an odd number`;
} // isEvenOrOdd

class NumberPicker extends React.Component {
    a = Math.floor(Math.random() * 10) + 1;
    
    render() {
        const b = Math.floor(Math.random() * 10) + 1;
        const result = this.a * b;

        return  (
            <div>
                <p>{this.a} * {b} = {isEvenOrOdd(result)}</p>
                { (result % 5 == 0) &&
                  <img src='https://media.giphy.com/media/kclzyKws114UgrnBRO/giphy.gif'/>
                }
            </div>
        ) // return
    }; // render
} // class NumberPicker