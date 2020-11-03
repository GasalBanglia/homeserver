import { FavoriteLinks } from "./FavoriteLinks.js";

const id = "favorite-links";

{
    let div = document.createElement("DIV");
    div.classList.add("side-widget");
    div.id = id;
    div.style.backgroundColor = 'dodgerblue';
    let container = document.querySelector('#sidebar').prepend(div);

}

// Dictionary of links and their display names.
const links = {
    'Mozilla Developer Network': 'https://developer.mozilla.org/en-US',
    'CareerOneStop': 'https://www.careeronestop.org/',

}

/*
 * FavoriteLinksContainer
 *
 * Class to hold my links. Pretty basic.
 * It is a simple unordered list for now.
 * The links are stored here as well, in a dictionary.
 * 
 */
class FavoriteLinksContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { links: links };
    }

    render() {
        return (
            <FavoriteLinks links={this.state.links} />
        );
    }

}
//
//Render the component.
ReactDOM.render(
    <FavoriteLinksContainer />, 
    document.querySelector("#".concat(id))
);
