const soundManager = {
  backgroundMusic: null,
  alarmSound: null,

  initSounds() {
    this.backgroundMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3');
    this.alarmSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c6a442.mp3?filename=alarm-clock-short-6402.mp3');
    
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;
    this.alarmSound.volume = 0.5;
  },

  playBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.play().catch(error => {
        console.warn('Background music playback failed:', error);
      });
    }
  },

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  },

  playAlarm() {
    if (this.alarmSound) {
      this.alarmSound.play().catch(error => {
        console.warn('Alarm sound playback failed:', error);
      });
      
      // Stop the alarm after 3 seconds
      setTimeout(() => {
        this.alarmSound.pause();
        this.alarmSound.currentTime = 0;
      }, 3000);
    }
  }
};

// Initialize sounds when the module is loaded
soundManager.initSounds();

export default soundManager;