var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var id = "recipe-search";

{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = '#79ca38';
    var container = document.querySelector('#widget-container').prepend(div);
}

var params = {
    q: ''
};

import { RecipeView } from "./RecipeView.js";
import { RecipeForm } from "./RecipeForm.js";

var RecipeContainer = function (_React$Component) {
    _inherits(RecipeContainer, _React$Component);

    function RecipeContainer(props) {
        _classCallCheck(this, RecipeContainer);

        // initialize state
        var _this = _possibleConstructorReturn(this, (RecipeContainer.__proto__ || Object.getPrototypeOf(RecipeContainer)).call(this, props));

        _this.state = {
            base_url: "https://api.edamam.com/search",
            app_id: "bbbabe4b",
            app_key: "d9a15d98e1e68a49d827db6fe84dbad7",
            values: params,
            view: "form",
            recipes: ""
        };
        // bind 'this' to methods.
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleFormSubmit = _this.handleFormSubmit.bind(_this);
        _this.returnToForm = _this.returnToForm.bind(_this);

        return _this;
    }

    _createClass(RecipeContainer, [{
        key: "handleFormChange",
        value: function handleFormChange(event) {
            var values = this.state.values;
            values[event.target.name] = event.target.value;
            this.setState({ values: values });
        }
    }, {
        key: "handleFormSubmit",
        value: function handleFormSubmit() {
            var _this2 = this;

            // Build the URL first.
            var url = this.state.base_url + '?';

            // insert credentials first
            url += "app_key=" + this.state.app_key + "&";
            url += "app_id=" + this.state.app_id + "&";

            // insert search parameters second
            var values = this.state.values;
            for (var v in values) {
                if (values.hasOwnProperty(v) && values[v]) {
                    url += v + '=' + values[v] + '&';
                }
            }

            //Get rid of that final ampersand
            url = url.slice(0, -1);

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
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                var index = Math.floor(Math.random() * data["hits"].length);
                // Store a random recipe in state.recipes.
                // and set the view to 'recipes'
                _this2.setState({
                    recipes: JSON.stringify(data["hits"][index]["recipe"]),
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
    }, {
        key: "returnToForm",
        value: function returnToForm() {
            this.setState({
                view: "form"
            });
        }

        // Switch between rendering a RecipeForm or a RecipeView 
        // component depending on the value of state.view

    }, {
        key: "render",
        value: function render() {
            if (this.state.view === "form") {
                return React.createElement(RecipeForm, { values: this.state.values,
                    onChange: this.handleFormChange,
                    onClick: this.handleFormSubmit
                });
            } else if (this.state.view === "recipes") {
                return React.createElement(RecipeView, { recipes: this.state.recipes,
                    onClick: this.returnToForm
                });
            }
        }
    }]);

    return RecipeContainer;
}(React.Component);

//Render the component.


ReactDOM.render(React.createElement(RecipeContainer, null), document.querySelector("#".concat(id)));