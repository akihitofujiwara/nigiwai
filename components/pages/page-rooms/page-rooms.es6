class PageRooms {
  get is() { return "page-rooms" }
  openEditor() {
    this.set("isOpeningEditor", true)
  }
  onEditorOpened() {
    this.set("newRoom", {})
  }
  onEditorClosed({detail: {canceled}}) {
    if (canceled) return
    const {ref} = this.$$("#firebaseRooms")
    const {newRoom, user} = this
    ref.push({...newRoom, createdBy: user.uid})
  }
}

Polymer(PageRooms.prototype)

