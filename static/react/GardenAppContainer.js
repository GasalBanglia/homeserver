var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var id = "garden-app";

{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = '#60d060';
    var container = document.querySelector('#widget-container').prepend(div);
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

var GardenAppContainer = function (_React$Component) {
    _inherits(GardenAppContainer, _React$Component);

    function GardenAppContainer(props) {
        _classCallCheck(this, GardenAppContainer);

        //set initial state
        var _this = _possibleConstructorReturn(this, (GardenAppContainer.__proto__ || Object.getPrototypeOf(GardenAppContainer)).call(this, props));

        _this.state = {
            sensors: {
                'light': 0,
                'soil': 0
            },
            actuators: {
                'main_valve': "UNKNOWN"
            }
        };

        // bind event handlers
        _this.toggleValve = _this.toggleValve.bind(_this);
        _this.readSensors = _this.readSensors.bind(_this);
        return _this;
    }

    _createClass(GardenAppContainer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.readSensors();
        }
    }, {
        key: "toggleValve",
        value: function toggleValve() {
            var _this2 = this;

            // Send a simple POST request to the garden endpoint.
            fetch(window.location.origin + "/garden", { method: 'POST' }).then(function (response) {
                // Ensure we had a good reponse.
                if (response.status >= 200 && response.status < 300) {
                    // And assume the FSON is well-formed.
                    return response.json();
                }
            }).then(function (data) {
                _this2.setState({
                    actuators: data['readings']
                });
            });
        }
    }, {
        key: "readSensors",
        value: function readSensors() {
            var _this3 = this;

            // send a GET request to the garden endpoint
            fetch(window.location.origin + "/garden").then(function (response) {
                // Ensure we had a good response.
                if (response.status >= 200 && response.status < 300) {
                    // I assume there is well-formatted JSON.
                    return response.json();
                }
            }).then(function (data) {
                _this3.setState({
                    sensors: data['readings']
                });
            });
        }

        // Render the GardenApp component

    }, {
        key: "render",
        value: function render() {
            return React.createElement(GardenApp, {
                toggleValve: this.toggleValve,
                readSensors: this.readSensors,
                sensor_data: this.state.sensors,
                actuator_data: this.state.actuators
            });
        }
    }]);

    return GardenAppContainer;
}(React.Component);

//Render the component.


ReactDOM.render(React.createElement(GardenAppContainer, null), document.querySelector("#".concat(id)));