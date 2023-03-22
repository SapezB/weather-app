import { h, Component } from 'preact';

class SpeechChatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isListening: false,
      transcript: '',
      outputText: '',
    };

    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.onresult = this.handleRecognitionResult.bind(this);

    this.chatbotUrl = 'https://api.openai.com/v1/engine/engines/davinci-codex/completions';
    this.apiKey = 'YOUR_API_KEY';
  }

  startListening() {
    this.setState({ isListening: true });
    this.recognition.start();
  }

  stopListening() {
    this.setState({ isListening: false });
    this.recognition.stop();
  }

  handleRecognitionResult(event) {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    this.setState({ transcript }, () => {
      if (this.state.transcript === 'bye') {
        this.stopListening();
      } else {
        this.getChatbotResponse();
      }
    });
  }

  getChatbotResponse() {
    fetch(this.chatbotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        prompt: `User: ${this.state.transcript}\nChatbot: `,
        max_tokens: 50,
        temperature: 0.7,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const outputText = data.choices[0].text.trim();
        this.speakOutputText(outputText);
        this.setState({ outputText });
      });
  }

  speakOutputText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.startListening()}>Start Chatting</button>
        {this.state.isListening && <p>Listening...</p>}
        <p>User: {this.state.transcript}</p>
        <p>Chatbot: {this.state.outputText}</p>
      </div>
    );
  }
}