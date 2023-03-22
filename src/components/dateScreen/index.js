import { render, h ,Component } from "preact";
import HomeScreen from '../homeScreen';
import Button from '../button';


export default class settingsScreen extends Component{

    constructor(props) {
		super(props);
		this.state = {
			screen: 'Date',
            categroy: this.props.categroy
		};
	}
    switchToHome = () =>{
        this.setState({ screen : 'Home' })
    }

    render(){
        if(this.state.screen == 'Date'){
            return(
                <div>
                    <h1>Date screen</h1>
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