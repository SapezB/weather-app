import { render, h ,Component } from "preact";
import HomeScreen from '../homeScreen';
import Button from '../button';


export default class settingsScreen extends Component{

    constructor(props) {
		super(props);
		this.state = {
			screen: 'Set'
		};
	}
    switchToHome = () =>{
        this.setState({ screen : 'Home' })
    }


    render(){
        if(this.state.screen == 'Set'){
            return(
                <div>
                    <h1>Settings screen</h1>
                    <Button class='Back' clickFunction = {this.switchToHome}/>
                </div>
            );
        }
        else if (this.state.screen == 'Home'){
            return(
                <HomeScreen/>
            );
        }
    }

}