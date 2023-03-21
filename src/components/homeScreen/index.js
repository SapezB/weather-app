import { h, render, Component} from 'preact';
import SettingsScreen from '../settingsScreen';
import Button from '../button';
import style from './style';
import LocScreen from '../locScreen';
import DateScreen from '../dateScreen';
import Speaker from '../text-to-speech';

export default class homeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screen: 'Home'
		};
	}

	switchToSet = () => {
		this.setState({ screen: 'Set' });
	};

	switchToLoc = () => {
		this.setState({ screen: 'Loc' });
	};

	switchToDate = () => {
		this.setState({ screen: 'Date' });
	};

	// switchToTalk = () => {
	// 	this.setState({ screen: 'Text' });
	// };
	// App = () => {
	//     const [ ourText, setOurText ] = useState('');
	// 	const msg = new SpeechSynthesisUtterance();

	// 	const speechHandler = (msg) => {
	// 		msg.text = ourText;
	// 		window.speechSynthesis.speak(msg);
	// 	};
	// };
	speaking = () =>{
		const startBtn = document.querySelector("#speechBtn");
		const recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		const synth = window.speechSynthesis;

		startBtn.addEventListener("click", () =>{
			recognition.start();
			utter.text = "Hello. i am your chatbot for today.... some basic questions you can ask are: what is the weather like today?";
			synth.speak(utter);
									
		});

		let utter = new SpeechSynthesisUtterance("Hi");
		utter.onend = () => {
			recognition.start();
			};

		recognition.onresult = (e) =>{
			const transcript = e.results[e.results.length -1][0].transcript.trim();
			if (transcript === "hello"){
				recognition.stop();
				utter.text = "Hello";
				synth.speak(utter);
			}

			else if (transcript ==="what is the weather like today"){
				recognition.stop();
				utter.text = "the weather today is relatively sunny - highest of 20 degrees";
				synth.speak(utter);
			}
			else if (transcript ==="goodbye"){
				recognition.stop();
				utter.text = "goodbye. see you soon";
				synth.speak(utter);
			}
		};
	}
	
	render() {
		if (this.state.screen == 'Home') {
			return (
				<div>
					<div class="top">
						<button class="Date" onClick={this.switchToDate}>
							20/2/23
						</button>
						<button class="Location" onClick={this.switchToLoc}>
							Loc
						</button>
						<button class="Settings" onClick={this.switchToSet}>
							Settings
						</button>
					</div>
					<div class="mid">
						<p class={style.header}>Temperature</p>
					</div>
					<div class="bot">
						{/*<input*/}
						{/*	class="try"*/}
						{/*	type="text"*/}
						{/*	value={ourText}*/}
						{/*	placeholder="Enter Text"*/}
						{/*	onInput={(e) => setOurText(e.target.value)}*/}
						{/*/>*/}
						{/*<button class="mic" onClick={() => speechHandler(msg)}>*/}
						{/*	mic*/}
						{/*</button>*/}
						{/*/!* <button class="mic">mic</button> *!/*/}
						{/*<button class="speak">speak</button>*/}
						<Speaker />
					</div>
					<div class="speechA">
						<button class="speechBtn" onClick={this.speaking}>speech-speech</button>
							
					</div>

				</div>
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
}
