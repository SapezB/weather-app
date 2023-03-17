const startBtn = document.querySelector("#speak");


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
    };
    else if (transcript ==="goodbye"){
        recognition.stop();
        utter.text = "goodbye. see you soon";
        synth.speak(utter);
    };
};