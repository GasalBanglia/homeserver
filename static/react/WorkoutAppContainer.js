var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var id = "workout-app";
{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = 'gold';
    div.style.border = 'solid lightcoral 10px';
    var container = document.querySelector('#widget-container').prepend(div);
}

// import the presentational component class
import { WorkoutApp } from "./WorkoutApp.js";

// Some important constants 
var base_url = "https://wger.de";

var WorkoutAppContainer = function (_React$Component) {
    _inherits(WorkoutAppContainer, _React$Component);

    function WorkoutAppContainer(props) {
        _classCallCheck(this, WorkoutAppContainer);

        // Initialize state
        var _this = _possibleConstructorReturn(this, (WorkoutAppContainer.__proto__ || Object.getPrototypeOf(WorkoutAppContainer)).call(this, props));

        _this.state = {
            // An array of exercise IDs
            exercises: []
        };

        // bind methods.
        _this.generateWorkout = _this.generateWorkout.bind(_this);
        return _this;
    }

    // Fetches from the exercises endpoint and picks at random 5 exercises.
    // It sets the state as an array of exercise IDs, which the 
    // presentational component will use to lookup more information for 
    // the render.


    _createClass(WorkoutAppContainer, [{
        key: "generateWorkout",
        value: function generateWorkout() {
            var _this2 = this;

            fetch(base_url + "/api/v2" + "/exercise?format=json&language=2&status=2&equipment=3&equipment=7&equipment=4").then(function (response) {
                return response.json();
            }).then(function (data) {
                // get number of exercises
                var count = data['results'].length;

                // Build a unique list of random indices.
                var indices = [];
                while (indices.length < 5) {
                    var index = Math.floor(Math.random() * count);
                    if (!indices.includes(index)) {
                        indices.push(index);
                    }
                }

                // transform indices into exercise IDs
                var exercises = indices.map(function (i) {
                    return data['results'][i]['id'];
                });

                var result = [];
                indices.forEach(function (i) {
                    result.push({
                        'name': data['results'][i]['name'],
                        'description': data['results'][i]['description']
                    });
                });

                // Update the state with the new set of workout IDs
                _this2.setState({
                    exercises: result
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(WorkoutApp, {
                exercises: this.state.exercises,
                generateWorkout: this.generateWorkout
            });
        }
    }]);

    return WorkoutAppContainer;
}(React.Component);

//Render the component.


ReactDOM.render(React.createElement(WorkoutAppContainer, null), document.querySelector("#".concat(id)));