class AgreeableBoard {
  get is() { return "agreeable-board" }
  get properties() {
    return {
      newComment: {
        value: {
          body: ""
        }
      },
    }
  }
  submit(event) {
    const {newComment, user, $: {firebase}} = this
    event.preventDefault()
    firebase.ref.push({...newComment, createdBy: user.uid})
    this.clear()
  }
  clear() {
    this.set("newComment", {})
  }
}

Polymer(AgreeableBoard.prototype)
