import { h, render, Component } from 'preact';

export default class App extends Component {
	constructor(words) {
		super();
		this.state = {
			ourText: ''
		};
		this.msg = new SpeechSynthesisUtterance();
	}

	// setOurText = (e) => {
	// 	this.setState({ ourText: e.target.value });
	// };

	speechHandler = () => {
		this.msg.text = this.state.ourText;
		window.speechSynthesis.speak(this.msg);
	};

	render() {
		const { ourText } = this.state;
		return (
			<div className="App">
				{/* <input type="text" value={ourText} placeholder="Enter Text" onChange={this.setOurText} /> */}
				<button onClick={this.speechHandler}>SPEAK</button>
			</div>
		);
	}
}
