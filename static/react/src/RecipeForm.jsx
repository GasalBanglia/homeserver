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

export class RecipeForm extends React.Component {

    render() {
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
        return (
        <div> 
            <script src="https://developer.edamam.com/attribution/badge.js"></script>
            <div style={{background:'white', borderRadius:'25px', border:'black 2px solid', margin:'auto', width:'500px', height:'50px'}}>
                <div style={{margin:'auto', height:'100%', display:'inline-block'}} >
                    <img src={window.location.origin + '/static/edamam-badge.png'} />
                </div>
                <div className="input-container" >
                    <input 
                        type='text' 
                        value={this.props.values['q']} 
                        name='q' 
                        onChange={this.props.onChange} 
                            />
                </div>
            </div>
            <div style={{margin:'auto', width:'100px', marginTop:'12px'}}>
                <button className='edamam-search-button' onClick={this.props.onClick}>
                    Search
                </button>
            </div>
        </div>
        );
    }
}
            
                    


