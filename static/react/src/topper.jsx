class Topper extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:true,
            color:"goldenrod",
            background:"black",
        }
        this.randomizeColors = this.randomizeColors.bind(this);
    }

    randomizeColors() {
        let rgb = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];
        let color = String("rgb(");
        rgb.forEach( (value, i) => {
            color += (String(value)) + (i < 2 ? "," : "");
        });
        color = color.concat(")");
        
        rgb = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];
        let background = String("rgb(");
        rgb.forEach( (value, i) => {
            background += (String(value)) + (i < 2 ? "," : "");
        });
        background = background.concat(")");

        this.setState({
            color:color,
            background:background
        });
    }



    render(){
        let c = ""
        if (this.state.visible){
            c = this.state.color;
        }
        else{
            c = this.state.background;
        }

        return (
            <div onClick={this.randomizeColors}>
                 <h1 style = {{backgroundColor:this.state.background, color:c,textAlign:"center"}}> Welcome "Neighbor" <br/> You look cute today </h1>
            </div>
        )
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({
                visible:!this.state.visible
            })
        }, 1000)
    }

}

ReactDOM.render(<Topper/>,document.querySelector("#topper"))
