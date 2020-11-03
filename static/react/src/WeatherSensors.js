//import React from 'react';

export class WeatherSensors extends React.Component {
    render() {
        console.log('In Presenter, data is of type: ' + typeof this.props.data[0])
        console.log('and the container is of type: ' + typeof this.props.data);
        console.log(this.props.data);
        const bars = [];

        // Create a list of JSX divs, representing the bars of the graph.
        for (let i = 0; i < this.props.data.length; i++) {
            let height = this.props.data[i] / 3.5;
            bars.push(
                (
                    <div 
                    key={'bar_' + i} 
                    style={{
                        height: height.toString() + "px",
                        width: "1px",
                        backgroundColor: "red",
                        display: 'inline-block',
                    }}
                    >
                    </div>
                )
            )
        }
        

        return (
            <div style={{overflowY:'auto'}} >
                {bars}
                <br/>
                <span>At Some Point In Time  --------------------------->  At Some Other Point</span>
            </div>
        )
    }
}
