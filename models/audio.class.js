/**
 * Represents AudioHub.
 */
class AudioHub {
  
  static PEPE_RUN = new Audio("sounds/character/characterRun.mp3");
  static PEPE_JUMP = new Audio("sounds/character/characterJump.wav");
  static PEPE_DAMAGE = new Audio("sounds/character/characterDamage.mp3");
  static PEPE_DEAD = new Audio("sounds/character/characterDead.wav");
  static PEPE_SLEEP = new Audio("sounds/character/characterSnoring.mp3");

  static CHICKEN_DEAD = new Audio("sounds/chicken/chickenDead.mp3");

  static COLLECT_BOTTLE = new Audio("sounds/collectibles/bottleCollectSound.wav");
  static COLLECT_COIN = new Audio("sounds/collectibles/collectSound.wav");

  static ENDBOSS = new Audio("sounds/endboss/endbossApproach.wav");

  static GAMESTART = new Audio("sounds/game/gameStart.mp3");

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

  /**
   * Plays a sound unless audio is muted.
   * @param {*} sound - Input used by this method.
   */
  static playOne(sound) {
    if(!audioMute){
    sound.volume = 0.2; 
    sound.currentTime = 0; 
    sound.play(); 
    }
  }

  /**
   * Stops all registered sounds.
   */
  static stopAll() {
    AudioHub.allSounds.forEach((sound) => {
      sound.pause(); 
    });
  }

  /**
   * Stops the specified sound.
   * @param {*} sound - Input used by this method.
   * @param {*} instrumentId - Input used by this method.
   */
  static stopOne(sound, instrumentId) {
    sound.pause(); 
  }
  /**
   * Toggles the game's mute state.
   */
  static toggleMute() {
    if (!audioMute) {
      AudioHub.allSounds.forEach((sound) => {
        sound.volume = 0;
        
      });
      audioMute = true;
    } else {
      AudioHub.allSounds.forEach((sound) => {
        sound.volume = 0.2;
      });
      audioMute = false;
    }
    localStorage.setItem("audioMute", audioMute);
  }
}
