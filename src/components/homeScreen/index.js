import { h, render, Component, useState, useEffect } from 'preact';
import SettingsScreen from '../settingsScreen';
import Button from '../button';
import style from './style';
import LocScreen from '../locScreen';
//import Speaker from '../text-to-speech';
import DateScreen from '../dateScreen';
import style_iphone from '../button/style_iphone';
import $, { data } from 'jquery';
//import icons for buttons
import { FaMicrophone } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';

export default class homeScreen extends Component {
	constructor(props) {
		super(props);
		var today = new Date(),
			date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

		this.state = {
			screen: 'Home',
			category: this.props.category,
			display: true,
			currentDate: date,
            location: 'London' ,
            unit:'metric'
		};
		this.msg = new SpeechSynthesisUtterance();
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
		this.setState({ display: false });
	}

	switchToSet = () => { //function to switch to settingscreen
		this.setState({ screen: 'Set' });
	};
    handleLocationChange = (e) => { //function to change location
        this.setState({location: e.target.value});
        this.props.setLocation(e.target.value);
      }
      
    handleUnitChange = (e) => { //changes the unit
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

   
    printLoc() {//changes to the lock screen

        console.log("Loc: ",this.state.location);
    }



	switchToDate = () => { //changes to the screen for 24 hour forcast
		this.setState({ screen: 'Date' });
	};

	speechHandler = () => { //reads the temperature out loud
		const message = 'The temperature is'.concat(this.state.temp);
		this.msg.text = message;
		window.speechSynthesis.speak(this.msg);
	};

	render() {
        //homnescreen
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		if (this.state.screen == 'Home') {
			return (
				<div>
					{/* {JSON.stringify(this.state)} */}
					<div class={style_iphone.container}>
						<button class={style_iphone.button} onClick={this.switchToDate}>
							{this.state.currentDate}
						</button>
						<button class={style_iphone.button} onClick={this.switchToSet}>
							<IoMdSettings />
						</button>
					</div>
						{/* <div class="mid"> */}
					<div class={style.header}>
						<div class={style.city}>{this.state.locate}</div>
						{/* <div><img src="http://openweathermap.org/img/wn/${
								this.state.icon
						}@4x.png"/></div> */}
						<div class={style.conditions}>{this.state.cond}</div>
						<span class={tempStyles}>{this.state.temp}</span>
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
							<button class="style_iphone.button">
								<FaMicrophone />
							</button>
							<button class="style_iphone.button" onClick={this.speechHandler}>
								<GiSpeaker />
							</button>
					</div>
							{/* <div class="bot"> */}
								{/*<input*/}
								{/*	class="try"*/}
								{/*	type="text"*/}
								{/*	value={ourText}*/}
								{/*	placeholder="Enter Text"*/}
								{/*	onInput={(e) => setOurText(e.target.value)}*/}
								{/*/>*/}
								{/* <button class="mic" onClick={this.speechHandler}>
									mic
								</button> */}
								{/*/!* <button class="mic">mic</button> *!/*/}
								{/*<button class="speak">speak</button>*/}
								{/* <Speaker /> */}
							{/* </div> */}
				</div>
				// </div>
			);
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

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond: conditions,
			icon: icon,
			main: main
			//if main=== Clear -> sunny.png
			//if main=== Clouds -> cloudy.png
			//if main=== Rain -> rainy.png
		});
	};
}
