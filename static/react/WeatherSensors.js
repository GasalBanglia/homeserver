var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React from 'react';

export var WeatherSensors = function (_React$Component) {
    _inherits(WeatherSensors, _React$Component);

    function WeatherSensors() {
        _classCallCheck(this, WeatherSensors);

        return _possibleConstructorReturn(this, (WeatherSensors.__proto__ || Object.getPrototypeOf(WeatherSensors)).apply(this, arguments));
    }

    _createClass(WeatherSensors, [{
        key: 'render',
        value: function render() {
            console.log('In Presenter, data is of type: ' + _typeof(this.props.data[0]));
            console.log('and the container is of type: ' + _typeof(this.props.data));
            console.log(this.props.data);
            var bars = [];

            // Create a list of JSX divs, representing the bars of the graph.
            for (var i = 0; i < this.props.data.length; i++) {
                var height = this.props.data[i] / 3.5;
                bars.push(React.createElement('div', {
                    key: 'bar_' + i,
                    style: {
                        height: height.toString() + "px",
                        width: "1px",
                        backgroundColor: "red",
                        display: 'inline-block'
                    }
                }));
            }

            return React.createElement(
                'div',
                { style: { overflowY: 'auto' } },
                bars,
                React.createElement('br', null),
                React.createElement(
                    'span',
                    null,
                    'At Some Point In Time  --------------------------->  At Some Other Point'
                )
            );
        }
    }]);

    return WeatherSensors;
}(React.Component);