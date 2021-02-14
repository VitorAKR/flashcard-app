class AudioSpeechSynthesisUtterance{
    constructor(content, language){
        //instaciar SpeechSynthesisUtterance
        const utterance = new SpeechSynthesisUtterance();

        this.text = content;
        this.lang = language;
        
        //setar o volume em 1 pra poder soar alto
        utterance.volume = 1;

        this.audioLanguage(this.lang, utterance);
        this.setText(this.text, utterance);
        this.speak(utterance);
    }

    audioLanguage(language, utterance) {
       return utterance.lang = language; 
    }

    speak(utterance){
       return speechSynthesis.speak(utterance);
    }

    setText(text, utterance){
       return utterance.text = text;
    }
}