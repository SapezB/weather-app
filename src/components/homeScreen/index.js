import { h, render, Component, useState, useEffect } from 'preact';
import SettingsScreen from '../settingsScreen';
import Button from '../button';
import style from './style';
import DateScreen from '../dateScreen';
import style_iphone from '../button/style_iphone';
import $, { data } from 'jquery';
//import icons for buttons
import { FaMicrophone } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { BsWind } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';

function speaking123() {
	//function for our speaking chatbot that takes in users voice and returns an answer based on the input
	const recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	//some answers for the possible inputs
	const weatherTodayBot = new SpeechSynthesisUtterance("The weather today is cloudy and rainy with a highest of 15 degrees.");
	const goodbyeBot = new SpeechSynthesisUtterance("Goodbye");
	const hi = new SpeechSynthesisUtterance("hello");
	const tomorrowWeatherBot = new SpeechSynthesisUtterance("tomorrow it will be cloudy and rainy with a high of 13 degrees");
	const rainTomorrowBot= new SpeechSynthesisUtterance("i believe it will rain tomorrow");
	const another= new SpeechSynthesisUtterance("please press the button again to ask another question");

	//if and else, takes in users voice input and returns response based on input
	recognition.onresult = function(event) {
		const speechToTex = event.results[0][0].transcript;
		console.log(speechToTex);
		if (speechToTex.toLowerCase().includes('what is the weather like today')) {
			window.speechSynthesis.speak(weatherTodayBot);
			window.speechSynthesis.speak(another);
		} else if (speechToTex.toLowerCase().includes('goodbye')) {
			window.speechSynthesis.speak(goodbyeBot);
			recognition.stop();
		} else if (speechToTex.toLowerCase().includes('will it rain today')) {
			window.speechSynthesis.speak(rainTomorrowBot);
			window.speechSynthesis.speak(another);
		} else if (speechToTex.toLowerCase().includes('what is the weather like tomorrow')) {
			window.speechSynthesis.speak(tomorrowWeatherBot);
			window.speechSynthesis.speak(another);
		} else if (speechToTex.toLowerCase().includes('hello')) {
			window.speechSynthesis.speak(hi);
			window.speechSynthesis.speak(another);
		}
	};
	//start the microphone to allow user to speak
	recognition.start();
}

export default class homeScreen extends Component {
	constructor(props) {
		super(props);
		var today = new Date(),
			date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

		this.state = {
			screen: 'Home',
			display: true,
			currentDate: date,
			location: 'London',
			unit: 'metric',
			main: 'Sunny',
			buttonsDisplay: false 
		};
		this.msg = new SpeechSynthesisUtterance(); //creates an object to turn text into speech
	}

	handleLocationChange = (e) => {
		this.setState({ location: e.target.value });
		this.props.setLocation(e.target.value);
	};

