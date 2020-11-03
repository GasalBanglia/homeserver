/*
 * RecipeContainer
 *
 * Container component for RecipeView and RecipeForm.
 *
 * Holds form <input> values for RecipeView and handles form submission.
 * Calls fetch() to the Edamam API and stores the results in state.recipes.
 * Toggles the rendering of the two views.
 *
 * state.values is an object of name/value pairs for each <input> on the 
 * <form> within RecipeView.
 */
//
// Start by creating our widget <div> in the widget-container <div>
// create a global variable to hold the id of the widget <div>
const id = "recipe-search";

{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = '#79ca38';
    let container = document.querySelector('#widget-container').prepend(div);

}

var params = {
    q: '',
}

import { RecipeView } from "./RecipeView.js";
import { RecipeForm } from "./RecipeForm.js";

class RecipeContainer extends React.Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            base_url: "https://api.edamam.com/search",
            app_id: "bbbabe4b", 
            app_key: "d9a15d98e1e68a49d827db6fe84dbad7", 
            values: params, 
            view: "form", 
            recipes: "",
        };
        // bind 'this' to methods.
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.returnToForm = this.returnToForm.bind(this);

    }

    handleFormChange(event) {
        let values = this.state.values;
        values[event.target.name] = event.target.value;
        this.setState({values: values});
    }

    handleFormSubmit() {
        // Build the URL first.
        let url = this.state.base_url + '?';

        // insert credentials first
        url += "app_key=" + this.state.app_key + "&";
        url += "app_id=" + this.state.app_id + "&";


        // insert search parameters second
        let values = this.state.values;
        for (let v in values) {
            if (values.hasOwnProperty(v) && values[v]) { 
                url += v + '=' + values[v] + '&';
            }
        }

        //Get rid of that final ampersand
        url = url.slice(0,-1);

        /*
        fetch("https://www.google.com")
        .then( response => {
            this.setState({
                recipes: "status code is " + response.status,
                view: "recipes",
            })
        })
        */

        // Query the Edamam API for some recipes.
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let index =
                    Math.floor(Math.random() * data["hits"].length);
                // Store a random recipe in state.recipes.
                // and set the view to 'recipes'
                this.setState({
                    recipes:JSON.stringify(data["hits"][index]["recipe"]),
                    view: "recipes"
                });
            });
        /*
        this.setState({
            recipes:"recipe goes here",
            view: "recipes"
        });
        */
    }

    returnToForm() {
        this.setState({
            view: "form"
        })
    }

    // Switch between rendering a RecipeForm or a RecipeView 
    // component depending on the value of state.view
    render() {
        if (this.state.view === "form") {
            return (
                <RecipeForm values={this.state.values}
                            onChange={this.handleFormChange}
                            onClick={this.handleFormSubmit}
                />
            )
        }
        else if (this.state.view === "recipes") {
            return (
                <RecipeView recipes={this.state.recipes}
                            onClick={this.returnToForm}
                />
            )
        }
    }
}

//Render the component.
ReactDOM.render(
    <RecipeContainer />, 
    document.querySelector("#".concat(id))
);
