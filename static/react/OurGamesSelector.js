var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var OurGamesSelector = function (_React$Component) {
    _inherits(OurGamesSelector, _React$Component);

    function OurGamesSelector() {
        _classCallCheck(this, OurGamesSelector);

        return _possibleConstructorReturn(this, (OurGamesSelector.__proto__ || Object.getPrototypeOf(OurGamesSelector)).apply(this, arguments));
    }

    _createClass(OurGamesSelector, [{
        key: 'render',
        value: function render() {
            var info = void 0;
            if (this.props.game_info === null) {
                info = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h2',
                        null,
                        'Click the Button to Select a Game'
                    )
                );
            } else {
                info = React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'h2',
                        null,
                        "You Should Play " + this.props.game_info['title']
                    ),
                    React.createElement(
                        'h3',
                        null,
                        this.props.game_info['system']
                    ),
                    React.createElement(
                        'p',
                        null,
                        this.props.game_info['description']
                    )
                );
            }

            return React.createElement(
                'div',
                null,
                info,
                React.createElement(
                    'button',
                    { onClick: this.props.selectGame },
                    'Select Game'
                )
            );
        }
    }]);

    return OurGamesSelector;
}(React.Component);