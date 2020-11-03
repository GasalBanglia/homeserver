var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React from 'react';
///import ReactDOM from 'react-dom'
import { WeatherSensors } from './WeatherSensors.js';

// Start by creating our widget <div> in the widget-container <div>
// create a global variable to hold the id of the widget <div>
var id = "weather-sensors";

{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    var container = document.querySelector('#widget-container').appendChild(div);
    container.style.backgroundColor = "gray";
}

var WeatherSensorsContainer = function (_React$Component) {
    _inherits(WeatherSensorsContainer, _React$Component);

    function WeatherSensorsContainer(props) {
        _classCallCheck(this, WeatherSensorsContainer);

        // Initialize state
        var _this = _possibleConstructorReturn(this, (WeatherSensorsContainer.__proto__ || Object.getPrototypeOf(WeatherSensorsContainer)).call(this, props));

        _this.state = { data: "" };

        // change state.
        _this.state.data = "A wild datum appears.";

        return _this;
    }

    _createClass(WeatherSensorsContainer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            // fetch the light data
            fetch(window.location.origin + "/weather").then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                _this2.setState({
                    data: data['data']
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            console.log("In Container, data is of type " + _typeof(this.state.data[0]));
            console.log(this.state.data);
            return React.createElement(WeatherSensors, { data: this.state.data });
        }
    }]);

    return WeatherSensorsContainer;
}(React.Component);

//Render the component


ReactDOM.render(React.createElement(WeatherSensorsContainer, null), document.querySelector("#".concat(id)));