var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Topper = function (_React$Component) {
    _inherits(Topper, _React$Component);

    function Topper(props) {
        _classCallCheck(this, Topper);

        var _this = _possibleConstructorReturn(this, (Topper.__proto__ || Object.getPrototypeOf(Topper)).call(this, props));

        _this.state = {
            visible: true,
            color: "goldenrod",
            background: "black"
        };
        _this.randomizeColors = _this.randomizeColors.bind(_this);
        return _this;
    }

    _createClass(Topper, [{
        key: "randomizeColors",
        value: function randomizeColors() {
            var rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            var color = String("rgb(");
            rgb.forEach(function (value, i) {
                color += String(value) + (i < 2 ? "," : "");
            });
            color = color.concat(")");

            rgb = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            var background = String("rgb(");
            rgb.forEach(function (value, i) {
                background += String(value) + (i < 2 ? "," : "");
            });
            background = background.concat(")");

            this.setState({
                color: color,
                background: background
            });
        }
    }, {
        key: "render",
        value: function render() {
            var c = "";
            if (this.state.visible) {
                c = this.state.color;
            } else {
                c = this.state.background;
            }

            return React.createElement(
                "div",
                { onClick: this.randomizeColors },
                React.createElement(
                    "h1",
                    { style: { backgroundColor: this.state.background, color: c, textAlign: "center" } },
                    " Welcome \"Neighbor\" ",
                    React.createElement("br", null),
                    " You look cute today "
                )
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            setInterval(function () {
                _this2.setState({
                    visible: !_this2.state.visible
                });
            }, 1000);
        }
    }]);

    return Topper;
}(React.Component);

ReactDOM.render(React.createElement(Topper, null), document.querySelector("#topper"));