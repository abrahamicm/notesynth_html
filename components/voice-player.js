// voice-player.js
export class VoicePlayer extends HTMLElement {
  constructor() {
      super();
      this.speechSynthesis = window.speechSynthesis;
      this.playing = false;
      this.errorMessage = '';

      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.innerHTML = `
          <style>
              button {
                  cursor: pointer;
              }
              .error {
                  color: red;
              }
          </style>
          <button id="playPause">Play</button>
          <button id="stop">Stop</button>
          <span class="error"></span>
      `;

      this.playPauseButton = this.shadow.getElementById('playPause');
      this.stopButton = this.shadow.getElementById('stop');
      this.errorSpan = this.shadow.querySelector('.error');

      this.playPauseButton.addEventListener('click', () => this.togglePlayPause());
      this.stopButton.addEventListener('click', () => this.stopSpeech());
  }

  showError(message) {
      this.errorSpan.textContent = message;
  }

  clearError() {
      this.errorSpan.textContent = '';
  }

  togglePlayPause() {
      this.clearError(); // Limpiar el mensaje de error antes de intentar reproducir
      if (this.playing) {
          this.pauseSpeech();
      } else {
          this.playSpeech('Hola, este es un ejemplo de síntesis de voz.');
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

          this.utterance.onerror = (event) => {
              this.playing = false;
              this.playPauseButton.textContent = 'Play';
              this.showError('Error en la síntesis de voz: ' + event.error);
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
