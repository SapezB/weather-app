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
			screen: 'Home'
		};
	}
    printLoc() {
        console.log(this.state.value);
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
                            <button class = 'Location' onClick={this.switchToLoc}>Loc</button>
                            <button class="Settings" onClick={this.switchToSet}>Settings</button>
                        </div>
                        <div class="mid">
                            <p class={ style.header }>Temperature</p>
                        </div>
                        <div class="bot">
                            <button class = 'mic'>mic</button>
                            <button class ='speak'>speak</button>
                        </div>
                        <div>
                            <p>{this.state.value}</p>
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


