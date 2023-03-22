import { h, render, Component} from 'preact';
import SettingsScreen from '../settingsScreen';
import Button from '../button';
import style from './style';
import LocScreen from '../locScreen';
import DateScreen from '../dateScreen';
import Speaker from '../text-to-speech';
import SpeechChatbot from '../chatbot';

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
						<button class="speechBtn" onClick={<SpeechChatbot />}>speech-speech</button>
							
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
