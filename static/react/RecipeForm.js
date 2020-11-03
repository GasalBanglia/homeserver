var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * RecipeForm.jsx
 *
 * Component class for displaying and managing a form that
 * collects parameters values for a URL to be sent to a 
 * recipe-search API.
 *
 * Currently, we are using the Edamam API.
 *
 * This class handles both the container and presentational 
 * operations. This is because it is a form, a structure I am 
 * unfamiliar with. Once I am comfortable, I will separate them.
 *
 * Both RecipeView and SearchForm are contained within another class,
 * RecipeContainer, which selects which to render.
 *
 * The submit methods for each sub class call an inherited RecipeContainer
 * method. This lets the container know to render the other 
 * sub component.
 */

export var RecipeForm = function (_React$Component) {
    _inherits(RecipeForm, _React$Component);

    function RecipeForm() {
        _classCallCheck(this, RecipeForm);

        return _possibleConstructorReturn(this, (RecipeForm.__proto__ || Object.getPrototypeOf(RecipeForm)).apply(this, arguments));
    }

    _createClass(RecipeForm, [{
        key: 'render',
        value: function render() {
            // ATTENTION: Only do this for advanced search
            // Create a list of labeled inputs which respond 
            // to onChange events.

            /*
            let inputs = [];
            for (let v in this.props.values) {
                inputs.push( 
                    (
                    <label key={"recipe-param_" + v}>
                        {v + ":"}
                        <input 
                            type="text" 
                            value={this.props.values[v]}
                            name={v}
                            onChange={this.props.onChange}
                        />
                    </label>
                    )
                )
            }
            */

            // We are only using the 'q' parameter for now.
            return React.createElement(
                'div',
                null,
                React.createElement('script', { src: 'https://developer.edamam.com/attribution/badge.js' }),
                React.createElement(
                    'div',
                    { style: { background: 'white', borderRadius: '25px', border: 'black 2px solid', margin: 'auto', width: '500px', height: '50px' } },
                    React.createElement(
                        'div',
                        { style: { margin: 'auto', height: '100%', display: 'inline-block' } },
                        React.createElement('img', { src: window.location.origin + '/static/edamam-badge.png' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'input-container' },
                        React.createElement('input', {
                            type: 'text',
                            value: this.props.values['q'],
                            name: 'q',
                            onChange: this.props.onChange
                        })
                    )
                ),
                React.createElement(
                    'div',
                    { style: { margin: 'auto', width: '100px', marginTop: '12px' } },
                    React.createElement(
                        'button',
                        { className: 'edamam-search-button', onClick: this.props.onClick },
                        'Search'
                    )
                )
            );
        }
    }]);

    return RecipeForm;
}(React.Component);