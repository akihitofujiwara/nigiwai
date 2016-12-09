class NigiYakashi {
  attached(){
    const soundFiles = {
      clap: "/files/sounds/clap.mp3",
      interesting: "/files/sounds/interesting.mp3",
      like: "/files/sounds/interesting.mp3",
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
    const sound = this.sounds[type]
    if (sound) {
      const id = sound.play();
      sound.fade(1, 0, 3000, id);
    }
  }
  effect(type) {
    const {user, $: {firebaseReactions: {ref}}} = this
    ref.push({type, autoplay: true, createdBy: user.uid, createdAt: firebase.database.ServerValue.TIMESTAMP})
  }
  clap() {
    this.effect("clap")
  }
  like() {
    this.effect("like")
  }
  interesting() {
    this.effect("interesting")
  }
}

Polymer(NigiYakashi.prototype)
