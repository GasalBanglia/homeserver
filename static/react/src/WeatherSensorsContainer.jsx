//import React from 'react';
///import ReactDOM from 'react-dom'
import { WeatherSensors } from './WeatherSensors.js';

// Start by creating our widget <div> in the widget-container <div>
// create a global variable to hold the id of the widget <div>
var id = "weather-sensors";

{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    let container = document.querySelector('#widget-container').appendChild(div);
    container.style.backgroundColor = "gray";

}

class WeatherSensorsContainer extends React.Component {
    constructor(props) {
        super(props)
        
        // Initialize state
        this.state = {data : ""};

        // change state.
        this.state.data = "A wild datum appears.";

    }

    componentWillMount() {
        // fetch the light data
        fetch(window.location.origin + "/weather")
            .then( response => response.json() )
            .then( data => { 
                console.log(data);
                this.setState({
                    data: data['data']
                });
        });
    }



    render() {
        console.log("In Container, data is of type " + typeof this.state.data[0]);
        console.log(this.state.data);
        return (
            <WeatherSensors data={this.state.data} />
        );
    }
}

//Render the component
ReactDOM.render( 
    <WeatherSensorsContainer />, 
    document.querySelector("#".concat(id))
);
