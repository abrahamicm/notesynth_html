// voice-player.js
export class VoicePlayer extends HTMLElement {
  constructor() {
      super();
      this.speechSynthesis = window.speechSynthesis;
      this.playing = false;
      
      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.innerHTML = `
          <style>
              button {
                  cursor: pointer;
              }
          </style>
          <button id="playPause">Play</button>
          <button id="stop">Stop</button>
      `;

      this.playPauseButton = this.shadow.getElementById('playPause');
      this.stopButton = this.shadow.getElementById('stop');

      this.playPauseButton.addEventListener('click', () => this.togglePlayPause());
      this.stopButton.addEventListener('click', () => this.stopSpeech());
  }

  connectedCallback() {
      const textSelector = this.getAttribute('text-selector');
      if (textSelector) {
          this.textToRead = document.querySelector(textSelector).textContent;
      } else {
          this.textToRead = 'Texto de ejemplo';
      }
  }

  togglePlayPause() {
      if (this.playing) {
          this.pauseSpeech();
      } else {
          this.playSpeech(this.textToRead);
      }
  }

  playSpeech(text) {
      if (!this.playing) {
          this.playing = true;
          this.playPauseButton.textContent = 'Pause';
          this.utterance = new SpeechSynthesisUtterance(text);
          this.speechSynthesis.speak(this.utterance);
          
          this.utterance.onend = () => {
              this.playing = false;
              this.playPauseButton.textContent = 'Play';
          };
      }
  }

  pauseSpeech() {
      if (this.playing) {
          this.playing = false;
          this.playPauseButton.textContent = 'Play';
          this.speechSynthesis.pause();
      }
  }

  stopSpeech() {
      if (this.playing) {
          this.playing = false;
          this.playPauseButton.textContent = 'Play';
          this.speechSynthesis.cancel();
      }
  }
}

customElements.define('voice-player', VoicePlayer);
