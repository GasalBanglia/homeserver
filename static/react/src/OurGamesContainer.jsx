/*
 * OurGamesContainer
 *
 * Interfaces with the video_games mySQL table on the server.
 *
 * For now, it will be a good interface for adding a game.
 * Later, it will allow us to search and query the database.
 *
 * There will be a sub-widget that randomly selects a game for us, with
 * possible filters on system, genre, metacritic rating, etc.
 *
 */
//
// Start by creating our widget <div> in the widget-container <div>
// create a global variable to hold the id of the widget <div>
const id = "our-games";
//

{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = '#e4000f';
    let container = document.querySelector('#widget-container').prepend(div);

}

// A map of column names to the current value of their <input> elements.
var column_values = {
    "title":  "",
    "console": "",
    "release_date": '0000-00-00',
    "developer": "",
    'metacritic_rating': '',
    'description': "",
    'esrb_rating': 'E',
    'max_players': '',
    'has_online': false,
    'genre': 'action'
}

// Arrays of ENUM values for certain columns.
const esrb_ratings = [ 'E', 'E10+', 'T', 'M', 'AO', 'RP'];
const genres = ['action', 'action/adventure', 'adventure', 'role-playing', 'simulation', 'strategy', 'sports', 'board/card', 'MMO', 'party', 'other'];

import { OurGamesSelector } from "./OurGamesSelector.js";
import { OurGamesForm } from "./OurGamesForm.js";

class OurGamesContainer extends React.Component {
    constructor(props) {
        super(props);
        // initialize state
        this.state = {
            values: column_values, 
            posted: false,
            success: false,
            return_status: null,
            game_info: null,
        };
        // bind 'this' to methods.
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.selectGame = this.selectGame.bind(this);

    }

    selectGame() {
        let url = window.location.origin + '/videogames';

        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
               game_info : {
                   title:data['title'],
                   system:data['system'],
                   description:data['description'],
               }

            })
        });
    }

    handleFormChange(event) {
        let values = this.state.values;
        values[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({values: values});
    }

    handleFormSubmit() {
        // a little bit of debugging
        console.log(this.state.values);

        // Massage the data for the SQL query.
        let json = {};
        Object.assign(json, this.state.values);
        json['esrb_rating'] = esrb_ratings.indexOf(json['esrb_rating']) + 1;
        json['genre'] = genres.indexOf(json['genre']) + 1;
        json['has_online'] = json['has_online'] ? 1 : 0;

        let url = window.location.origin + '/videogames';
        // POST to the videogame endpoint 
        // NOTE: inserting unwashed string data into a SQL
        // query is a BIG SECURITY NONO
        fetch(url, {
            method:'POST', 
            body: JSON.stringify(json)
        })
            .then(response => {
                this.setState({
                    success: response.status === 201,
                    posted: true,
                    return_status: response.status
                });
            })
        .catch(err => {
            this.setState({
                success: false,
                posted: false,
                return_status: null
            })
        });
    }


    // For now, we render a nice form for inserting data about our 
    // videogames into the video_games database
    render() {
        return (
            <div>
                <OurGamesForm 
                    values={this.state.values}
                    onChange={this.handleFormChange}
                    onClick={this.handleFormSubmit}
                    posted={this.state.posted}
                    success={this.state.success}
                    return_status={this.state.return_status}
                />
                <OurGamesSelector
                    game_info={this.state.game_info}
                    selectGame={this.selectGame}
                />
            </div>
        );
    }
}

//Render the component.
ReactDOM.render(
    <OurGamesContainer />, 
    document.querySelector("#".concat(id))
)
