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

export class RecipeView extends React.Component {
    render() {
        // Convert the json string into an object.
        let recipe = JSON.parse(this.props.recipes);
        let recipeImg = recipe.image;
        let numIngr = recipe.ingredients.length;
        let ingredients = recipe.ingredients.map( (ingr, i) => {
            //let img_source = ingr.image;
            return (
                <li key={"ingr_" + i}>

                    <img src={ingr.image} style={{display:'inline-block', height:'20px'}} alt="" />
                    {ingr.text}
                </li>
            );
        })
                    // <img src={recipe.image} style={{height:'100px', textAlign:'center', display:'inline-block', backgroundColor:'black', color:'white', verticalAlign:'middle'}} alt="No image" />
        return (
            <div style={{backgroundImage:'url("'+recipeImg+'")', backgroundSize:'cover'}}>
                <h1 style={{backgroundColor:'rgba(255,255,255,0.65)', color:'navyblue'}}>{recipe.label}</h1>
                <div class="ingredients-container" style={{display: 'inline-block'}}>
                    <ul style={{backgroundColor:'rgba(200,200,200,0.65)', display:'inline-block', padding:'30px'}}>
                        <lh><b>There are {numIngr} ingredients</b></lh>
                        {ingredients}
                    </ul>
                </div>
                <br/>
                <div>
                    <a style={{backgroundColor:'rgba(150,255,100,.65)', fontSize:'25px'}} href={recipe.url}>Link to Recipe on {recipe.source}</a>
                    <button style={{margin:'20px', marginLeft:'50px', height:'30px', borderRadius:'4px', borderRight:'solid 3px', borderBottom:'solid 3px'}} onClick={this.props.onClick}> Search Again </button> 
                </div>
            </div>);
        }
}