	handleUnitChange = (e) => {
		this.setState({ unit: e.target.value });
		this.props.setUnit(e.target.value);
	};

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// my API key: 1812aa1047a527c9537d5e2315c80ba0
		// another API key in case the other one gets blocked: 2915cce6a56b729abba54554662da808
		var url =
			'http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=2915cce6a56b729abba54554662da808';
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: this.parseResponse,
			error: function(req, err) {
				console.log('API call failed ' + err);
			}
		});
		// once the data grabbed, hide the button
		this.setState({ display: false, buttonsDisplay: true });
	};

	switchToSet = () => {
		//function to switch to settingscreen
		this.setState({ screen: 'Set' });
	};
	handleLocationChange = (e) => {
		//function to change location
		this.setState({ location: e.target.value });
		this.props.setLocation(e.target.value);
	};

	handleUnitChange = (e) => {
		//changes the unit
		this.setState({ unit: e.target.value });
		this.props.setUnit(e.target.value);
	};

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		const location = this.props.location || 'London';
		const unit = this.props.unit || 'metric';
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// my API key: 1812aa1047a527c9537d5e2315c80ba0
		// another API key in case the other one gets blocked: 2915cce6a56b729abba54554662da808
		var url =
			'http://api.openweathermap.org/data/2.5/weather?q=' +
			location +
			'&units=' +
			unit +
			'&APPID=2915cce6a56b729abba54554662da808';
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: this.parseResponse,
			error: function(req, err) {
				console.log('API call failed ' + err);
			}
		});
		// once the data grabbed, hide the button
		this.setState({ display: false });
	};

	printLoc() {
		//changes to the lock screen

		console.log('Loc: ', this.state.location);
	}

	switchToDate = () => {
		//changes to the screen for 24 hour forcast
		this.setState({ screen: 'Date' });
	};

	speechHandler = () => {
		//reads the temperature out loud
		const message = 'The temperature is'.concat(this.state.temp); //takes the temperature from the api and concatonates it to a String
		this.msg.text = message;
		window.speechSynthesis.speak(this.msg);
	};

	componentDidMount(){
		this.fetchWeatherData()
	}

	render() {
		//homescreen
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		//Checking which screen to display
		if (this.state.screen == 'Home') {
			//Checking which background to display: cloudy, sunny or rainy
			if (this.state.main == 'Rain') {
				return (
					<div class={style.containerrainy}>
						<div class={style_iphone.container}>
							<button class={style_iphone.button} onClick={this.switchToDate}>
								{this.state.currentDate}
							</button>
							<button class={style_iphone.button} onClick={this.switchToSet}>
								<IoMdSettings />
							</button>
						</div>
						<div class={style.header}>
							<div class={style.city}>{this.state.locate}</div>
							<div class={style.conditions}>{this.state.cond}</div>
							<span class={tempStyles}>{this.state.temp}</span>
							{/* Hiding humidity and wind icons and displaying only when the data was fetched */}
							<div>
								{this.state.buttonsDisplay ? (
									<div class={style.conditions}>< BsWind /> {this.state.wind}</div>
								) : null}
								{this.state.buttonsDisplay ? (
									<div class={style.conditions}>< WiHumidity /> {this.state.humid}</div>
								) : null}
							</div>
						</div>
						<div class={style.details} />
						<div class={style_iphone.container}>
							{this.state.display ? (
								<Button
									class={style_iphone.button}
									name="Fetch Weather Data"
									clickFunction={this.fetchWeatherData}
								/>
							) : null}
						</div>
						<div class={style_iphone.container}>
							<button class="style_iphone.button" onClick={speaking123}>
								<FaMicrophone />
							</button>
							<button class="style_iphone.button" onClick={this.speechHandler}>
								<GiSpeaker />
							</button>
						</div>
					</div>
				);
			} else if (this.state.main == 'Clear') {
				return (
					<div class={style.containersunny}>
						<div class={style_iphone.container}>
							<button class={style_iphone.button} onClick={this.switchToDate}>
								{this.state.currentDate}
							</button>
							<button class={style_iphone.button} onClick={this.switchToSet}>
								<IoMdSettings />
							</button>
						</div>
						<div class={style.header}>
							<div class={style.city}>{this.state.locate}</div>
							<div class={style.conditions}>{this.state.cond}</div>
							<span class={tempStyles}>{this.state.temp}</span>
							{/* Hiding humidity and wind icons and displaying only when the data was fetched */}
							<div>
								{this.state.buttonsDisplay ? (
									<div class={style.conditions}>< BsWind /> {this.state.wind}</div>
								) : null}
								{this.state.buttonsDisplay ? (
									<div class={style.conditions}>< WiHumidity /> {this.state.humid}</div>
								) : null}
							</div>
							</div>
						<div class={style.details} />
						<div class={style_iphone.container}>
							{this.state.display ? (
								<Button
									class={style_iphone.button}
									name="Fetch Weather Data"
									clickFunction={this.fetchWeatherData}
								/>
							) : null}
						</div>
						<div class={style_iphone.container}>
							<button class="style_iphone.button" onClick={speaking123}>
								<FaMicrophone />
							</button>
							<button class="style_iphone.button" onClick={this.speechHandler}>
								<GiSpeaker />
							</button>
					</div>
					</div>
				);
			} else {
				return (
					<div class={style.containercloudy}>
						<div class={style_iphone.container}>
							<button class={style_iphone.button} onClick={this.switchToDate}>
								{this.state.currentDate}
							</button>
							<button class={style_iphone.button} onClick={this.switchToSet}>
								<IoMdSettings />
							</button>
						</div>
						<div class={style.header}>
							<div class={style.city}>{this.state.locate}</div>
							<div class={style.conditions}>{this.state.cond}</div>
							<span class={tempStyles}>{this.state.temp}</span>
							{/* Hiding humidity and wind icons and displaying only when the data was fetched */}
							<div>
								{this.state.buttonsDisplay ? (
									<div class={style.conditions}>
									<BsWind /> {this.state.wind}
									</div>
								) : null}
								{this.state.buttonsDisplay ? (
									<div class={style.conditions}>
									<WiHumidity /> {this.state.humid}
									</div>
								) : null}
							</div>
						</div>
						<div class={style.details} />
						<div class={style_iphone.container}>
							{this.state.display ? (
								<Button
									class={style_iphone.button}
									name="Fetch Weather Data"
									clickFunction={this.fetchWeatherData}
								/>
							) : null}
						</div>
						<div class={style_iphone.container}>
							<button class="style_iphone.button" onClick={speaking123}>
								<FaMicrophone />
							</button>
							<button class="style_iphone.button" onClick={this.speechHandler}>
								<GiSpeaker />
							</button>
						</div>
					</div>
				);
			}
		} else if (this.state.screen == 'Set') {
			return (
				<div>
					<SettingsScreen />
				</div>
			);
		} else if (this.state.screen == 'Loc') {
			return (
				<div>
					<LocScreen />
				</div>
			);
		} else if (this.state.screen == 'Date') {
			return (
				<div>
					<DateScreen />
				</div>
			);
		}
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var icon = parsed_json['weather']['0']['icon'];
		var main = parsed_json['weather']['0']['main'];
		var windSpeed = parsed_json['wind']['speed'];
		var humidity = parsed_json['main']['humidity'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond: conditions,
			icon: icon,
			main: main,
			humid: humidity,
			wind: windSpeed,
			buttonsDisplay: true 
		});
	};
}
