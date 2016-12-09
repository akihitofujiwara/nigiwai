Polymer({
  is: "page-room",
  observers: [
    "setValues(room)"
  ],
  setValues({comments, reactions}) {
    comments && this.set("comments", Object.values(comments))
    reactions && this.set("reactions", Object.values(reactions))
  },
  openDialog() {
    this.$.dialog.open()
  },
  onEditorOpened() {
    this.set("_room", {...this.room})
  },
  onEditorClosed({detail: {confirmed}}) {
    if (!confirmed) this.set("room", this._room)
  },
})
