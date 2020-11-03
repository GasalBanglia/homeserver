var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * OurGamesForm.jsx
 *
 * Component class for displaying and managing a form that
 * collects the values for a SQL insert query. The values 
 * will be inserted 
 *
 * This is the presentational class. The container class is 
 * OurGamesContainer.
 *
 */

export var OurGamesForm = function (_React$Component) {
    _inherits(OurGamesForm, _React$Component);

    function OurGamesForm() {
        _classCallCheck(this, OurGamesForm);

        return _possibleConstructorReturn(this, (OurGamesForm.__proto__ || Object.getPrototypeOf(OurGamesForm)).apply(this, arguments));
    }

    _createClass(OurGamesForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var inputs = [];

            // Arrays of ENUM values for certain columns.
            var esrb_ratings = ['E', 'E10+', 'T', 'M', 'AO', 'RP'];
            var genres = ['action', 'action/adventure', 'adventure', 'role-playing', 'simulation', 'strategy', 'sports', 'board/card', 'MMO', 'party', 'other'];

            // divide the columns up by input type.
            var text_types = ["title", "console", "developer"];
            var text_areas_types = ["description"];
            var select_types = ["esrb_rating", "genre"];
            var date_types = ["release_date"];
            var num_types = ["max_players", "metacritic_rating"];
            var bool_types = ["has_online"];

            text_types.forEach(function (name) {
                return inputs.push(React.createElement(
                    'div',
                    { key: "input-" + name, style: { display: 'inline-block' } },
                    React.createElement(
                        'label',
                        null,
                        name + ":",
                        ' (',
                        _this2.props.values['description'].length,
                        ' chars)',
                        React.createElement('input', {
                            type: 'text',
                            value: _this2.props.values[name],
                            name: name,
                            onChange: _this2.props.onChange
                        })
                    )
                ));
            });

            // Now for the enums 
            // First create the list of enums for esrb_ratings
            var esrb_options = [];
            esrb_ratings.forEach(function (o) {
                return esrb_options.push(React.createElement(
                    'option',
                    { key: "option-" + o, value: o },
                    o
                ));
            });

            // push it onto the inputs array.
            inputs.push(React.createElement(
                'div',
                { key: "input-" + 'esrb', style: { display: 'inline-block' } },
                React.createElement(
                    'label',
                    null,
                    "esrb_rating:",
                    React.createElement(
                        'select',
                        {
                            name: 'esrb_rating',
                            value: this.props.values["esrb_rating"],
                            onChange: this.props.onChange },
                        esrb_options
                    )
                )
            ));

            // Next create the list of enums for genres
            var genre_options = [];
            genres.forEach(function (o) {
                return genre_options.push(React.createElement(
                    'option',
                    { key: 'option-' + o, value: o },
                    o
                ));
            });

            // push it onto the inputs array.
            inputs.push(React.createElement(
                'div',
                { key: 'input-genre', style: { display: 'inline-block' } },
                React.createElement(
                    'label',
                    null,
                    "genre:",
                    React.createElement(
                        'select',
                        {
                            name: 'genre',
                            value: this.props.values["genre"],
                            onChange: this.props.onChange },
                        genre_options
                    )
                )
            ));

            // Next, do the textarea-type description 
            inputs.push(React.createElement(
                'div',
                { key: 'input-description', style: { display: 'inline-block' } },
                React.createElement(
                    'label',
                    null,
                    'Description (',
                    this.props.values['description'].length,
                    ' chars)'
                ),
                React.createElement('textarea', {
                    value: this.props.values['description'],
                    onChange: this.props.onChange,
                    name: 'description' })
            ));

            // Now Release date, an <input> with type='date'
            inputs.push(React.createElement(
                'div',
                { key: 'input-date', style: { display: 'inline-block' } },
                React.createElement(
                    'label',
                    null,
                    "Date:",
                    React.createElement('input', {
                        value: this.props.values['date'],
                        name: 'release_date',
                        type: 'date',
                        onChange: this.props.onChange })
                )
            ));

            // Now, for the numerical types 
            // First, the metacritic rating, a score between 0 and 100.
            inputs.push(React.createElement(
                'div',
                { key: 'input-metacritic', style: { display: 'inline-block' } },
                React.createElement(
                    'label',
                    null,
                    "MetaCritic Rating",
                    React.createElement('input', {
                        name: 'metacritic_rating',
                        type: 'number',
                        min: '0', max: '100',
                        value: this.props.values['metacritic_rating'],
                        onChange: this.props.onChange })
                )
            ));

            // Next, the maximum number of players, which I will allow to 
            // be between 1 and 16. I'm talking maximum number of players allowed
            // on a local system, not across systems via LAN or the internet.
            inputs.push(React.createElement(
                'div',
                { key: 'input-players', style: { display: 'inline-block' } },
                React.createElement(
                    'label',
                    null,
                    "Max Number of Players (per system)",
                    React.createElement('input', {
                        name: 'max_players',
                        type: 'number',
                        min: '1', max: '16',
                        value: this.props.values['max_players'],
                        onChange: this.props.onChange })
                )
            ));

            // finally, we do the BOOLEAN column, "has_online". 
            // Does it have an online component?
            // I use the 'checkbox' input type.
            inputs.push(React.createElement(
                'div',
                { key: 'input-online', style: { display: 'inline-block' } },
                React.createElement('input', {
                    name: 'has_online',
                    type: 'checkbox',
                    checked: this.props.values['has_online'],
                    onChange: this.props.onChange }),
                React.createElement(
                    'label',
                    null,
                    "Has Online?"
                )
            ));

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'input-container' },
                    inputs
                ),
                React.createElement(
                    'button',
                    { onClick: this.props.onClick },
                    'Insert Values'
                ),
                React.createElement(
                    'p',
                    null,
                    'Inserted: ',
                    this.props.success ? "Yes" : "No"
                ),
                React.createElement(
                    'p',
                    null,
                    'Request Returned: ',
                    this.props.posted ? "Yes" : "No"
                ),
                React.createElement(
                    'p',
                    null,
                    'Return Status: ',
                    this.props.return_status
                )
            );
        }
    }]);

    return OurGamesForm;
}(React.Component);