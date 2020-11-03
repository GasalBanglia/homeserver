var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var id = "our-games";
//

{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = '#e4000f';
    var container = document.querySelector('#widget-container').prepend(div);
}

// A map of column names to the current value of their <input> elements.
var column_values = {
    "title": "",
    "console": "",
    "release_date": '0000-00-00',
    "developer": "",
    'metacritic_rating': '',
    'description': "",
    'esrb_rating': 'E',
    'max_players': '',
    'has_online': false,
    'genre': 'action'

    // Arrays of ENUM values for certain columns.
};var esrb_ratings = ['E', 'E10+', 'T', 'M', 'AO', 'RP'];
var genres = ['action', 'action/adventure', 'adventure', 'role-playing', 'simulation', 'strategy', 'sports', 'board/card', 'MMO', 'party', 'other'];

import { OurGamesSelector } from "./OurGamesSelector.js";
import { OurGamesForm } from "./OurGamesForm.js";

var OurGamesContainer = function (_React$Component) {
    _inherits(OurGamesContainer, _React$Component);

    function OurGamesContainer(props) {
        _classCallCheck(this, OurGamesContainer);

        // initialize state
        var _this = _possibleConstructorReturn(this, (OurGamesContainer.__proto__ || Object.getPrototypeOf(OurGamesContainer)).call(this, props));

        _this.state = {
            values: column_values,
            posted: false,
            success: false,
            return_status: null,
            game_info: null
        };
        // bind 'this' to methods.
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
        _this.selectGame = _this.selectGame.bind(_this);

        return _this;
    }

    _createClass(OurGamesContainer, [{
        key: "selectGame",
        value: function selectGame() {
            var _this2 = this;

            var url = window.location.origin + '/videogames';

            fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this2.setState({
                    game_info: {
                        title: data['title'],
                        system: data['system'],
                        description: data['description']
                    }

                });
            });
        }
    }, {
        key: "handleFormChange",
        value: function handleFormChange(event) {
            var values = this.state.values;
            values[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            this.setState({ values: values });
        }
    }, {
        key: "handleFormSubmit",
        value: function handleFormSubmit() {
            var _this3 = this;

            // a little bit of debugging
            console.log(this.state.values);

            // Massage the data for the SQL query.
            var json = {};
            Object.assign(json, this.state.values);
            json['esrb_rating'] = esrb_ratings.indexOf(json['esrb_rating']) + 1;
            json['genre'] = genres.indexOf(json['genre']) + 1;
            json['has_online'] = json['has_online'] ? 1 : 0;

            var url = window.location.origin + '/videogames';
            // POST to the videogame endpoint 
            // NOTE: inserting unwashed string data into a SQL
            // query is a BIG SECURITY NONO
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(json)
            }).then(function (response) {
                _this3.setState({
                    success: response.status === 201,
                    posted: true,
                    return_status: response.status
                });
            }).catch(function (err) {
                _this3.setState({
                    success: false,
                    posted: false,
                    return_status: null
                });
            });
        }

        // For now, we render a nice form for inserting data about our 
        // videogames into the video_games database

    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(OurGamesForm, {
                    values: this.state.values,
                    onChange: this.handleFormChange,
                    onClick: this.handleFormSubmit,
                    posted: this.state.posted,
                    success: this.state.success,
                    return_status: this.state.return_status
                }),
                React.createElement(OurGamesSelector, {
                    game_info: this.state.game_info,
                    selectGame: this.selectGame
                })
            );
        }
    }]);

    return OurGamesContainer;
}(React.Component);

//Render the component.


ReactDOM.render(React.createElement(OurGamesContainer, null), document.querySelector("#".concat(id)));