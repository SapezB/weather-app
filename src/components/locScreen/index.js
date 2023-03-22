import { render, h ,Component } from "preact";
import HomeScreen from '../homeScreen';
import Button from '../button';


export default class locScreen extends Component{

    constructor(props) {
		super(props);
		this.state = {
			screen: 'Loc',
            category: this.props.category
		};
	}
    switchToHome = () =>{
        this.setState({ screen : 'Home' })
    }

    render(){
        if(this.state.screen == 'Loc'){
            return(
                <div>
                    <h1>Location screen</h1>
                    <Button class='Back' clickFunction = {this.switchToHome}/>
                </div>
            );
        }
        else if (this.state.screen == 'Home'){
            return(
                <HomeScreen categroy ={this.state.category}/>
            );
        }
    }

}