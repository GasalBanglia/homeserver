var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var FavoriteLinks = function (_React$Component) {
    _inherits(FavoriteLinks, _React$Component);

    function FavoriteLinks() {
        _classCallCheck(this, FavoriteLinks);

        return _possibleConstructorReturn(this, (FavoriteLinks.__proto__ || Object.getPrototypeOf(FavoriteLinks)).apply(this, arguments));
    }

    _createClass(FavoriteLinks, [{
        key: "render",
        value: function render() {

            var linkList = [];
            var i = 0;

            // Turn our list of links into a list of JSX
            for (var link in this.props.links) {
                linkList.push(React.createElement(
                    "li",
                    { key: "li-" + i },
                    React.createElement(
                        "a",
                        { href: this.props.links[link] },
                        link
                    )
                ));
                i += 1;
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    "Favorite Links"
                ),
                React.createElement(
                    "ul",
                    null,
                    linkList.length ? linkList : React.createElement(
                        "li",
                        null,
                        "No items yet."
                    )
                )
            );
        }
    }]);

    return FavoriteLinks;
}(React.Component);