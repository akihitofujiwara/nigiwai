class NigiYakashi {
  attached(){
    const soundFiles = {
      clap: "/files/sounds/clap.mp3",
      laugh: "/files/sounds/laugh.mp3",
      hee: "/files/sounds/hee.mp4",
    };
    this.sounds = {};
    for(const key in soundFiles){
      this.sounds[key] = new Howl({src: soundFiles[key]});
    }
    this.reactionsRef = firebase.database().ref(`/rooms/${this.roomId}/reactions`)
    this.reactionsRef.limitToLast(1).on('child_added', (data) => {
      const {type, createdAt} = data.val();
      if (createdAt + 5000 >= new Date().getTime()) {
        this.playSound(type);
      }
    });
  }
  get is() { return "nigi-yakashi" }
  playSound(type) {
    const sound = this.sounds[type];
    if (sound) {
      const id = sound.play();
      sound.fade(1, 0, 3000, id);
    }
  }
  effect(type) {
    const {user, $: {firebaseReactions: {ref}}} = this;
    ref.push({type, createdBy: user.uid, createdAt: firebase.database.ServerValue.TIMESTAMP});
  }
  clap() {
    this.effect("clap")
  }
  hee() {
    this.effect("hee")
  }
  laugh() {
    this.effect("laugh")
  }
  remove() {
    this.reactionsRef.remove();
  }
}

Polymer(NigiYakashi.prototype)
