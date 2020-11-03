var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * RecipeView.jsx
 *
 * Component class for displaying the results of a query to 
 * a recipe-search API. 
 *
 * Currently, we are using the Edamam API.
 *
 * This class handles both the container and presentational 
 * operations, for now. Why? I don't want to work with more files.
 *
 * Both RecipeView and SearchForm are contained within another class,
 * RecipeContainer, which selects which to render.
 *
 * The submit methods for each sub class call an inherited RecipeContainer
 * method. This lets the container know to render the other 
 * sub component.
 */

export var RecipeView = function (_React$Component) {
    _inherits(RecipeView, _React$Component);

    function RecipeView() {
        _classCallCheck(this, RecipeView);

        return _possibleConstructorReturn(this, (RecipeView.__proto__ || Object.getPrototypeOf(RecipeView)).apply(this, arguments));
    }

    _createClass(RecipeView, [{
        key: 'render',
        value: function render() {
            // Convert the json string into an object.
            var recipe = JSON.parse(this.props.recipes);
            var recipeImg = recipe.image;
            var numIngr = recipe.ingredients.length;
            var ingredients = recipe.ingredients.map(function (ingr, i) {
                //let img_source = ingr.image;
                return React.createElement(
                    'li',
                    { key: "ingr_" + i },
                    React.createElement('img', { src: ingr.image, style: { display: 'inline-block', height: '20px' }, alt: '' }),
                    ingr.text
                );
            });
            // <img src={recipe.image} style={{height:'100px', textAlign:'center', display:'inline-block', backgroundColor:'black', color:'white', verticalAlign:'middle'}} alt="No image" />
            return React.createElement(
                'div',
                { style: { backgroundImage: 'url("' + recipeImg + '")', backgroundSize: 'cover' } },
                React.createElement(
                    'h1',
                    { style: { backgroundColor: 'rgba(255,255,255,0.65)', color: 'navyblue' } },
                    recipe.label
                ),
                React.createElement(
                    'div',
                    { 'class': 'ingredients-container', style: { display: 'inline-block' } },
                    React.createElement(
                        'ul',
                        { style: { backgroundColor: 'rgba(200,200,200,0.65)', display: 'inline-block', padding: '30px' } },
                        React.createElement(
                            'lh',
                            null,
                            React.createElement(
                                'b',
                                null,
                                'There are ',
                                numIngr,
                                ' ingredients'
                            )
                        ),
                        ingredients
                    )
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'a',
                        { style: { backgroundColor: 'rgba(150,255,100,.65)', fontSize: '25px' }, href: recipe.url },
                        'Link to Recipe on ',
                        recipe.source
                    ),
                    React.createElement(
                        'button',
                        { style: { margin: '20px', marginLeft: '50px', height: '30px', borderRadius: '4px', borderRight: 'solid 3px', borderBottom: 'solid 3px' }, onClick: this.props.onClick },
                        ' Search Again '
                    )
                )
            );
        }
    }]);

    return RecipeView;
}(React.Component);