
import { PhotoApp } from "./PhotoApp.js";

// begin by setting up the widget container
const id = "photo-app";

{
    let div = document.createElement("DIV");
    div.classList.add("main-widget");
    div.id = id;
    div.style.backgroundColor = 'cerulean';
    let container = document.querySelector('#widget-container').prepend(div);

}




class PhotoAppContainer extends React.Component {
    constructor(props) {
        super(props);

        //set initial state
        this.state = {
            uploaded: false,
            response: "",
        };

        // bind this to state-setting methods.
        this.uploadFile = this.uploadFile.bind(this);
    }

    // responses to an onchange event from the file input element
    uploadFile(e) {
       const formData = new FormData();
        // only upload one file for now.
        formData.append("file", e.target.files[0]);
        
        // Make the POST request
        fetch(window.location.origin + "/photos",
            {
                method: 'POST',
                body: formData
            })
        .then(response => response.json())
        .then(result => {
            this.setState({
                uploaded: true,
                response: result["data"]
            });
        })
        .catch(error =>
            this.setState({
                uploaded: false,
                response: "Error uploading files"
            })
        );
    }

    render() {
        return (
            <PhotoApp 
                uploaded={this.state.uploaded}
                message={this.state.response}
                handleChange={this.uploadFile}
            />
        );
    }
}

// render the widget.
ReactDOM.render( 
    <PhotoAppContainer />,
    document.querySelector('#'.concat(id))
);

