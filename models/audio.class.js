class AudioHub {
  // Audiodateien für Piano, Guitar, DRUMS
  static PEPE_RUN = new Audio("../sounds/character/characterRun.mp3");
  static PEPE_JUMP = new Audio("../sounds/character/characterJump.wav");
  static PEPE_DAMAGE = new Audio("../sounds/character/characterDamage.mp3");
  static PEPE_DEAD = new Audio("../sounds/character/characterDead.wav");
  static PEPE_SLEEP = new Audio("../sounds/character/characterSnoring.mp3");

  static CHICKEN_DEAD = new Audio("../sounds/chicken/chickenDead.mp3");

  static COLLECT_BOTTLE = new Audio("../sounds/collectibles/bottleCollectSound.wav");
  static COLLECT_COIN = new Audio("../sounds/collectibles/collectSound.wav");

  static ENDBOSS = new Audio("../sounds/endboss/endbossApproach.wav");

  static GAMESTART = new Audio("../sounds/game/gameStart.mp3");



  // Array, das alle definierten Audio-Dateien enthält
  static allSounds = [
    AudioHub.PEPE_RUN,
    AudioHub.PEPE_JUMP,
    AudioHub.PEPE_DAMAGE,
    AudioHub.PEPE_DEAD,
    AudioHub.PEPE_SLEEP,
    AudioHub.CHICKEN_DEAD,
    AudioHub.COLLECT_BOTTLE,
    AudioHub.COLLECT_COIN,
    AudioHub.ENDBOSS,
    AudioHub.GAMESTART,
  ];

  // Spielt eine einzelne Audiodatei ab
  static playOne(sound) {
    sound.volume = 0.2; // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
    sound.currentTime = 0; // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
    sound.play(); // Spielt das übergebene Sound-Objekt ab
  }

  // Stoppt das Abspielen aller Audiodateien
  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause(); // Pausiert jedes Audio in der Liste
    });
    document.getElementById("volume").value = 0.2; // Setzt den Sound-Slider wieder auf 0.2
  }

  // Stoppt das Abspielen einer einzelnen Audiodatei
  static stopOne(sound, instrumentId) {
    sound.pause(); // Pausiert das übergebene Audio
  }
}
