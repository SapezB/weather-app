// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import HomeScreen from '../homeScreen'
>>>>>>> 2d0fd3005b786937e8f0b6ad341ba6bdcc3dd4c6
=======
>>>>>>> parent of b1ce41b (Merge branch 'Ben' into Milena)
=======
import HomeScreen from '../homeScreen';
import darkBlue from "/Users/bensapezinskas/Documents/GitHub/weather-app/src/assets/backgrounds/darkblue.jpg";
import skyBlue from "/Users/bensapezinskas/Documents/GitHub/weather-app/src/assets/backgrounds/skyblue.jpg"

>>>>>>> parent of 14b6d5a (Update index.js)

var category
export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.state = { weather : 'Cloudy'}
		this.image = darkBlue
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// my API key: 1812aa1047a527c9537d5e2315c80ba0
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=1812aa1047a527c9537d5e2315c80ba0";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

<<<<<<< HEAD
	
	
	
=======
	checkBackground = () =>{
		console.log(this.state.weather)
		if (this.state.weather == 'Cloudy'){
			this.image = darkBlue
		}
		else if(this.state.weather == 'Sunny'){
			this.image = skyBlue
		}
	}
>>>>>>> Ben

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
<<<<<<< HEAD
		console.log(category)
		// display all weather data
		if(category=="Rain"){
			return (
				<div class={ style.containerrainy }>
					<HomeScreen/>
				</div>
			);
		}
		else if(category=="Clear"){
			return (
				<div class={ style.containersunny }>
					<HomeScreen/>
				</div>
			);
		}
		else{
			return (
				<div class={ style.containercloudy }>
					<HomeScreen/>
				</div>
			
			);
		}
		
	};
=======
		
		//sets image variable to be the bakcgbround of the current state
		if (this.state.weather == 'Cloudy'){
			this.image = darkBlue
		}
		else if(this.state.weather == 'Sunny'){
			this.image = skyBlue
		}


		// display all weather dataz
		return (
			<div class = {style.container} style={{ backgroundImage:`url(${this.image})` }}>
				<HomeScreen/>
			</div>
			
		);
	}
>>>>>>> Ben

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var icon = parsed_json['weather']['0']['icon'];
		var main = parsed_json['weather']['0']['main']
		category=main;

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
