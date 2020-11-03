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

export class OurGamesForm extends React.Component {

    render() {
        let inputs = [];

        // Arrays of ENUM values for certain columns.
        const esrb_ratings = [ 'E', 'E10+', 'T', 'M', 'AO', 'RP'];
        const genres = ['action', 'action/adventure', 'adventure', 'role-playing', 'simulation', 'strategy', 'sports', 'board/card', 'MMO', 'party', 'other'];

        // divide the columns up by input type.
        const text_types = ["title", "console", "developer"];
        const text_areas_types = ["description"];
        const select_types = ["esrb_rating", "genre"];
        const date_types = ["release_date"];
        const num_types = ["max_players", "metacritic_rating"];
        const bool_types = ["has_online"];

        text_types.forEach(name => inputs.push( 
                (
                <div key={"input-" + name} style={{display:'inline-block'}}>
                <label>
                    {name + ":"} ({this.props.values['description'].length} chars)
                    <input 
                        type="text" 
                        value={this.props.values[name]}
                        name={name}
                        onChange={this.props.onChange}
                    />
                </label>
                </div>
                )
            )
        )

        // Now for the enums 
        // First create the list of enums for esrb_ratings
        let esrb_options = [];
        esrb_ratings.forEach( o => esrb_options.push(<option key={"option-" + o} value={o}>{o}</option>) );

        // push it onto the inputs array.
        inputs.push(
            (
                <div key={"input-" + 'esrb'}style={{display:'inline-block'}}>
                    <label>
                        {"esrb_rating:"}
                        <select 
                            name="esrb_rating"
                            value={this.props.values["esrb_rating"]}
                            onChange={this.props.onChange} >
                            {esrb_options}
                        </select>
                    </label>
                </div>
            )
        );
        
        // Next create the list of enums for genres
        let genre_options = [];
        genres.forEach( o => genre_options.push(<option key={'option-' + o} value={o}>{o}</option>) );

        // push it onto the inputs array.
        inputs.push(
            (
                <div key="input-genre" style={{display:'inline-block'}}>
                    <label>
                        {"genre:"}
                        <select 
                            name="genre"
                            value={this.props.values["genre"]}
                            onChange={this.props.onChange} >
                            {genre_options}
                        </select>
                    </label>
                </div>
            )
        );

        // Next, do the textarea-type description 
        inputs.push(
            (
                <div key="input-description" style={{display:'inline-block'}}>
                    <label>Description ({this.props.values['description'].length} chars)</label>
                    <textarea 
                        value={this.props.values['description']}
                        onChange={this.props.onChange}
                        name="description" >
                    </textarea>
                </div>
            )
        );


        // Now Release date, an <input> with type='date'
        inputs.push(
            (
                <div key="input-date" style={{display:'inline-block'}}>
                    <label>
                    {"Date:"}
                        <input 
                            value={this.props.values['date']}
                            name="release_date" 
                            type="date" 
                            onChange={this.props.onChange}/>
                    </label>
                </div>
            )
        );

        // Now, for the numerical types 
        // First, the metacritic rating, a score between 0 and 100.
        inputs.push(
            (
                <div key="input-metacritic" style={{display:'inline-block'}}>
                    <label>
                    {"MetaCritic Rating"}
                        <input 
                            name="metacritic_rating"
                            type="number"
                            min='0' max='100'
                            value={this.props.values['metacritic_rating']}
                            onChange={this.props.onChange} />
                    </label>
                </div>
            )
        );
        
        // Next, the maximum number of players, which I will allow to 
        // be between 1 and 16. I'm talking maximum number of players allowed
        // on a local system, not across systems via LAN or the internet.
         inputs.push(
            (
                <div key="input-players" style={{display:'inline-block'}}>
                    <label>
                    {"Max Number of Players (per system)"}
                        <input 
                            name="max_players"
                            type="number"
                            min='1' max='16'
                            value={this.props.values['max_players']}
                            onChange={this.props.onChange} />
                    </label>
                </div>
            )
        );       

        // finally, we do the BOOLEAN column, "has_online". 
        // Does it have an online component?
        // I use the 'checkbox' input type.
         inputs.push(
            (
                <div key="input-online" style={{display:'inline-block'}}>
                    <input 
                        name="has_online"
                        type="checkbox"
                        checked={this.props.values['has_online']}
                        onChange={this.props.onChange} />
                    <label>{"Has Online?"}</label>
                </div>
            )
        );       


        return (
            <div> 
                <div className="input-container" >
                    {inputs}
                </div>
                <button onClick={this.props.onClick}>Insert Values</button>
                <p>Inserted: {this.props.success ? "Yes" : "No"}</p>
                <p>Request Returned: {this.props.posted ? "Yes" : "No"}</p>
                <p>Return Status: {this.props.return_status}</p>
            </div>
        )
    }
}
            
                    


