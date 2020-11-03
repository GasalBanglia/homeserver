
export class OurGamesSelector extends React.Component {
    render() {
        let info;
        if (this.props.game_info === null) {
            info = (
                <div>
                    <h2>Click the Button to Select a Game</h2>
                </div>
            )
        }
        else {
        info = (
            <div>
                <h2>{"You Should Play " + this.props.game_info['title']}</h2>
                <h3>{this.props.game_info['system']}</h3>
                <p>{this.props.game_info['description']}</p>
            </div>
        )
        }


        return ( 
            <div>
                {info}
                <button onClick={this.props.selectGame}>Select Game</button>
            </div>
        );

    }
}
