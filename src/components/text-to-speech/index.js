import { useState } from 'preact';

function App() {
	const [ ourText, setOurText ] = useState('');
	const msg = new SpeechSynthesisUtterance();

	const speechHandler = (msg) => {
		msg.text = ourText;
		window.speechSynthesis.speak(msg);
	};

	return (
		<div className="App">
			<h1>React Text to Speech App</h1>
			<input type="text" value={ourText} placeholder="Enter Text" onChange={(e) => setOurText(e.target.value)} />
			<button onClick={() => speechHandler(msg)}>SPEAK</button>
		</div>
	);
}

export default App;
