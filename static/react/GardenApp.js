var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * GardenApp.jsx
 *
 * Presentationl component for the Garden App widget.
 *
 * Presents a table of data and various controls to interface
 * with the actuators (valves, for example).
 *
 */

export var GardenApp = function (_React$Component) {
    _inherits(GardenApp, _React$Component);

    function GardenApp() {
        _classCallCheck(this, GardenApp);

        return _possibleConstructorReturn(this, (GardenApp.__proto__ || Object.getPrototypeOf(GardenApp)).apply(this, arguments));
    }

    _createClass(GardenApp, [{
        key: "render",
        value: function render() {
            // First, build some lists of table data.
            var headers = [];
            var readings = [];
            var numSensorReadings = 0;
            var numActuatorReadings = 0;
            for (var name in this.props.sensor_data) {
                if (this.props.sensor_data.hasOwnProperty(name)) {
                    headers.push(React.createElement(
                        "th",
                        { key: "th_" + name, scope: "col" },
                        name
                    ));
                    readings.push(React.createElement(
                        "td",
                        { key: "td_" + name },
                        this.props.sensor_data[name]
                    ));
                    numSensorReadings += 1;
                }
            }
            for (var _name in this.props.actuator_data) {
                if (this.props.actuator_data.hasOwnProperty(_name)) {
                    headers.push(React.createElement(
                        "th",
                        { key: "th_" + _name, scope: "col" },
                        _name
                    ));
                    readings.push(React.createElement(
                        "td",
                        { key: "td_" + _name },
                        this.props.actuator_data[_name]
                    ));
                    numActuatorReadings += 1;
                }
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { colSpan: numSensorReadings },
                                "Sensor Readings"
                            ),
                            React.createElement(
                                "th",
                                { colSpan: numActuatorReadings },
                                "Actuator Readings"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            headers
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            readings
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.toggleValve },
                    "Toggle Valve"
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.readSensors },
                    "Refresh Readings"
                )
            );
        }
    }]);

    return GardenApp;
}(React.Component);