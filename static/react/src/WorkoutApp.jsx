
export class WorkoutApp extends React.Component {
    render() {
        // variables 
        let name = "";
        let description = "";
        let category = "";
        let list = [];

        for (let i = 0; i < this.props.exercises.length; i++) {
            name = this.props.exercises[i]['name'];
            description = this.props.exercises[i]['description'];
            list.push(<li key={"exercise_" + name} ><h3 >{name}</h3><p>{description}</p></li>);
        /*
            let url = "https://wger.de" + "/api/v2" + "/exerciseinfo/" + this.props.exercises[i] + "/?format=json";
            let data = {}

            fetch(url)
            .then(response => response.json())
            .then( data => {
                data = {
                    "name":data['name'],
                    "description":data["description"]
                };
                console.log(data['name'])
                list.push( <li key={"li_" + data['name']} >{data['name']}</li> );
            })
            */
        }

        console.log(list)

        return (
            <div>
                <h2>Exercises</h2>
                <ul>
                    {list}
                </ul>
                <button onClick={this.props.generateWorkout}>Generate Workout</button>
            </div>
        );
    }
}

            
