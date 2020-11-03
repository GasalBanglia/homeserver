/*
 * WorkoutAppContainer.jsx
 *
 * React Container Component for the build-a-workout program.
 *
 * It uses data from the www.wger.de API to randomly select workouts.
 * For now, we only randomly select from a list of exercises 
 * that use barbells or body weight.
 *
 * The base URL for the API is https://wger.de/api/v2
 * We will use the exercise endpoint, with these parameters:
 *      /exercise/?format=json&language=2&status=2&equipment=1&equipment=7
 *
 * This returns a JSON object (format=json) of 
 * exercises in English (language=2), that have 
 * been submitted to the database (status), and which require either 
 * a barbell (equipment=1) or your own body weight (equipment=7).
 */

//First things first! Let us create a <div> to contain our widget.
const id = "workout-app";
{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = 'gold';
    div.style.border = 'solid lightcoral 10px';
    let container = document.querySelector('#widget-container').prepend(div);

}

// import the presentational component class
import { WorkoutApp } from "./WorkoutApp.js";

// Some important constants 
const base_url = "https://wger.de";


class WorkoutAppContainer extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            // An array of exercise IDs
            exercises: [],
        };

        // bind methods.
        this.generateWorkout = this.generateWorkout.bind(this);
    }

    // Fetches from the exercises endpoint and picks at random 5 exercises.
    // It sets the state as an array of exercise IDs, which the 
    // presentational component will use to lookup more information for 
    // the render.
    generateWorkout() {
        fetch(base_url + 
            "/api/v2" + 
            "/exercise?format=json&language=2&status=2&equipment=3&equipment=7&equipment=4"
        )
        .then(response => response.json())
        .then(data => {
            // get number of exercises
            let count = data['results'].length; 

            // Build a unique list of random indices.
            let indices = [];
            while (indices.length < 5) {
                let index = Math.floor(Math.random() * count);
                if (!indices.includes(index)) {
                    indices.push(index);
                }
            }
            
            // transform indices into exercise IDs
            let exercises = indices.map( i => data['results'][i]['id'] );
            
            let result = [];
            indices.forEach( i => {
                result.push( {
                    'name':data['results'][i]['name'],
                    'description':data['results'][i]['description']
                })
            })

            // Update the state with the new set of workout IDs
            this.setState({
                exercises: result
            });
        })
    }

    render() {
        return (
            <WorkoutApp 
                exercises={this.state.exercises}
                generateWorkout={this.generateWorkout}
            />
        );
    }
}

//Render the component.
ReactDOM.render(
    <WorkoutAppContainer />, 
    document.querySelector("#".concat(id))
);
