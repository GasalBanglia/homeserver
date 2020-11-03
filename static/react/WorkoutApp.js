var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var WorkoutApp = function (_React$Component) {
    _inherits(WorkoutApp, _React$Component);

    function WorkoutApp() {
        _classCallCheck(this, WorkoutApp);

        return _possibleConstructorReturn(this, (WorkoutApp.__proto__ || Object.getPrototypeOf(WorkoutApp)).apply(this, arguments));
    }

    _createClass(WorkoutApp, [{
        key: "render",
        value: function render() {
            // variables 
            var name = "";
            var description = "";
            var category = "";
            var list = [];

            for (var i = 0; i < this.props.exercises.length; i++) {
                name = this.props.exercises[i]['name'];
                description = this.props.exercises[i]['description'];
                list.push(React.createElement(
                    "li",
                    { key: "exercise_" + name },
                    React.createElement(
                        "h3",
                        null,
                        name
                    ),
                    React.createElement(
                        "p",
                        null,
                        description
                    )
                ));
                /*
                    let url = "https://wger.de" + "/api/v2" + "/exerciseinfo/" + this.props.exercises[i] + "/?format=json";
                    let data = {}
                     fetch(url)
                    .then(response => response.json())
                    .then( data => {
                        data = {
                            "name":data['name'],
                            "description":data["description"]
                        };
                        console.log(data['name'])
                        list.push( <li key={"li_" + data['name']} >{data['name']}</li> );
                    })
                    */
            }

            console.log(list);

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    null,
                    "Exercises"
                ),
                React.createElement(
                    "ul",
                    null,
                    list
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.generateWorkout },
                    "Generate Workout"
                )
            );
        }
    }]);

    return WorkoutApp;
}(React.Component);