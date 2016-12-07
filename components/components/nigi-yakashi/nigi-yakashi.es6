class NigiYakashi {
  get is() { return "nigi-yakashi" }
  get observers() {
    return [
      "categorize(reactions, reactions.length)"
    ]
  }
  categorize(reactions) {
    this.debounce("categorize", ()=> {
      this.set("claps", reactions.filter(({type})=> type == "clap"))
    }, 200)
  }
  effect(type) {
    const {user, $: {firebaseReactions: {ref}}} = this
    ref.push({type, autoplay: true, createdBy: user.uid})
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
