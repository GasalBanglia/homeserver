
/*
 * GardenAppContainer.jsx
 *
 * React Container component for the server's GardenHandler class.
 * Interfaces with electronic sensors and actuators in the garden.
 *
 * Displays sensor data and sends control signals to actuators.
 *
 */

// First things first: create a new HTML container to render our app.
const id = "garden-app";

{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = '#60d060';
    let container = document.querySelector('#widget-container').prepend(div);
}

// import react components
import { GardenApp } from "./GardenApp.js";

/*
 * GardenAppContainer
 *
 * React Container component for the Garden Application.
 * Fetches data and stores it as state.
 * Passes state and event handlers to the GardenApp presentational component.
 *
 */
class GardenAppContainer extends React.Component {
    constructor(props) {
        super(props);

        //set initial state
        this.state = {
            sensors: {
                'light' : 0,
                'soil'  : 0
            },
            actuators: {
                'main_valve': "UNKNOWN"
            },
        };

        // bind event handlers
        this.toggleValve = this.toggleValve.bind(this);
        this.readSensors = this.readSensors.bind(this);
    }

    componentWillMount() {
        this.readSensors();
    }

    toggleValve() {
        // Send a simple POST request to the garden endpoint.
        fetch(
            window.location.origin + "/garden", 
            {method: 'POST'}
        )
        .then(response => {
            // Ensure we had a good reponse.
            if (response.status >= 200 && response.status < 300) {
                // And assume the FSON is well-formed.
                return response.json();
            }
        })
        .then(data => {
            this.setState({
                actuators: data['readings']
            })
        });
    }

    readSensors() {
        // send a GET request to the garden endpoint
        fetch(
            window.location.origin + "/garden", 
        )
        .then(response => {
            // Ensure we had a good response.
            if (response.status >= 200 && response.status < 300) {
                // I assume there is well-formatted JSON.
                return response.json();
            }
        })
        .then(data => {
            this.setState({
                sensors: data['readings']
            })
        });
    }

    // Render the GardenApp component
    render() {
        return (
            <GardenApp 
                toggleValve=    {this.toggleValve}
                readSensors=    {this.readSensors}
                sensor_data=    {this.state.sensors}
                actuator_data= {this.state.actuators}
            />
        )
    }
}







//Render the component.
ReactDOM.render(
    <GardenAppContainer />, 
    document.querySelector("#".concat(id))
);
