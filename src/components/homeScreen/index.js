import { h, render, Component , useState} from 'preact';
import SettingsScreen from '../settingsScreen';
import Button from '../button';
import style from './style';
import LocScreen from '../locScreen';
import DateScreen from '../dateScreen'
import style_iphone from '../button/style_iphone';
import $ from 'jquery';

export default class homeScreen extends Component{
    
    constructor(props) {
		super(props);
		this.state = {
			screen: 'Home',
            category: this.props.category,
            display: true
,
            location: 'London' ,
            unit:'metric'
		};
	}


    handleLocationChange = (e) => {
        this.setState({location: e.target.value});
        this.props.setLocation(e.target.value);
      }
      
    handleUnitChange = (e) => {
        this.setState({unit: e.target.value});
        this.props.setUnit(e.target.value);
    }

    	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
        const location = this.props.location || 'London';
        const unit = this.props.unit|| 'metric';
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// my API key: 1812aa1047a527c9537d5e2315c80ba0
		// another API key in case the other one gets blocked: 2915cce6a56b729abba54554662da808
		var url = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&units="+unit+"&APPID=2915cce6a56b729abba54554662da808";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

   
    printLoc() {
        console.log("Loc: ",this.state.location);
    }

    switchToSet = () =>{
        this.setState({ screen : 'Set' })
    }


    switchToDate = () =>{
        this.setState({ screen : 'Date'})
    }

	render() {
        const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
        if (this.state.screen == 'Home'){
                return (
                    <div>
                        <div class = 'top'>
                            <button class = 'Date' onClick={this.switchToDate}>20/2/23</button>
                            <button class="Settings" onClick={this.switchToSet}>Settings</button>
                        </div>
                        <div class="mid">
                                <div class={ style.header }>
                                <div class={ style.city }>{ this.state.locate }</div>
                                {/* <div><img src="http://openweathermap.org/img/wn/${
                                        this.state.icon
                                }@4x.png"/></div> */}
                                <div class={ style.conditions }>{ this.state.cond }</div>
                                <span class={ tempStyles }>{ this.state.temp }</span>
                            </div>
                            <div class={ style.details }></div>
                            <div class= { style_iphone.container }> 
                                { this.state.display ? <Button class={style_iphone.button } name = 'Fetch Weather Data' clickFunction={ this.fetchWeatherData }/ > : null }
                            </div>
                           
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
        else if(this.state.screen == 'Date'){
            return(
                <div>
                    <DateScreen/>
                </div>
            )
        }
	}

    parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var icon = parsed_json['weather']['0']['icon'];
		var main = parsed_json['weather']['0']['main']

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			icon: icon,
			main: main
			//if main=== Clear -> sunny.png
			//if main=== Clouds -> cloudy.png
			//if main=== Rain -> rainy.png
		});      
	}

}




