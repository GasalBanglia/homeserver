

export class Supplements extends React.Component {
    render() {
        let message = this.props.takenToday ? "Leo already took his supplement today." : "Leo has NOT taken his supplement today.";

        let button = this.props.takenToday ? "" : (
            <button onClick={this.props.onClick}>
                Take Supplement
            </button>
        );

        return (
            <div>
                <p>{message}</p>
                {button}
            </div>
        );
    }
}

