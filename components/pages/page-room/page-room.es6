class PageRoom {
  get is() { return "page-room" }
  get properties() {
    return {
    }
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
}

Polymer(PageRoom.prototype)
