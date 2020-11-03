var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { PhotoApp } from "./PhotoApp.js";

// begin by setting up the widget container
var id = "photo-app";

{
    var div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = 'cerulean';
    var container = document.querySelector('#widget-container').prepend(div);
}

var PhotoAppContainer = function (_React$Component) {
    _inherits(PhotoAppContainer, _React$Component);

    function PhotoAppContainer(props) {
        _classCallCheck(this, PhotoAppContainer);

        //set initial state
        var _this = _possibleConstructorReturn(this, (PhotoAppContainer.__proto__ || Object.getPrototypeOf(PhotoAppContainer)).call(this, props));

        _this.state = {
            uploaded: false,
            response: ""
        };

        // bind this to state-setting methods.
        _this.uploadFile = _this.uploadFile.bind(_this);
        return _this;
    }

    // responses to an onchange event from the file input element


    _createClass(PhotoAppContainer, [{
        key: "uploadFile",
        value: function uploadFile(e) {
            var _this2 = this;

            var formData = new FormData();
            // only upload one file for now.
            formData.append("file", e.target.files[0]);

            // Make the POST request
            fetch(window.location.origin + "/photos", {
                method: 'POST',
                body: formData
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                _this2.setState({
                    uploaded: true,
                    response: result["data"]
                });
            }).catch(function (error) {
                return _this2.setState({
                    uploaded: false,
                    response: "Error uploading files"
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(PhotoApp, {
                uploaded: this.state.uploaded,
                message: this.state.response,
                handleChange: this.uploadFile
            });
        }
    }]);

    return PhotoAppContainer;
}(React.Component);

// render the widget.


ReactDOM.render(React.createElement(PhotoAppContainer, null), document.querySelector('#'.concat(id)));