class PageRoom {
  get is() { return "page-room" }
  get properties() {
    return {
      isNewEdited: {
        value: false
      },
      comments: {
        value: [
          {value: "すげーいいよ！"},
          {value: "たまんねぇよ！"},
        ]
      },
      claps: {
        value: []
      },
      likes: {
        value: []
      },
      interestings: {
        value: []
      },
    }
  }
  effect(type) {
    this.push(`${type}s`, {autoplay: true})
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
  openDialog() {
    this.$.dialog.open()
  }
  onEditorOpened() {
    this.set("_room", {...this.room})
  }
  onEditorClosed({detail: {confirmed}}) {
    if (!confirmed) this.set("room", this._room)
  }
  openDialogForNewRoom() {
    this.set("isNewEdited", true)
    this.set("newRoom", {})
    this.openDialog()
  }
}

Polymer(PageRoom.prototype)
