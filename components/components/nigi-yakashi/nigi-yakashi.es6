const seVolume = 0.2;
Polymer({
  is: "nigi-yakashi",
  properties: {
    sounds: {
      value: {}
    }
  },
  observers: [
    "setLastKey(room.reactions)",
    "play(lastKey)"
  ],
  setLastKey(reactions = {}) {
    const keys = Object.keys(reactions)
    this.set("lastKey", keys[keys.length - 1])
  },
  play(lastKey) {
    if (!lastKey) return
    const {room: {reactions}} = this
    const {type, createdAt} = reactions[lastKey]
    if (createdAt + 5000 >= new Date().getTime()) {
      this.playSound(type);
    }
  },
  attached(){
    const soundFiles = {
      clap: "./files/sounds/clap.mp3",
      laugh: "./files/sounds/laugh.mp3",
      hee: "./files/sounds/hee.mp4",
    };
    for(const key in soundFiles){
      this.sounds[key] = new Howl({src: soundFiles[key], volume: seVolume});
    }
  },
  fx() { return document.querySelector('nigi-fx'); },
  playSound(type) {
    const sound = this.sounds[type];
    if (sound) {
      const id = sound.play();
      sound.fade(seVolume, 0, 3000, id);
    }
  },
  center(rect) {
    return {x: (rect.left + rect.right) * 0.5, y: (rect.top + rect.bottom) * 0.5};
  },
  gauge() {
    return document.querySelector('reaction-gauge');
  },
  gaugePoint() {
    return this.gauge().gaugeTopPosition();
  },
  playFx(type) {
    const button = document.getElementById(type);
    if (button) {
      const buttonRect = button.getBoundingClientRect()
      this.fx().spawn({
        src: this.center(buttonRect),
        dst: this.gaugePoint(),
        finishCallback: () => { this.gauge().flash(); },
      });
    }
  },
  effect(type) {
    this.playFx(type);
    const {user, $: {firebaseReactions: {ref}}} = this;
    ref.push({type, createdBy: user.uid, createdAt: firebase.database.ServerValue.TIMESTAMP});
  },

  clap() {
    this.effect("clap")
  },
  hee() {
    this.effect("hee")
  },
  laugh() {
    this.effect("laugh")
  },
  remove() {
    //this.reactionsRef.remove();
  },
})
