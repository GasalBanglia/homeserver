import { Supplements } from "./Supplements.js";

// Start by creating our widget <div> in the widget-container <div>
// create a global variable to hold the id of the widget <div>
var id = "leo-supplements";

{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    let container = document.querySelector('#widget-container').appendChild(div);
    container.style.backgroundColor = "papayawhip";

}



class SupplementsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { takenToday: false };
        this.takeSupplementToday = this.takeSupplementToday.bind(this);

    }

    componentWillMount() {
        //Obtain whether leo took his supplement today.
        fetch(window.location.origin + "/leo/supplements?source=widget")
        .then( response => {
            console.log("in SupplementsContainer.js/componentWillMount/Fetch():\nstatus code is " + response.status);
            return response.json()
        })
        .then( data => {
            this.setState({
                takenToday : data["takenToday"]
            })
        });
    }

    /*
     * Attempts to INSERT a supplement entry into the 
     * supplements table. 
     * amount:1, date:today
     *
     * Calls setState({takenToday: True}) on success (code 201),
     * no action otherwise.
     */
    takeSupplementToday() {
        fetch(window.location.origin + "/leo/supplements?source=widget",
            {method: 'POST'})
        .then( response => response.status )
        .then( code => {
            console.log("Response code for fetch within takeSupplementToday: " + code);
            this.setState({
                takenToday: code === 201 ? true : false
            })
        })
    }

    render() {
        return (
            <Supplements 
            onClick={this.takeSupplementToday} 
            takenToday={this.state.takenToday} />
        );
    }
}

ReactDOM.render( <SupplementsContainer />, 
                 document.querySelector('#'.concat(id)))

