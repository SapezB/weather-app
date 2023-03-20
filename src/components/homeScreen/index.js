import { h, render, Component , useState} from 'preact';
import SettingsScreen from '../settingsScreen';
import Button from '../button';
import style from './style';
import LocScreen from '../locScreen';
import DateScreen from '../dateScreen'

export default class homeScreen extends Component{
    
    constructor(props) {
		super(props);
		this.state = {
			screen: 'Home',
            location: 'London' ,
		};
	}

    handleLocationChange = (e) => {
        this.setState({location: e.target.value});
        this.props.setLocation(e.target.value);
      }
   
    printLoc() {
        console.log("Loc: ",this.state.location);
    }

    switchToSet = () =>{
        this.setState({ screen : 'Set' })
    }

    switchToLoc = () =>{
        this.setState({ screen : 'Loc'})
    }

    switchToDate = () =>{
        this.setState({ screen : 'Date'})
    }

	render() {
        if (this.state.screen == 'Home'){
            return (
                    <div>
                        <div class = 'top'>
                            <button class = 'Date' onClick={this.switchToDate}>20/2/23</button>
                            <button class = 'Location' onClick={this.switchToLoc}>{this.props.location || this.state.location} {/* show current location */}</button>
                            <button class="Settings" onClick={this.switchToSet}>Settings</button>
                        </div>
                        <div class="mid">
                            <p class={ style.header }>Temperature</p>
                            <p>  {this.props.location}</p>
                        </div>
                        <div class="bot">
                            <button class = 'mic'>mic</button>
                            <button class ='speak'>speak</button>
                            {console.log("location :", this.state.location)}
                        </div>
                    </div>
            );
        }
        else if (this.state.screen ==  'Set'){
            return(
                <div>
                    <SettingsScreen/>
                </div>
            )
        }
        else if(this.state.screen == 'Loc'){
            return(
                <div>
                    <LocScreen/>
                </div>
            )
        }
        else if(this.state.screen == 'Date'){
            return(
                <div>
                    <DateScreen/>
                </div>
            )
        }
	}
}


