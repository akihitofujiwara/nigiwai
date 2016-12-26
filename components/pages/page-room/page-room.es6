Polymer({
  is: "page-room",
  observers: [
    "setRoom(roomId, rooms, rooms.*)",
    "refresh(roomId)"
  ],
  setRoom(roomId, rooms) {
    this.debounce("setRoom", ()=> {
      this.set("room", {...rooms.find(({$key})=> $key == roomId)})
    }, 300)
  },
  refresh(roomId) {
    this.set("refreshed", false)
    this.async((()=> this.set("refreshed", true)))
  },
  openEditor() {
    this.set("isOpeningEditor", true)
  },
  onEditorOpened() {
    this.set("editedRoom", {...this.room})
  },
  onEditorClosed({detail: {canceled}}) {
    if (canceled) return
    const {$: {firebase: {ref}}} = this
    ref.child("name").set(this.editedRoom.name)
  },
})
