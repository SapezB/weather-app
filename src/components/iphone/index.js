// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

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

	
	
	

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		console.log(category)
		// display all weather data
		if(category=="Rain"){
			return (
				<div class={ style.containerrainy }>
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
			 			{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
			 		</div>
				</div>
			);
		}
		else if(category=="Clear"){
			return (
				<div class={ style.containersunny }>
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
			 			{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
			 		</div>
				</div>
			);
		}
		else{
			return (
				<div class={ style.containercloudy }>
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
			 			{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
			 		</div>
				</div>
			
			);
		}
		
	};

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
