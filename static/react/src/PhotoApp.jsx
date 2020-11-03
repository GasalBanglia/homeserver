

export class PhotoApp extends React.Component {
    render() {

        return (
            <div>
              <label>Choose a file to upload:</label>
              <br/>
              <input type="file"
                     id="image_select"
                     name="image_select"
                     onChange={this.props.handleChange}
              />
              <br/>
              <p style={{color:'red'}}>{this.props.message}</p>
            </div> 
        );

    }
}
