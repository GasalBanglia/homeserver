

export class FavoriteLinks extends React.Component {
    render() {

        let linkList = [];
        let i = 0

        // Turn our list of links into a list of JSX
        for (let link in this.props.links) {
            linkList.push(
                (
                    <li key={"li-" + i}>
                        <a href={this.props.links[link]}>
                            {link}
                        </a>
                    </li>
                )
            )
            i += 1;
        }

        return (
            <div>
                <h3>Favorite Links</h3>
                <ul>
                {linkList.length ? linkList : <li>No items yet.</li>}
                </ul>
            </div>
        );
    }
}

