var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { FavoriteLinks } from "./FavoriteLinks.js";

var id = "favorite-links";

{
    var div = document.createElement("DIV");
    div.classList.add("side-widget");
    div.id = id;
    div.style.backgroundColor = 'dodgerblue';
    var container = document.querySelector('#sidebar').prepend(div);
}

// Dictionary of links and their display names.
var links = {
    'Mozilla Developer Network': 'https://developer.mozilla.org/en-US',
    'CareerOneStop': 'https://www.careeronestop.org/'

    /*
     * FavoriteLinksContainer
     *
     * Class to hold my links. Pretty basic.
     * It is a simple unordered list for now.
     * The links are stored here as well, in a dictionary.
     * 
     */
};
var FavoriteLinksContainer = function (_React$Component) {
    _inherits(FavoriteLinksContainer, _React$Component);

    function FavoriteLinksContainer(props) {
        _classCallCheck(this, FavoriteLinksContainer);

        var _this = _possibleConstructorReturn(this, (FavoriteLinksContainer.__proto__ || Object.getPrototypeOf(FavoriteLinksContainer)).call(this, props));

        _this.state = { links: links };
        return _this;
    }

    _createClass(FavoriteLinksContainer, [{
        key: "render",
        value: function render() {
            return React.createElement(FavoriteLinks, { links: this.state.links });
        }
    }]);

    return FavoriteLinksContainer;
}(React.Component);
//
//Render the component.


ReactDOM.render(React.createElement(FavoriteLinksContainer, null), document.querySelector("#".concat(id)));