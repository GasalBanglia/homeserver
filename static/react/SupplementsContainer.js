var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Supplements } from "./Supplements.js";

// Start by creating our widget <div> in the widget-container <div>
// create a global variable to hold the id of the widget <div>
var id = "leo-supplements";

{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    var container = document.querySelector('#widget-container').appendChild(div);
    container.style.backgroundColor = "papayawhip";
}

var SupplementsContainer = function (_React$Component) {
    _inherits(SupplementsContainer, _React$Component);

    function SupplementsContainer(props) {
        _classCallCheck(this, SupplementsContainer);

        var _this = _possibleConstructorReturn(this, (SupplementsContainer.__proto__ || Object.getPrototypeOf(SupplementsContainer)).call(this, props));

        _this.state = { takenToday: false };
        _this.takeSupplementToday = _this.takeSupplementToday.bind(_this);

        return _this;
    }

    _createClass(SupplementsContainer, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            //Obtain whether leo took his supplement today.
            fetch(window.location.origin + "/leo/supplements?source=widget").then(function (response) {
                console.log("in SupplementsContainer.js/componentWillMount/Fetch():\nstatus code is " + response.status);
                return response.json();
            }).then(function (data) {
                _this2.setState({
                    takenToday: data["takenToday"]
                });
            });
        }

        /*
         * Attempts to INSERT a supplement entry into the 
         * supplements table. 
         * amount:1, date:today
         *
         * Calls setState({takenToday: True}) on success (code 201),
         * no action otherwise.
         */

    }, {
        key: "takeSupplementToday",
        value: function takeSupplementToday() {
            var _this3 = this;

            fetch(window.location.origin + "/leo/supplements?source=widget", { method: 'POST' }).then(function (response) {
                return response.status;
            }).then(function (code) {
                console.log("Response code for fetch within takeSupplementToday: " + code);
                _this3.setState({
                    takenToday: code === 201 ? true : false
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(Supplements, {
                onClick: this.takeSupplementToday,
                takenToday: this.state.takenToday });
        }
    }]);

    return SupplementsContainer;
}(React.Component);

ReactDOM.render(React.createElement(SupplementsContainer, null), document.querySelector('#'.concat(id)));