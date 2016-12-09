Polymer({
  is: "page-room",
  observers: [
    "setValues(room)",
    "refresh(roomId)"
  ],
  setValues({comments, reactions}) {
    comments && this.set("comments", Object.values(comments))
    reactions && this.set("reactions", Object.values(reactions))
  },
  refresh(roomId) {
    this.set("refreshed", false)
    this.async((()=> this.set("refreshed", true)), 100)
  },
  openEditor() {
    this.set("isOpeningEditor", true)
  },
  onEditorOpened() {
    this.set("editedRoom", {...this.room})
  },
  onEditorClosed({detail: {canceled}}) {
    if (canceled) return
    console.log(this.editedRoom)
    this.set("room", this.editedRoom)
  },
})
